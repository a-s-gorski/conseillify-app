# Generated by Django 2.2.28 on 2022-12-17 14:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth0authorization', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Probability',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('probability_random', models.FloatField(default=1.0)),
                ('decay_rate', models.FloatField(default=0.05)),
            ],
        ),
    ]