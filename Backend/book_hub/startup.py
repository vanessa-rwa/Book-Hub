#!/usr/bin/env python
"""
Enhanced startup script for Azure App Service
Automatically handles database migrations and setup
"""
import os
import sys
import subprocess

def run_command(command):
    """Run a command and return its output"""
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        print(f"Command: {command}")
        print(f"Output: {result.stdout}")
        if result.stderr:
            print(f"Error: {result.stderr}")
        return result.returncode == 0
    except Exception as e:
        print(f"Error running command {command}: {e}")
        return False

def setup_database():
    """Set up the database with migrations"""
    print("=== Setting up database ===")
    
    # Set Django settings module
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "bookhub.production_settings")
    
    # Run migrations
    print("Running database migrations...")
    success = run_command("python manage.py migrate --noinput")
    
    if success:
        print("✅ Database migrations completed successfully!")
    else:
        print("❌ Database migrations failed!")
    
    return success

def collect_static():
    """Collect static files"""
    print("=== Collecting static files ===")
    success = run_command("python manage.py collectstatic --noinput")
    
    if success:
        print("✅ Static files collected successfully!")
    else:
        print("❌ Static files collection failed!")
    
    return success

if __name__ == "__main__":
    print("🚀 Starting Book Hub deployment setup...")
    
    # Set environment
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "bookhub.production_settings")
    
    # Setup database
    db_success = setup_database()
    
    # Collect static files
    static_success = collect_static()
    
    if db_success and static_success:
        print("🎉 Deployment setup completed successfully!")
    else:
        print("⚠️ Some setup steps failed, but continuing...")
    
    # Start the Django application
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    
    # If called directly (not for setup), run the Django command
    if len(sys.argv) > 1:
        execute_from_command_line(sys.argv) 