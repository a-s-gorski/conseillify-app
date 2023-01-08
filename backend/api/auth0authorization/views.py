from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from .models import UserSpotifyAuthenticated, ModelReviews, Probability
from django.http import HttpResponseForbidden, HttpResponseBadRequest, HttpResponseNotFound
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.utils import timezone
from rest_framework.request import Request
from typing import List, Tuple
import spotipy
import os
import requests
import json
import random
import logging

PROBABILITY_RANDOM = 1.0
RANDOM_DECAY_RATE = 0.05
RECOMMENDER_ENGINE_URL = os.getenv("RECOMMENDER_ENGINE_URL")
ENDPOINTS = ["/coldstart/history", "/reranked/history",
             "/collaborative/history", "/ranked/history"]


def has_valid_token(user_email: str):
    if len(UserSpotifyAuthenticated.objects.filter(email=user_email)) == 0:
        user_sa = UserSpotifyAuthenticated(email=user_email)
        user_sa.save()

    usa = UserSpotifyAuthenticated.objects.filter(email=user_email)[0]
    token = usa.token
    token_date = usa.token_date
    if not token:
        return False

    if not token_date:
        return False

    timediff = timezone.now() - token_date
    if timediff.total_seconds() >= 600:
        return False

    return True


def get_token(user_email: str) -> str:
    usa = UserSpotifyAuthenticated.objects.filter(email=user_email)[0]
    return usa.token


def get_track_name(token: str, track_uri: str) -> str:
    client = spotipy.Spotify(auth=token)
    response = client.track(track_uri)
    return response["name"]


def get_recent_uris(token: str) -> List[str]:
    client = spotipy.Spotify(auth=token)
    response = client.current_user_recently_played()
    uris = list(map(lambda item: item['track']['uri'], response['items']))
    return uris


def get_recent_names(token: str) -> List[str]:
    client = spotipy.Spotify(auth=token)
    response = client.current_user_recently_played()
    names = list(map(lambda item: item['track']['name'], response['items']))
    return names


def save_playlist_spotipy(token: str, playlist_name: str, uris: List[str]) -> None:
    client = spotipy.Spotify(auth=token)
    user_id = client.current_user()["id"]
    response = client.user_playlist_create(
        user=user_id, name=playlist_name, description="Created by Conseillify-AI")
    playlist_id = response["id"]
    client.playlist_add_items(playlist_id, uris)


def get_probability():
    prob = Probability.objects.all()
    if not prob:
        prob = Probability()
        prob.save()
        return prob.probability_random
    prob = prob[0]
    prob.probability_random -= prob.decay_rate
    prob.save()
    return prob.probability_random


def get_best_model_endpoint():
    feedbacks = ModelReviews.objects.all()
    if not feedbacks:
        return get_random_model_endpoint()
    feedback_by_endpoint = {endpoint: list(filter(
        lambda f: f.model_endpoint == endpoint, feedbacks)) for endpoint in ENDPOINTS}
    rated_feedbacks = {endpoint: sum(list(map(lambda f: f.user_review, feedbacks)))
                       for endpoint, feedbacks in feedback_by_endpoint.items()}
    rated_feedbacks = {endpoint: sum(list(filter(
        lambda f: f.model_endpoint == endpoint, feedbacks))) for endpoint in ENDPOINTS}
    return max(rated_feedbacks, key=rated_feedbacks.get)


def get_random_model_endpoint():
    return random.choice(ENDPOINTS)


def get_endpoint():
    prob_random = get_probability()
    prob = random.uniform(0, 1)
    if prob < prob_random:
        return get_random_model_endpoint()
    else:
        return get_best_model_endpoint()


def call_recommendation_endpoint(endpoint: str, history: List[str], playlist_name: str) -> Tuple[List[str], bool]:
    request_url = RECOMMENDER_ENGINE_URL + endpoint
    params_dict = {"history": history,
                   "playlist_name": playlist_name, "n_recommendation": 50}
    try:
        response = requests.get(url=request_url, params=params_dict).json()
        return response["recommendations"][:50], response["coldstart"]

    except requests.exceptions.RequestException as e:
        logging.info("request failed with error", e)
    return [], []


@api_view(['GET'])
def is_spotify_authenticated(request: Request):
    user_email = request.query_params.get('email')
    try:
        validate_email(user_email)
    except ValidationError:
        return HttpResponseForbidden

    return JsonResponse({"is_spotify_authenticated": has_valid_token(user_email)})


@api_view(['GET'])
def save_spotify_token(request: Request):
    user_email = request.query_params.get('email')
    token = request.query_params.get('token')
    try:
        validate_email(user_email)
    except ValidationError:
        return HttpResponseForbidden
    if not token:
        return HttpResponseBadRequest
    usa = UserSpotifyAuthenticated.objects.filter(email=user_email)
    if (len(usa)) == 0:
        usa = UserSpotifyAuthenticated(email=user_email)
    else:
        usa = usa[0]
    if usa.token != token:
        usa.token_date = timezone.now()
    usa.token = token
    usa.save()
    return JsonResponse({"Saved_token": True})


@api_view(['GET'])
def get_user_history(request: Request):
    user_email = request.query_params.get('email')
    if not has_valid_token(user_email):
        return HttpResponseForbidden
    token = get_token(user_email)
    recent_uris = get_recent_uris(token)
    recent_names = get_recent_names(token)
    return JsonResponse({"uris": recent_uris, "names": recent_names})


@api_view(['GET'])
def get_recommendation(request: Request):
    user_email = request.query_params.get('email')
    if not has_valid_token(user_email):
        return HttpResponseForbidden
    token = get_token(user_email)
    history = request.query_params.get('userHistory')
    playlist_name = request.query_params.get('playlistName')
    endpoint = get_endpoint()
    if not history:
        history = []
    else:
        history = json.loads(history)
    if not playlist_name:
        playlist_name = ""
    uris, coldstart = call_recommendation_endpoint(
        endpoint, history, playlist_name)
    names = list(map(lambda uri: get_track_name(token, uri), uris))
    return JsonResponse({"uris": uris, "names": names, "coldstart": coldstart, "endpoint": endpoint})


@api_view(['GET'])
def save_playlist(request: Request):
    user_email = request.query_params.get('email')
    if not has_valid_token(user_email):
        return HttpResponseForbidden
    token = get_token(user_email)
    uris = json.loads(request.query_params.get('uris'))
    playlist_name = request.query_params.get('playlistName')
    save_playlist_spotipy(token, playlist_name, uris[:100])

    return JsonResponse({})


@api_view(['GET'])
def submit_feedback(request: Request):
    user_email = request.query_params.get('email')
    endpoint = request.query_params.get('endpoint')
    coldstart = bool(request.query_params.get('coldstart'))
    review = int(request.query_params.get('review'))
    feedback = request.query_params.get('feedback')
    model_review = ModelReviews(model_endpoint=endpoint, coldstart=coldstart,
                                email_address=user_email, user_review=review, user_feedback=feedback)
    model_review.save()
    return JsonResponse({})
