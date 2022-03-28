from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import CommercialArea
from .serializers import CommercialAreaSerializer

# Create your views here.

# @api_view(['GET'])
# def commercial_area(request):
    # 동 상권 조회
    # commercialarea = get_list_or_404(CommercialArea)
    # serializer = CommercialAreaSerializer(commercialarea, many=True)
    # return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def commercial_area_detail(request, code_pk):
    # 상권 단일 조회
    commercialArea = get_object_or_404(CommercialArea, commercialAreaCode=code_pk)
    serializer = CommercialAreaSerializer(commercialArea)
    return Response(serializer.data)