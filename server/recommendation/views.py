from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from commercial_area.models import *
# from .serializers import CommercialAreaSerializer, SeoulGuDongSerializer
from .serializers import CommercialAreaPeopleSerializer1020
from django.db.models import Sum
from copy import deepcopy
# from django.forms.models import model_to_dict
# Create your views here.


@api_view(['GET'])
@permission_classes([AllowAny])
def study_recommend(request, gu_name):
    # 출력용 리스트
    result = []
    # 상권 모두 조회하여 coms에 저장
    # 구 상관없이 요청이 왔을 경우
    if gu_name == 'none':
        coms = CommercialAreaPeople.objects.all().values('commercialArea').annotate(
            sum1020=Sum('likePeopleAge10')+Sum('likePeopleAge20')).order_by('-sum1020')[:20]
    # 구가 설정되어 요청이 왔을 경우 ----------------------- 아직 미완
    # else:
    #     coms = CommercialAreaPeople.objects.filter().values('commercialArea').annotate(
    #         sum1020=Sum('likePeopleAge10')+Sum('likePeopleAge20')).order_by('-sum1020')[:20]

    # 상권 번호만 추출하여 coms_nums에 저장
    coms_nums = []
    for com in coms:
        coms_nums.append(com['commercialArea'])

    # 상권 번호에 해당하는 집객시설 중 schoolNumber2 ~ universityNumber만 뽑아와서 세 학교의 합산수치를 sumSchools라는 새로운 칼럼으로 나타냄
    tmp = []
    for coms_idx in coms_nums:
        buildings = CommercialAreaBuilding.objects.filter(
            commercialArea=coms_idx).values('commercialArea', 'schoolNumber2', 'schoolNumber3', 'universityNumber').annotate(
            sumSchools=Sum('schoolNumber2')+Sum('schoolNumber3')+Sum('universityNumber'))
        # 출력된 쿼리셋을 리스트 모양으로 만들어서 tmp에 저장
        tmp.append(list(buildings)[0])

    # 집객시설을 sumSchools를 기준으로 내림차순 정렬하여 new_tmp에 저장
    new_tmp = sorted(tmp, key=lambda x: x['sumSchools'], reverse=True)

    # new_tmp의 상위5개만 result에 저장
    result = deepcopy(new_tmp[:5])

    # result의 상권번호들을 이용하여 상권명, XY좌표, 중심좌표를 조회함
    for idx in range(len(result)):
        commercial_info = CommercialArea.objects.filter(
            commercialAreaCode=result[idx]['commercialArea']).values('commercialAreaName', 'commercialAreaXYPoint', 'commercialCenterXPoint', 'commercialCenterYPoint')

        # eval() : String 형식의 데이터를 List 모양으로 만들어줌
        tmp_xy = eval(''.join(commercial_info[0]['commercialAreaXYPoint']))

        # result의 각 항목에 해당하는 데이터 저장
        result[idx]['commercialAreaName'] = commercial_info[0]['commercialAreaName']
        result[idx]['commercialAreaXYPoint'] = tmp_xy
        result[idx]['commercialCenterXPoint'] = commercial_info[0]['commercialCenterXPoint']
        result[idx]['commercialCenterYPoint'] = commercial_info[0]['commercialCenterYPoint']

        # result에 들어간 상권들에 10 ~ 20대 생활인구 합산 수를 부여하기위한 반복문
        for li_com in list(coms):
            if li_com['commercialArea'] == result[idx]['commercialArea']:
                result[idx]['sum1020'] = li_com['sum1020']
                break
    # result가 리스트내의 딕셔너리 형태이므로 바로 Response
    return Response(result)

