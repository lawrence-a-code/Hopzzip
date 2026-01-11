from django.urls import path
from .views import pharmacy_search,mark_given

urlpatterns = [
    path("search/", pharmacy_search, name="pharmacy_search"),
    path('given/<int:token_id>/',mark_given,name="mark_given")
]