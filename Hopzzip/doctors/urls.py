from django.urls import path
from .views import doctor_dashboard, token_detail

urlpatterns = [
    path('dashboard/<int:doctor_id>/', doctor_dashboard, name='doctor_dashboard'),
    path('token/<int:token_id>/', token_detail, name='token_detail'),
]