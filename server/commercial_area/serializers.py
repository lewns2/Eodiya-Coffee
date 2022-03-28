from rest_framework import serializers
from .models import SeoulGuDong, CommercialArea

class CommercialAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommercialArea
        fields = '__all__'