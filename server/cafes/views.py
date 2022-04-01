from django.shortcuts import render
from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import JsonResponse
# from rest_framework import status
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.response import Response
# from rest_framework.permissions import AllowAny
# from rest_framework.serializer import Serializers
from .models import CafeList
from .serializers import CafeListSerializer
# Create your views here.

# 카페 정보 요청
# @api_view(['GET'])
def get_cafes(request):
    cafes = CafeList.objects.all()
    serializer = CafeListSerializer(cafes, many=True)
    # 데이터를 프론트에서 원하는 형식으로 만들어줘야 한다.
    
    return JsonResponse(serializer.data)

# @api_view(['GET'])
def get_cafe_detail(request, UrlId):
    cafe = CafeList.objects.filter(cafe_pk = UrlId)
    serializer = CafeListSerializer(cafe, many=True)
    # 데이터를 프론트에서 원하는 형식으로 만들어줘야 한다.
    
    return JsonResponse(serializer.data)
    
