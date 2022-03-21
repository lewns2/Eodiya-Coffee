from rest_framework import serializers
from .models import CommercialArea1, CommercialArea2, CommercialArea3

class CommercialAreaSerializer1(serializers.ModelSerializer):
    class Meta:
        model = CommercialArea1
        fields = '__all__'
        
class CommercialAreaSerializer2(serializers.ModelSerializer):
    class Meta:
        model = CommercialArea2
        fields = '__all__'
        
class CommercialAreaSerializer3(serializers.ModelSerializer):
    class Meta:
        model = CommercialArea3
        fields = '__all__'        