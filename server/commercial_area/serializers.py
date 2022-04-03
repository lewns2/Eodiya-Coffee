from rest_framework import serializers
from .models import SeoulGuDong, CommercialArea

class SeoulGuDongSerializer(serializers.ModelSerializer):
    class Meta:
        model = SeoulGuDong
        fields = '__all__'
        
class CommercialAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommercialArea
        fields = '__all__'