from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv(
    "DJANGO_SECRET_KEY",
    "django-insecure-6g*jh$bnc@+g2cf=dtgoc_-c^h*!n4t*=i3i&wkd--2q(_bp=q"
)

DEBUG = os.getenv("DJANGO_DEBUG", "True") == "True"

# ✅ Better than ["*"] for real use
ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
    ".app.github.dev",   # GitHub Codespaces preview domains
]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    "corsheaders",
    "rest_framework",

    "songs",
]

MIDDLEWARE = [
    # ✅ Must be at the very top (before CommonMiddleware)
    "corsheaders.middleware.CorsMiddleware",

    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",

    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

STATIC_URL = "static/"

# =========================
# ✅ CORS / CSRF (React/Vite)
# =========================

# If you're just using token auth or no auth, you're fine.
# If you use cookies/sessions, you NEED these:
CORS_ALLOW_CREDENTIALS = True

# Dev convenience: allow all origins when DEBUG=True
# (If you want strict mode, set this False and use allowed lists below.)
if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True
else:
    CORS_ALLOW_ALL_ORIGINS = False
    CORS_ALLOWED_ORIGINS = [
        "https://your-frontend-domain.com",
    ]

# If you want to keep strict even in DEBUG, comment the block above and use this:
# CORS_ALLOW_ALL_ORIGINS = False
# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:5173",
#     "http://127.0.0.1:5173",
# ]

# ✅ Allow preview URLs like:
# https://something-5173.app.github.dev
CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^https:\/\/.*\.app\.github\.dev$",
]

# Needed if you do POST/PUT with SessionAuthentication (cookies)
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://*.app.github.dev",
]

REST_FRAMEWORK = {
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 20,
}
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]
WSGI_APPLICATION = "bhajan_backend.wsgi.application"