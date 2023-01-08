from django.contrib import admin
from .models import UserSpotifyAuthenticated, ModelReviews, Probability
# Register your models here.

admin.site.register(UserSpotifyAuthenticated)
admin.site.register(ModelReviews)
admin.site.register(Probability)