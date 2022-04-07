from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from django.shortcuts import get_object_or_404
from django.http.response import JsonResponse
from django.core import serializers

from .serializers import UserSerializer


# Create your views here.
@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    password = request.data.get('password')
    password_confirmation = request.data.get('passwordConfirmation')

    if password != password_confirmation:
        return Response({'error': '비밀번호가 일치하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

    serializer = UserSerializer(data=request.data)

    user_email = request.data.get('email')

    if get_user_model().objects.filter(email=user_email):
        return Response({'error': '이미 존재하는 Email입니다.'}, status=status.HTTP_400_BAD_REQUEST)

    if serializer.is_valid(raise_exception=True):
        user = serializer.save()
        user.set_password(request.data.get('password'))
        user.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return


@api_view(['PUT, DELETE'])
def signout(request):
    # print(request)
    user_email = request.data.get('email')
    password = request.data.get('password')

    user = get_object_or_404(get_user_model(), email=user_email)
    # user = get_user_model().objects.get(email=user_email)
    if user:
        if check_password(password, user.password):
            user.delete()
            return Response(status=status.HTTP_200_OK)

        return Response({"비밀번호가": "틀림"})

    return Response({"없는": "유저"})
