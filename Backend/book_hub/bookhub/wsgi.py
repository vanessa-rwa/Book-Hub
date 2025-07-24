"""
WSGI config for bookhub project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/howto/deployment/wsgi/
"""

import os
import sys
import subprocess
from django.core.wsgi import get_wsgi_application

def run_startup_tasks():
    """Run one-time startup tasks"""
    try:
        # Set Django settings
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bookhub.production_settings')
        
        # Import Django and setup
        import django
        django.setup()
        
        # Run migrations
        from django.core.management import call_command
        print("🔄 Running database migrations...")
        call_command('migrate', verbosity=1, interactive=False)
        
        # Check if we need to populate books
        from books.models import Book
        if Book.objects.count() == 0:
            print("📚 No books found, they will be populated by migration...")
        else:
            print(f"✅ Database has {Book.objects.count()} books")
            
        print("🎉 Startup tasks completed successfully!")
        
    except Exception as e:
        print(f"⚠️ Startup task error: {e}")
        # Don't fail the entire application if startup tasks fail

# Set the Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bookhub.production_settings')

# Run startup tasks (only once)
if not getattr(run_startup_tasks, '_executed', False):
    run_startup_tasks()
    run_startup_tasks._executed = True

# Get the WSGI application
application = get_wsgi_application()
