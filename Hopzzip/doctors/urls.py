from django.urls import path
from .views import doctor_dashboard,token_detail,doctor_login,doctor_logout

urlpatterns = [
    path("login/", doctor_login, name="doctor_login"),
    path("dashboard/", doctor_dashboard, name="doctor_dashboard"),
    path("token/<int:token_id>/", token_detail, name="token_detail"),
    path("logout/", doctor_logout, name="doctor_logout"),
]
