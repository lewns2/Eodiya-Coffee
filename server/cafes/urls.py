from django.urls import path
from . import views

urlpatterns = [
    path('cafes/<str:guName>/<str:dongName>/<str:tag>', views.get_cafes),
]