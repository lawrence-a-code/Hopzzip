from django.urls import path
from .views import pharmacy_search, mark_given, pharmacy_login, pharmacy_logout

urlpatterns = [
    path("login/", pharmacy_login, name="pharmacy_login"),
    path("search/", pharmacy_search, name="pharmacy_search"),
    path("given/<int:token_id>/", mark_given, name="mark_given"),
    path("logout/", pharmacy_logout, name="pharmacy_logout"),
]