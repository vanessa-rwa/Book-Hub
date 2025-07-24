from django.urls import path
from .views import BookList, BookDetail, HealthCheck

urlpatterns = [
    path('health/', HealthCheck.as_view(), name='health-check'),
    path('books/', BookList.as_view(), name='book-list'),
    path('books/<int:pk>/', BookDetail.as_view(), name='book-detail'),
]
