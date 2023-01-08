#!/bin/bash

echo "Making migrations"
python manage.py migrate
python manage.py makemigrations

echo "Starting server"
python manage.py runserver 0.0.0.0:8000

