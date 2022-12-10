from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from .models import UserSpotifyAuthenticated
from django.http import HttpResponseForbidden, HttpResponseBadRequest, HttpResponseNotFound
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from datetime import datetime
from django.utils import timezone
from rest_framework.request import Request
from typing import List
import spotipy

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
    print("timediff", timediff.total_seconds())
    if timediff.total_seconds() >= 3600:
        return False

    return True

def get_token(user_email: str) -> str:
    usa = UserSpotifyAuthenticated.objects.filter(email=user_email)[0]
    return usa.token

def get_recent_tracks(token: str) -> List[str]:
    client = spotipy.Spotify(auth=token)
    response = client.current_user_recently_played()
    uris = list(map(lambda item: item['track']['uri'], response['items']))
    return uris

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
    print(token)
    recent_tracks = get_recent_tracks(token)
    print(f"recent_tracks {recent_tracks}")
    return JsonResponse({"tracks": recent_tracks})
    