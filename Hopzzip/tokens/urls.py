from django.urls import path
from .views import create_token

urlpatterns = [
    path("create/", create_token, name="create_token"),
]