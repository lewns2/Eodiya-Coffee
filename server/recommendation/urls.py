from django.urls import path
from . import views


urlpatterns = [
    path('recommend/study/<str:gu_name>/', views.study_recommend)
    # path('recommend/brunch/<str:gu_name>/', views.recommend)
    # path('recommend/<str:gu_name>/', views.recommend)
]
