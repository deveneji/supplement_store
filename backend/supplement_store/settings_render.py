from .settings import *
import os
from decouple import config

# Render-specific settings
DEBUG = False

# Database - use environment variables from Render
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME', 'supplement_db'),
        'USER': config('DB_USER', 'supplement_user'),
        'PASSWORD': config('DB_PASSWORD', ''),
        'HOST': config('DB_HOST', 'db'),
        'PORT': config('DB_PORT', '5432'),
    }
}

# Allowed hosts for Render
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='*').split(',')

# CORS settings
CORS_ALLOWED_ORIGINS = config('CORS_ALLOWED_ORIGINS', default='').split(',')
CORS_ALLOW_ALL_ORIGINS = False

# Static files
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Security settings for production
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True