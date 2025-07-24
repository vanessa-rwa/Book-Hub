#!/usr/bin/env python
"""
Startup script for Azure App Service
"""
import os
import sys
import subprocess

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "bookhub.production_settings")
    try:
        from django.core.management import execute_from_command_line
        from django.core.management import call_command
        from django.conf import settings
        
        # Run migrations automatically
        try:
            print("Running database migrations...")
            call_command('migrate', verbosity=1)
            print("Migrations completed successfully!")
            
            # Check if books exist, if not populate them
            from books.models import Book
            if Book.objects.count() == 0:
                print("No books found, populating database...")
                call_command('populate_books', verbosity=1)
                print("Database populated successfully!")
            else:
                print(f"Database already has {Book.objects.count()} books.")
                
        except Exception as e:
            print(f"Database setup error: {e}")
            # Continue with normal startup even if database setup fails
            
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    
    # Start the normal Django application
    execute_from_command_line(sys.argv) 