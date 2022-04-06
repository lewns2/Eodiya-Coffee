
from distutils.command import build
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
    # 구가 설정되어 요청이 왔을 경우
    else:
        # 해당 구에 있는 동 목록 뽑아옴
        dongs = SeoulGuDong.objects.filter(guName=gu_name).values('dongCode')
        coms_list = []
        # 각 동에 있는 상권들 불러와서 coms_list에 상권코드를 담아줌
        for dong in dongs:
            coms_in_dong = CommercialArea.objects.filter(
                seoulGuDong_id=dong['dongCode']).values('commercialAreaCode')
            for com_in_dong in list(coms_in_dong):
                coms_list.append(com_in_dong['commercialAreaCode'])

        # 상권코드를 하나씩 불러와서 생활인구 조회
        coms = []
        for coms_element in coms_list:
            my_new_search = CommercialAreaPeople.objects.filter(commercialArea=coms_element).values('commercialArea').annotate(
                sum1020=Sum('likePeopleAge10')+Sum('likePeopleAge20'))

            # 상권 코드와 생활인구를 coms에 저장
            coms.append(
                {'commercialArea': my_new_search[0]['commercialArea'], 'sum1020': my_new_search[0]['sum1020']})

        # 상위20개만 정렬
        coms = sorted(coms, key=lambda x: x['sum1020'], reverse=True)[:20]

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


def dessert_recommend(request, gu_name):
    # 출력용 리스트
    result = []
    # 상권 모두 조회하여 coms에 저장
    # 구 상관없이 요청이 왔을 경우
    if gu_name == 'none':
        coms = CommercialAreaPeople.objects.all().values('commercialArea', 'maleLikePeople', 'femaleLikePeople').annotate(
            life_people_sum2030=Sum('likePeopleAge20')+Sum('likePeopleAge30')).order_by('-life_people_sum2030')[:20]
    # 구가 설정되어 요청이 왔을 경우
    else:
        # 해당 구에 있는 동 목록 뽑아옴
        dongs = SeoulGuDong.objects.filter(guName=gu_name).values('dongCode')
        coms_list = []
        # 각 동에 있는 상권들 불러와서 coms_list에 상권코드를 담아줌
        for dong in dongs:
            coms_in_dong = CommercialArea.objects.filter(
                seoulGuDong_id=dong['dongCode']).values('commercialAreaCode')
            for com_in_dong in list(coms_in_dong):
                coms_list.append(com_in_dong['commercialAreaCode'])

        # 상권코드를 하나씩 불러와서 생활인구 조회
        coms = []
        for coms_element in coms_list:
            my_new_search = CommercialAreaPeople.objects.filter(commercialArea=coms_element).values('commercialArea').annotate(
                sum1020=Sum('likePeopleAge10')+Sum('likePeopleAge20'))

            # 상권 코드와 생활인구를 coms에 저장
            coms.append(
                {'commercialArea': my_new_search[0]['commercialArea'], 'sum1020': my_new_search[0]['sum1020']})

        # 상위20개만 정렬
        coms = sorted(coms, key=lambda x: x['sum1020'], reverse=True)[:20]

    # 상권 번호만 추출하여 coms_nums에 저장
    coms_nums = []
    for com in coms:
        coms_nums.append(com['commercialArea'])
    print(coms)
    print(coms_nums)
    # 상권 번호에 해당하는 집객시설 중 schoolNumber2 ~ universityNumber만 뽑아와서 세 학교의 합산수치를 sumSchools라는 새로운 칼럼으로 나타냄
    tmp = []
    return
