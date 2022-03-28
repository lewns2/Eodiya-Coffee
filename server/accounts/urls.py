import imp
from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token
from . import views


app_name = 'accounts'

urlpatterns = [
    path('signup/', views.signup),
    path('api-token-auth/', obtain_jwt_token),
    path('signout/', views.signout),
]
