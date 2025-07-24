from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def root_health_check(request):
    """Simple health check at root URL"""
    return JsonResponse({
        'status': 'healthy',
        'message': 'BookHub Backend is running',
        'endpoints': {
            'health': '/api/health/',
            'books': '/api/books/',
            'admin': '/admin/'
        }
    })

urlpatterns = [
    path('', root_health_check, name='root-health'),
    path('admin/', admin.site.urls),
    path('api/', include('books.urls')),
]
