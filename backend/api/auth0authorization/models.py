from django.db import models

class UserSpotifyAuthenticated(models.Model):
    email = models.EmailField((""), max_length=254)
    token = models.CharField(default="", max_length=1026)
    token_date = models.DateTimeField(auto_now_add=True)

