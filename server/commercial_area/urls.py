from django.urls import path
from . import views

urlpatterns = [
    # path('commercial_area/', views.commercial_area),
    path('commercial_area/<int:code_pk>', views.commercial_area_detail),
]
