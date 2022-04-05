from rest_framework import serializers
from commercial_area.models import *


class CommercialAreaPeopleSerializer1020(serializers.ModelSerializer):

    class Meta:
        model = CommercialAreaPeople
        fields = ('commercialArea', 'likePeopleAge10', 'likePeopleAge20')