@api_view(['GET'])
@permission_classes([AllowAny])
def kid_recommend(request, gu_name):
    Data = []
    tmp_data = {
        'commercialArea': '',
        'commercialAreaName': '',
        'kindergardenNumber': 0,
        'schoolNumber': 0,
        'schoolTotal': 0,
        'lifePeople_30': 0,
        'commercialAreaCenterXPoint': '',
        'commercialAreaCenterYPoint': '',
        'commercialAreaXYPoint': []  
    }
    # gu_name이 없는 경우 objects.all을 하면된다.
    gu_sanggwon = SeoulGuDong.objects.filter(guName = gu_name)
    # print(gu_sanggwon.values())
    for sanggwon in gu_sanggwon: # 구 안의 모든 상권을 순회
        commercial_area_in_gu = CommercialArea.objects.filter(seoulGuDong = sanggwon.dongCode)
        # print(commercial_area_in_gu.values())
        for commercial_area in commercial_area_in_gu:
            tmp_data['commercialArea'] = commercial_area.commercialAreaCode
            tmp_data['commercialAreaName'] = commercial_area.commercialAreaName
            tmp_data['commercialAreaCenterXPoint'] = commercial_area.commercialCenterXPoint
            tmp_data['commercialAreaCenterYPoint'] = commercial_area.commercialCenterYPoint
            tmp_data['commercialAreaXYPoint'] = eval(commercial_area.commercialAreaXYPoint)
            commercial_building = CommercialAreaBuilding.objects.filter(commercialArea = commercial_area.commercialAreaCode)
            commercial_lifepeople = CommercialAreaPeople.objects.filter(commercialArea = commercial_area.commercialAreaCode)

            try:
                tmp_data['kindergardenNumber'] = commercial_building[0].kindergardenNumber
                tmp_data['schoolNumber'] = commercial_building[0].schoolNumber
                tmp_data['lifePeople_30'] = commercial_lifepeople[0].likePeopleAge30
                tmp_data['schoolTotal'] = commercial_building[0].schoolNumber + commercial_building[0].kindergardenNumber
            except:
                pass
            Data.append(deepcopy(tmp_data))
    # 중복값 제거
    data = []
    for d in Data:
        if d not in data:
            data.append(d) 
    # 주요 조건 별로 정렬 후 상위 5개를 출력
    data_sortedby = sorted(data, key = lambda x:  (-x['schoolTotal'], -x['lifePeople_30']))[:5]
    # print(data_sortedby)
    return JsonResponse(data_sortedby, safe=False)

@api_view(['GET'])
@permission_classes([AllowAny])
def play_recommend(request, gu_name):
    Data = []
    tmp_data = {
        'commercialArea': '',
        'commercialAreaName': '',
        'schoolNumber2': 0,
        'schoolNumber3': 0,
        'universityNumber': 0,
        'schoolTotal': 0, 
        'lifePeople_10': 0,
        'lifePeople_20': 0,
        'peopleTotal': 0,
        'commercialAreaCenterXPoint': '',
        'commercialAreaCenterYPoint': '',
        'commercialAreaXYPoint': []  
    }
    # gu_name이 없는 경우 objects.all을 하면된다.
    gu_sanggwon = SeoulGuDong.objects.filter(guName = gu_name)
    # print(gu_sanggwon.values())
    for sanggwon in gu_sanggwon: # 구 안의 모든 상권을 순회
        commercial_area_in_gu = CommercialArea.objects.filter(seoulGuDong = sanggwon.dongCode)
        # print(commercial_area_in_gu.values())
        for commercial_area in commercial_area_in_gu:
            tmp_data['commercialArea'] = commercial_area.commercialAreaCode
            tmp_data['commercialAreaName'] = commercial_area.commercialAreaName
            tmp_data['commercialAreaCenterXPoint'] = commercial_area.commercialCenterXPoint
            tmp_data['commercialAreaCenterYPoint'] = commercial_area.commercialCenterYPoint
            tmp_data['commercialAreaXYPoint'] = eval(commercial_area.commercialAreaXYPoint)
            commercial_building = CommercialAreaBuilding.objects.filter(commercialArea = commercial_area.commercialAreaCode)
            commercial_lifepeople = CommercialAreaPeople.objects.filter(commercialArea = commercial_area.commercialAreaCode)

            try:
                tmp_data['schoolNumber2'] = commercial_building[0].schoolNumber2
                tmp_data['schoolNumber3'] = commercial_building[0].schoolNumber3
                tmp_data['universityNumber'] = commercial_building[0].universityNumber
                tmp_data['lifePeople_10'] = commercial_lifepeople[0].likePeopleAge10
                tmp_data['lifePeople_20'] = commercial_lifepeople[0].likePeopleAge20
                tmp_data['schoolTotal'] = commercial_building[0].schoolNumber2 + commercial_building[0].schoolNumber3 + commercial_building[0].universityNumber
                tmp_data['peopleTotal'] = commercial_lifepeople[0].likePeopleAge20 + commercial_lifepeople[0].likePeopleAge10
            except:
                pass
            Data.append(deepcopy(tmp_data))
    # 중복값 제거
    data = []
    for d in Data:
        if d not in data:
            data.append(d) 
    
    # 주요 조건 별로 정렬 후 상위 5개를 출력
    data_sortedby_lifepeople = sorted(data, key = lambda x: (-x['peopleTotal'],-x['schoolTotal']))[:5]
    return JsonResponse(data_sortedby_lifepeople, safe=False)

