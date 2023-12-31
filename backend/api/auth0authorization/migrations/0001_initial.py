# Generated by Django 2.2.28 on 2022-12-17 13:51

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ModelReviews',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('model_endpoint', models.CharField(default='', max_length=254)),
                ('email_address', models.EmailField(default='', max_length=254)),
                ('coldstart', models.BooleanField(default=False)),
                ('user_review', models.IntegerField(default=0)),
                ('user_feedback', models.CharField(default='', max_length=1026)),
            ],
        ),
        migrations.CreateModel(
            name='UserSpotifyAuthenticated',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, verbose_name='')),
                ('token', models.CharField(default='', max_length=1026)),
                ('token_date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
