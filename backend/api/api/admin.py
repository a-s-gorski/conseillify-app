from django.contrib import admin
from auth0authorization.models import UserSpotifyAuthenticated, ModelReviews
# Register your models here.

admin.site.register(UserSpotifyAuthenticated)
admin.site.register(ModelReviews)
