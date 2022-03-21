from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import CommercialArea1, CommercialArea2, CommercialArea3
from .serializers import CommercialAreaSerializer1, CommercialAreaSerializer2, CommercialAreaSerializer3
import pandas as pd

# Create your views here.

@api_view(['GET'])
def commercial_area_info(request, code_pk):
    commercialarea1 = get_object_or_404(CommercialArea1, code=code_pk)
    commercialarea2 = get_object_or_404(CommercialArea2, code=code_pk)
    commercialarea3 = get_object_or_404(CommercialArea3, code=code_pk)
    serializer1 = CommercialAreaSerializer1(commercialarea1)
    serializer2 = CommercialAreaSerializer2(commercialarea2)
    serializer3 = CommercialAreaSerializer3(commercialarea3)
    return Response([serializer1.data, serializer2.data, serializer3.data])