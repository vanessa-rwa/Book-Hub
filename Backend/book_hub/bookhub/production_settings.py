"""
Production settings for Azure deployment
"""
import os
from decouple import config
import dj_database_url
from .settings import *

# Production-specific settings
DEBUG = config('DEBUG', default=False, cast=bool)
SECRET_KEY = config('SECRET_KEY', default='djangobookhub2024secretkeyforproductiondeployment')

# Allowed hosts for Azure
ALLOWED_HOSTS = [
    config('AZURE_APP_SERVICE_URL', default='bookhub-backend-a0gfbea4h4g0hwak.southafricanorth-01.azurewebsites.net'),
    'bookhub-backend-a0gfbea4h4g0hwak.southafricanorth-01.azurewebsites.net',
    'bookhub-backend.azurewebsites.net',
    'localhost',
    '127.0.0.1',
    '.azurewebsites.net',
]

# Database configuration for Azure PostgreSQL
DATABASES = {
    'default': dj_database_url.parse(
        config('DATABASE_URL', default='postgresql://bookhub_admin:MukeJacke2024!Secure@bookhub-db-server.postgres.database.azure.com:5432/bookhub_db')
    )
}

# Static files configuration for Azure
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Media files configuration
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Security settings for production
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

# CORS settings for Azure Static Web Apps
CORS_ALLOWED_ORIGINS = [
    config('FRONTEND_URL', default='https://yellow-pebble-0a3953c03.1.azurestaticapps.net'),
    'https://yellow-pebble-0a3953c03.1.azurestaticapps.net',
    'https://bookhub-frontend.azurestaticapps.net',
    'https://localhost:3000',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
]

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_ORIGINS = config('CORS_ALLOW_ALL_ORIGINS', default=True, cast=bool)

# Add whitenoise middleware
MIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')

# Ensure corsheaders middleware is properly positioned
if 'corsheaders.middleware.CorsMiddleware' not in MIDDLEWARE:
    MIDDLEWARE.insert(0, 'corsheaders.middleware.CorsMiddleware')

# Logging configuration
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': config('DJANGO_LOG_LEVEL', default='INFO'),
            'propagate': False,
        },
    },
} 