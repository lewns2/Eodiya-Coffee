from django.urls import path
from . import views

urlpatterns = [
    path('search/<str:guName>/<str:dongName>', views.dong_info),
    # path('search/<str:guName>/<str:dongName>/detail', views.dong_info_detail),
    path('search/<str:guName>/<str:dongName>/location', views.dong_info_location),
    path('search/<str:guName>/<str:dongName>/recommend', views.dong_info_recommend),
    path('search/<str:guName>/<str:dongName>/similar', views.dong_info_similar),
    path('<str:guName>', views.commercial_area_gu),
    path('<str:guName>/<str:dongName>', views.commercial_area_dong),
]
