from django.urls import path
from . import views

urlpatterns = [
    path('cafes/', views.get_cafes),
    path('cafes/<int:UrlId>/', views.get_cafe_detail)
]