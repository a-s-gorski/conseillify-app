from django.contrib import admin
from auth0authorization.models import UserSpotifyAuthenticated, ModelReviews, Probability

admin.site.register(UserSpotifyAuthenticated)
admin.site.register(ModelReviews)
admin.site.register(Probability)