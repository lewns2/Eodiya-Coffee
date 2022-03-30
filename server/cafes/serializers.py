from rest_framework import serializers
from .models import CafeList

class CafeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CafeList
        fields = '__all__'