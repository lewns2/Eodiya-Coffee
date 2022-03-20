import imp
from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token
from . import views


app_name = 'accounts'

urlpatterns = [
    path('api-token-auth/', obtain_jwt_token),
    path('signup', views.signup),
]