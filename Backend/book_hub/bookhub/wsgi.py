"""
WSGI config for bookhub project.

Enhanced with automatic database setup for production deployment.
"""

import os
import sys
import logging
from django.core.wsgi import get_wsgi_application

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def setup_database():
    """
    Robust database setup that runs automatically on Azure deployment
    """
    try:
        # Set Django settings
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bookhub.production_settings')
        
        # Import Django and setup
        import django
        django.setup()
        
        logger.info("🔄 Starting database setup...")
        
        # Check database connection first
        from django.db import connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
        logger.info("✅ Database connection successful")
        
        # Run migrations
        from django.core.management import call_command
        logger.info("🔄 Running database migrations...")
        call_command('migrate', verbosity=1, interactive=False)
        logger.info("✅ Database migrations completed")
        
        # Check and populate books
        from books.models import Book
        book_count = Book.objects.count()
        logger.info(f"📚 Current book count: {book_count}")
        
        if book_count == 0:
            logger.info("📚 No books found, migration should have populated them...")
            # Force run the populate migration if needed
            try:
                call_command('migrate', 'books', '0002', verbosity=1, interactive=False)
                book_count = Book.objects.count()
                logger.info(f"📚 After population migration: {book_count} books")
            except Exception as e:
                logger.warning(f"Migration already applied or error: {e}")
        
        logger.info("🎉 Database setup completed successfully!")
        return True
        
    except Exception as e:
        logger.error(f"⚠️ Database setup error: {e}")
        # Don't fail the entire application
        return False

# Set the Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bookhub.production_settings')

# Run database setup (only once per process)
if not hasattr(setup_database, '_executed'):
    logger.info("🚀 Initializing Book Hub application...")
    setup_database()
    setup_database._executed = True

# Get the WSGI application
application = get_wsgi_application()

# Additional startup check
def application_with_startup(*args, **kwargs):
    """WSGI application wrapper with startup validation"""
    try:
        # Quick validation that our setup worked
        import django
        django.setup()
        from books.models import Book
        book_count = Book.objects.count()
        logger.info(f"📊 Application starting with {book_count} books available")
    except Exception as e:
        logger.warning(f"Startup validation warning: {e}")
    
    return application(*args, **kwargs)

# Export the enhanced application
application = application_with_startup
