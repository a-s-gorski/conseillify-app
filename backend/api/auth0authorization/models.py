from django.db import models

class UserSpotifyAuthenticated(models.Model):
    email = models.EmailField((""), max_length=254)
    token = models.CharField(default="", max_length=1026)
    token_date = models.DateTimeField(auto_now_add=True)

class ModelReviews(models.Model):
    model_endpoint = models.CharField(default="", max_length=254)
    email_address = models.EmailField(default="", max_length=254)
    coldstart = models.BooleanField(default=False)
    user_review = models.IntegerField(default=0)
    user_feedback = models.CharField(default="", max_length=1026)
