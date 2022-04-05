from django.shortcuts import render
from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import JsonResponse
from rest_framework import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import CafeList
from commercial_area.models import SeoulGuDong
from .serializers import CafeListSerializer
# Create your views here.

# word_grouping = {
#     '브런치카페': [],
#     '키즈카페': [],
#     '애견카페': [],
    
# }



# 카페 정보 요청
@api_view(['GET'])
@permission_classes([AllowAny])
def get_cafes(request, guName, dongName, tag):
    cafes = CafeList.objects.filter(guName = guName)
    print(cafes)
    cafeDong = SeoulGuDong.objects.filter(guName = guName, dongName = dongName)
    print(cafeDong)
    serializer = CafeListSerializer(cafes, many=True)
    # 데이터를 프론트에서 원하는 형식으로 만들어줘야 한다.
    
    return Response(serializer.data)

    
