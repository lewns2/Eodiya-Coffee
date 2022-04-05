from rest_framework import serializers
from .models import CafeList, CafeMenu
from commercial_area.serializers import CommercialAreaSerializer

class CafeListSerializer(serializers.ModelSerializer):
    commercialCode = CommercialAreaSerializer(many=True, read_only=True)
    class Meta:
        model = CafeList
        fields = ('dongCode', 'commercialCode', 'guName', 'UrlId', 'cafeName', 'cafeRate',
                  'reviewCount', 'cafeAddress', 'cafeHour', 'cafeTel', 'cafeHomepage', 'cafeTag', 
                  'cafePhoto', 'cafePoint'
                  )

class CafeMenuSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CafeMenu
        fields = '__all__'