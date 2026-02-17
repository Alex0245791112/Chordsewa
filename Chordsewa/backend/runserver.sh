#!/bin/bash
# Activate virtual environment and run Django server
source .venv/bin/activate
python manage.py runserver 0.0.0.0:8000
