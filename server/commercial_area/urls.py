from django.urls import path
from . import views

urlpatterns = [
    path('<str:guName>', views.commercial_area_gu),
    path('<str:guName>/<str:dongName>', views.commercial_area_dong),
]
