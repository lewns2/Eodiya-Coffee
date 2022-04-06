from django.urls import path
from . import views


urlpatterns = [
    path('recommend/', views.recommend),
    path('recommend/kids/<str:gu_name>/', views.recommend_kid)
    
]
