from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import CommercialArea, SeoulGuDong
from .serializers import CommercialAreaSerializer, SeoulGuDongSerializer
from commercial_area import serializers



# gu_list = ['마포구','서대문구','은평구','종로구','중구','용산구','성동구','광진구',
#            '동대문구','성북구','강북구','도봉구','노원구','중랑구','강동구','송파구',
#            '강남구','서초구','관악구','동작구','영등포구','금천구','구로구','양천구','강서구']

# Create your views here.
@api_view(['GET'])
@permission_classes([AllowAny])
def commercial_area_gu(request, guName):
    seoulGuDong = SeoulGuDong.objects.filter(guName=guName)
    serializer = SeoulGuDongSerializer(seoulGuDong, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def commercial_area_dong(request, guName, dongName):
    commercialArea = CommercialArea.objects.filter(seoulGuDong__dongName=dongName)
    serializer = CommercialAreaSerializer(commercialArea, many=True)
    return Response(serializer.data)