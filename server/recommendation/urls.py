from django.urls import path
from . import views


urlpatterns = [
    # path('recommend/', views.recommend),
    path('recommend/kids/<str:gu_name>/', views.kid_recommend),
    path('recommend/study/<str:gu_name>/', views.study_recommend),
    path('recommend/play/<str:gu_name>/', views.play_recommend),
    # path('recommend/brunch/<str:gu_name>/', views.recommend)
    # path('recommend/<str:gu_name>/', views.recommend)
]
