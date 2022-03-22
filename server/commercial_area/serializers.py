from rest_framework import serializers
from .models import CommercialArea, SeoulGuDong

class CommercialAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommercialArea
        fields = '__all__'
        
class SeoulGuDongSerializer(serializers.ModelSerializer):
    class Meta:
        model = SeoulGuDong
        fields = '__all__'