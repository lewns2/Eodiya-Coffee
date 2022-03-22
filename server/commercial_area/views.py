from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import SeoulGuDong, CommercialArea
from .serializers import SeoulGuDongSerializer, CommercialAreaSerializer

# Create your views here.

@api_view(['GET'])
def commercial_area(request):
    seoulgudongs = get_list_or_404(SeoulGuDong)
    serializer = SeoulGuDongSerializer(seoulgudongs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def commercial_area_detail(request, code_pk):
    commercialarea = get_object_or_404(CommercialArea, code=code_pk)
    serializer = CommercialAreaSerializer(commercialarea)
    return Response(serializer.data)