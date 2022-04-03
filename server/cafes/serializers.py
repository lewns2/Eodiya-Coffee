from rest_framework import serializers
from .models import CafeList, CafeMenu

class CafeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CafeList
        fields = '__all__'

class CafeMenuSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CafeMenu
        fields = '__all__'