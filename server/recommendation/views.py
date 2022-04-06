
from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from commercial_area.models import *
# from .serializers import CommercialAreaSerializer, SeoulGuDongSerializer
from .serializers import CommercialAreaPeopleSerializer1020
from django.db.models import Sum
# Create your views here.


@api_view(['GET'])
@permission_classes([AllowAny])
def recommend(request):
    # coms = [[str(li.commercialAreaCode), li.one_two]
    #         for li in CommercialAreaPeople.objects.all()[:10]]
    # print(coms.one_two())
    coms = CommercialAreaPeople.objects.all().values('commercialArea').annotate(
        sum1020=Sum('likePeopleAge10')+Sum('likePeopleAge20')).order_by('-sum1020')[:20]
    print(coms)
    result = []
    for com in coms:
        result.append(com['commercialArea'])
        # result.insert(0, com['commercialArea'])
    print(result)

    for res in result:
        buildings = CommercialAreaBuilding.objects.filter(
            CommercialArea_id=res).values('')
    # new_coms = CommercialAreaPeopleSerializer1020(coms, many=True).data
    # print(new_coms)
    return JsonResponse({'1': '1'})


@api_view(['GET'])
@permission_classes([AllowAny])
def recommend_kid(request, gu_name):
    data = {}
    # gu_name이 없는 경우 objects.all을 하면된다.
    gu_sanggwon = SeoulGuDong.objects.filter(guName = gu_name)
    # print(gu_sanggwon.values())
    sanggwon_data = []
    for sanggwon in gu_sanggwon:
        sanggwon_code = CommercialArea.objects.filter(seoulGuDong_id=sanggwon.dongCode)
        # print(sanggwon_code.values())
        sanggwon_data.append(sanggwon_code)
    print(sanggwon_data[0].values())
    # for sanggwon in sanggwon_data[0]:
    #     sanggwon_building = 
        
    
    return JsonResponse(data)