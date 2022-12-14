from django.urls import path
from . import views

urlpatterns = [
    path('api/is_spotify_authenticated', views.is_spotify_authenticated),
    path('api/save_token', views.save_spotify_token),
    path('api/get_user_history', views.get_user_history)
]