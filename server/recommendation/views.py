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
    # print(coms)
    # print(len(coms))
    # 상권 번호에 해당하는 집객시설 중 schoolNumber2 ~ universityNumber만 뽑아와서 세 학교의 합산수치를 sumSchools라는 새로운 칼럼으로 나타냄
    tmp = []
    for com_idx in coms:
        buildings = CommercialAreaBuilding.objects.filter(
            commercialArea=com_idx['commercialArea']).values('commercialArea', 'schoolNumber2', 'schoolNumber3', 'universityNumber').annotate(
            sumSchools=Sum('schoolNumber2')+Sum('schoolNumber3')+Sum('universityNumber'))

        # 출력된 쿼리셋을 리스트 모양으로 만들어서 tmp에 저장
        if buildings:
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
        result[idx]['commercialAreaCenterXPoint'] = commercial_info[0]['commercialCenterXPoint']
        result[idx]['commercialAreaCenterYPoint'] = commercial_info[0]['commercialCenterYPoint']

        # result에 들어간 상권들에 10 ~ 20대 생활인구 합산 수를 부여하기위한 반복문
        for li_com in list(coms):
            if li_com['commercialArea'] == result[idx]['commercialArea']:
                result[idx]['sum1020'] = li_com['sum1020']
                break
    # result가 리스트내의 딕셔너리 형태이므로 바로 Response
    # print(result)
    return Response(result)


@api_view(['GET'])
@permission_classes([AllowAny])
def dessert_recommend(request, gu_name):
    # 출력용 리스트
    result = []
    # 상권 모두 조회하여 coms에 저장
    # 구 상관없이 요청이 왔을 경우
    if gu_name == 'none':
        coms = CommercialAreaPeople.objects.all().values('commercialArea').annotate(maleLifePeople=Sum('maleLikePeople'), femaleLifePeople=Sum('femaleLikePeople'), lifePeopleAge20=Sum('likePeopleAge20'), lifePeopleAge30=Sum(
            'likePeopleAge30'), life_people_female_sum2030=(Sum('likePeopleAge20') + Sum('likePeopleAge30')) * (Sum('femaleLikePeople') / (Sum('maleLikePeople') + Sum('femaleLikePeople')))).order_by('-life_people_female_sum2030')[:20]
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
            my_new_search = CommercialAreaPeople.objects.filter(commercialArea=coms_element).values('commercialArea', 'maleLikePeople', 'femaleLikePeople', 'likePeopleAge20', 'likePeopleAge30').annotate(
                life_people_female_sum2030=(Sum('likePeopleAge20') + Sum('likePeopleAge30')) * (Sum('femaleLikePeople') / (Sum('maleLikePeople') + Sum('femaleLikePeople'))))

            # 상권 코드와 생활인구를 coms에 저장
            coms.append(
                {
                    'commercialArea': my_new_search[0]['commercialArea'],
                    'maleLifePeople': my_new_search[0]['maleLikePeople'],
                    'femaleLifePeople': my_new_search[0]['femaleLikePeople'],
                    'lifePeopleAge20': my_new_search[0]['likePeopleAge20'],
                    'lifePeopleAge30': my_new_search[0]['likePeopleAge30'],
                    'life_people_female_sum2030': my_new_search[0]['life_people_female_sum2030'],
                }
            )

        # 상위20개만 정렬
        coms = sorted(
            coms, key=lambda x: x['life_people_female_sum2030'], reverse=True)[:20]
    # print(coms)
    for com_idx in coms:
        # print(com_idx['commercialArea'])
        background_apartmentAvgPrice = CommercialAreaApartment.objects.filter(
            commercialAreaCode=com_idx['commercialArea']).values('apartmentAvgPrice')
        com_idx['apartmentAvgPrice'] = background_apartmentAvgPrice[0]['apartmentAvgPrice']
        visits = CommercialAreaBuilding.objects.filter(
            commercialArea=com_idx['commercialArea']).values('universityNumber', 'theaterNumber').annotate(
            visitor_facilities=Sum('universityNumber')+Sum('theaterNumber'))
        if visits:
            com_idx['universityCount'] = visits[0]['universityNumber']
            com_idx['theaterCount'] = visits[0]['theaterNumber']
            com_idx['visitor_facilities'] = visits[0]['visitor_facilities'] + 10
        else:
            com_idx['universityCount'] = 0
            com_idx['theaterCount'] = 0
            com_idx['visitor_facilities'] = 10
    # print(coms)
    result = sorted(coms, key=lambda x: x['life_people_female_sum2030']
                    * x['apartmentAvgPrice'] * x['visitor_facilities'], reverse=True)[:5]

    for re in result:
        re['visitor_facilities'] = re.get('visitor_facilities') - 10
        commercial_info = CommercialArea.objects.filter(
            commercialAreaCode=re['commercialArea']).values('commercialAreaName', 'commercialAreaXYPoint', 'commercialCenterXPoint', 'commercialCenterYPoint')
        if commercial_info:
            # eval() : String 형식의 데이터를 List 모양으로 만들어줌
            tmp_xy = eval(''.join(commercial_info[0]['commercialAreaXYPoint']))

            # result의 각 항목에 해당하는 데이터 저장
            re['commercialAreaName'] = commercial_info[0]['commercialAreaName']
            re['commercialAreaXYPoint'] = tmp_xy
            re['commercialAreaCenterXPoint'] = commercial_info[0]['commercialCenterXPoint']
            re['commercialAreaCenterYPoint'] = commercial_info[0]['commercialCenterYPoint']
    print(result)
    # print(background_avgIncome)
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
    if gu_name == 'none':
        sanggwon = CommercialArea.objects.all()
        # print(sanggwon.values())
        for commercial_area in sanggwon:
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
                tmp_data['schoolTotal'] = commercial_building[0].schoolNumber + \
                    commercial_building[0].kindergardenNumber
            except:
                pass
            Data.append(deepcopy(tmp_data))
    else:
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
    data_sorted = sorted(data, key = lambda x:  (-x['schoolTotal'], -x['lifePeople_30']))[:5]
    # print(data_sorted)
    return JsonResponse(data_sorted, safe=False)


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
        'sort_criteria': 0,
        'commercialAreaCenterXPoint': '',
        'commercialAreaCenterYPoint': '',
        'commercialAreaXYPoint': []
    }
    # gu_name이 없는 경우 objects.all을 하면된다.
    if gu_name == 'none':
        sanggwon = CommercialArea.objects.all()
        # print(sanggwon.values())
        for commercial_area in sanggwon:
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
                tmp_data['schoolTotal'] = commercial_building[0].schoolNumber2 + \
                    commercial_building[0].schoolNumber3 + \
                    commercial_building[0].universityNumber
                tmp_data['peopleTotal'] = commercial_lifepeople[0].likePeopleAge20 + \
                    commercial_lifepeople[0].likePeopleAge10
                tmp_data['sort_criteria'] = tmp_data['peopleTotal'] * tmp_data['schoolTotal']
            except:
                pass
            Data.append(deepcopy(tmp_data))
    else:
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
                    tmp_data['sort_criteria'] = (commercial_lifepeople[0].likePeopleAge20 + commercial_lifepeople[0].likePeopleAge10) * (commercial_building[0].schoolNumber2 + commercial_building[0].schoolNumber3 + commercial_building[0].universityNumber)
                except:
                    pass
                Data.append(deepcopy(tmp_data))
    # 중복값 제거
    data = []
    for d in Data:
        if d not in data:
            data.append(d)
    ##########
    # 주요 조건 별로 정렬 후 상위 5개를 출력
    data_sorted = sorted(
        data, key=lambda x: (-x['sort_criteria']))[:5]
    return JsonResponse(data_sorted, safe=False)


@api_view(['GET'])
@permission_classes([AllowAny])
def cafebar_recommend(request, gu_name):
    Data = []
    tmp_data = {
        'commercialArea': '',
        'commercialAreaName': '',
        'lifePeople_20': 0,
        'lifePeople_30': 0,
        'peopleTotal': 0,
        'quarterRevenue': 0,
        'revenue_1721': 0,
        'revenue_2124': 0,
        'revenue_in_night': 0,
        'sort_criteria': 0,
        'commercialAreaCenterXPoint': '',
        'commercialAreaCenterYPoint': '',
        'commercialAreaXYPoint': []
    }
    # gu_name이 없는 경우 objects.all을 하면된다.
    if gu_name == 'none':
        sanggwon = CommercialArea.objects.all()
        # print(sanggwon.values())
        for commercial_area in sanggwon:
            tmp_data['commercialArea'] = commercial_area.commercialAreaCode
            tmp_data['commercialAreaName'] = commercial_area.commercialAreaName
            tmp_data['commercialAreaCenterXPoint'] = commercial_area.commercialCenterXPoint
            tmp_data['commercialAreaCenterYPoint'] = commercial_area.commercialCenterYPoint
            tmp_data['commercialAreaXYPoint'] = eval(commercial_area.commercialAreaXYPoint) 
            commercial_revenue = CommercialAreaRevenue.objects.filter(commercialArea = commercial_area.commercialAreaCode)
            commercial_lifepeople = CommercialAreaPeople.objects.filter(commercialArea = commercial_area.commercialAreaCode)

            try:
                tmp_data['quarterRevenue'] = commercial_revenue[0].quarterRevenue
                tmp_data['revenue_1721'] = commercial_revenue[0].revenue1721
                tmp_data['revenue_2124'] = commercial_revenue[0].revenue2124
                tmp_data['lifePeople_20'] = commercial_lifepeople[0].likePeopleAge20
                tmp_data['lifePeople_30'] = commercial_lifepeople[0].likePeopleAge30
                tmp_data['peopleTotal'] = commercial_lifepeople[0].likePeopleAge20 + \
                    commercial_lifepeople[0].likePeopleAge30
                tmp_data['revenue_in_night'] = commercial_revenue[0].revenue2124 + \
                    commercial_revenue[0].revenue1721
                tmp_data['sort_criteria'] = (commercial_revenue[0].quarterRevenue / (commercial_lifepeople[0].likePeopleAge20 + commercial_lifepeople[0].likePeopleAge30)) + \
                ((commercial_revenue[0].revenue2124 + commercial_revenue[0].revenue1721) / (commercial_lifepeople[0].likePeopleAge20 + commercial_lifepeople[0].likePeopleAge30))
            except:
                pass
            Data.append(deepcopy(tmp_data))
    else:
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
                commercial_revenue = CommercialAreaRevenue.objects.filter(commercialArea = commercial_area.commercialAreaCode)
                commercial_lifepeople = CommercialAreaPeople.objects.filter(commercialArea = commercial_area.commercialAreaCode)

                try:
                    tmp_data['quarterRevenue'] = commercial_revenue[0].quarterRevenue
                    tmp_data['revenue_1721'] = commercial_revenue[0].revenue1721
                    tmp_data['revenue_2124'] = commercial_revenue[0].revenue2124
                    tmp_data['lifePeople_20'] = commercial_lifepeople[0].likePeopleAge20
                    tmp_data['lifePeople_30'] = commercial_lifepeople[0].likePeopleAge30
                    tmp_data['peopleTotal'] = commercial_lifepeople[0].likePeopleAge20 + commercial_lifepeople[0].likePeopleAge30
                    tmp_data['revenue_in_night'] = commercial_revenue[0].revenue2124 + commercial_revenue[0].revenue1721
                    tmp_data['sort_criteria'] = (commercial_revenue[0].quarterRevenue / (commercial_lifepeople[0].likePeopleAge20 + commercial_lifepeople[0].likePeopleAge30)) + \
                    ((commercial_revenue[0].revenue2124 + commercial_revenue[0].revenue1721) / (commercial_lifepeople[0].likePeopleAge20 + commercial_lifepeople[0].likePeopleAge30))
                except:
                    pass
                Data.append(deepcopy(tmp_data))
    # 중복값 제거
    data = []
    for d in Data:
        if d not in data:
            data.append(d)
    ##########
    # 주요 조건 별로 정렬 후 상위 5개를 출력
    data_sorted = sorted(
        data, key=lambda x: (-x['sort_criteria']))[:5]
    return JsonResponse(data_sorted, safe=False)


@api_view(['GET'])
@permission_classes([AllowAny])
def coffee_recommend(request, gu_name):
    Data = []
    tmp_data = {
        'commercialArea': '',
        'commercialAreaName': '',
        'lifePeople': 0,
        'quarterRevenue': 0,
        'revenue_per_one_person': 0,
        'subwayNumber': 0,
        'busstopNumber': 0,
        'trainstationNumber': 0,
        'transportationNumber': 0,
        'busterminalNumber': 0,
        'schoolNumber': 0,
        'hospitalNumber': 0,
        'hotelNumber': 0,
        'theaterNumber': 0,
        'total_building': 0,
        'total_infra': 0,
        'rivalcoffeeshopNumber': 0,
        'sort_criteria': 0,
        'commercialAreaCenterXPoint': '',
        'commercialAreaCenterYPoint': '',
        'commercialAreaXYPoint': []
    }
    # gu_name이 없는 경우 objects.all을 하면된다.
    if gu_name == 'none':
        sanggwon = CommercialArea.objects.all()
        # print(sanggwon.values())
        for commercial_area in sanggwon:
            tmp_data['commercialArea'] = commercial_area.commercialAreaCode
            tmp_data['commercialAreaName'] = commercial_area.commercialAreaName
            tmp_data['commercialAreaCenterXPoint'] = commercial_area.commercialCenterXPoint
            tmp_data['commercialAreaCenterYPoint'] = commercial_area.commercialCenterYPoint
            tmp_data['commercialAreaXYPoint'] = eval(commercial_area.commercialAreaXYPoint) 
            commercial_revenue = CommercialAreaRevenue.objects.filter(commercialArea = commercial_area.commercialAreaCode)
            commercial_lifepeople = CommercialAreaPeople.objects.filter(commercialArea = commercial_area.commercialAreaCode)
            commercial_building = CommercialAreaBuilding.objects.filter(commercialArea = commercial_area.commercialAreaCode)
            commercial_shop = CommercialAreaNumber.objects.filter(commercialArea = commercial_area.commercialAreaCode)
            try:
                tmp_data['quarterRevenue'] = commercial_revenue[0].quarterRevenue
                tmp_data['lifePeople'] = commercial_lifepeople[0].likePeople
                tmp_data['subwayNumber'] = commercial_building[0].subwayNumber
                tmp_data['trainstationNumber'] = commercial_building[0].chuldoNumber
                tmp_data['busstopNumber'] = commercial_building[0].busStopNumber
                tmp_data['busterminalNumber'] = commercial_building[0].busTerminalNumber
                tmp_data['schoolNumber'] = commercial_building[0].schoolNumber
                tmp_data['hospitalNumber'] = commercial_building[0].hospitalNumber
                tmp_data['hotelNumber'] = commercial_building[0].hotelNumber
                tmp_data['theaterNumber'] = commercial_building[0].theaterNumber
                tmp_data['transportationNumber'] = (commercial_building[0].subwayNumber + commercial_building[0].chuldoNumber +
                                                    commercial_building[0].busStopNumber + commercial_building[0].busTerminalNumber)
                tmp_data['total_building'] = (commercial_building[0].theaterNumber + commercial_building[0].hotelNumber +
                                              commercial_building[0].hospitalNumber + commercial_building[0].schoolNumber)
                tmp_data['rivalcoffeeshopNumber'] = commercial_shop[0].numberStore
                tmp_data['revenue_per_one_person'] = round(
                    commercial_revenue[0].quarterRevenue/commercial_lifepeople[0].likePeople, 2)
                tmp_data['total_infra'] = (commercial_building[0].subwayNumber + commercial_building[0].chuldoNumber + commercial_building[0].busStopNumber + commercial_building[0].busTerminalNumber
                                            + commercial_building[0].theaterNumber + commercial_building[0].hotelNumber + commercial_building[0].hospitalNumber + commercial_building[0].schoolNumber)
                tmp_data['sort_criteria'] = round(((round(commercial_revenue[0].quarterRevenue/commercial_lifepeople[0].likePeople, 2)) / tmp_data['rivalcoffeeshopNumber']) * \
                                                  (commercial_building[0].subwayNumber + commercial_building[0].chuldoNumber + commercial_building[0].busStopNumber + commercial_building[0].busTerminalNumber \
                                                   + commercial_building[0].theaterNumber + commercial_building[0].hotelNumber + commercial_building[0].hospitalNumber + commercial_building[0].schoolNumber), 3)
            except:
                pass
            Data.append(deepcopy(tmp_data))
    else:
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
                commercial_revenue = CommercialAreaRevenue.objects.filter(commercialArea = commercial_area.commercialAreaCode)
                commercial_lifepeople = CommercialAreaPeople.objects.filter(commercialArea = commercial_area.commercialAreaCode)
                commercial_building = CommercialAreaBuilding.objects.filter(commercialArea = commercial_area.commercialAreaCode)
                commercial_shop = CommercialAreaNumber.objects.filter(commercialArea = commercial_area.commercialAreaCode)
                
                try:
                    tmp_data['quarterRevenue'] = commercial_revenue[0].quarterRevenue
                    tmp_data['lifePeople'] = commercial_lifepeople[0].likePeople
                    tmp_data['subwayNumber'] = commercial_building[0].subwayNumber
                    tmp_data['trainstationNumber'] = commercial_building[0].chuldoNumber
                    tmp_data['busstopNumber'] = commercial_building[0].busStopNumber
                    tmp_data['busterminalNumber'] = commercial_building[0].busTerminalNumber
                    tmp_data['schoolNumber'] = commercial_building[0].schoolNumber
                    tmp_data['hospitalNumber'] = commercial_building[0].hospitalNumber
                    tmp_data['hotelNumber'] = commercial_building[0].hotelNumber
                    tmp_data['theaterNumber'] = commercial_building[0].theaterNumber
                    tmp_data['transportationNumber'] = (commercial_building[0].subwayNumber + commercial_building[0].chuldoNumber + commercial_building[0].busStopNumber + commercial_building[0].busTerminalNumber)
                    tmp_data['total_building'] = (commercial_building[0].theaterNumber + commercial_building[0].hotelNumber + commercial_building[0].hospitalNumber + commercial_building[0].schoolNumber)
                    tmp_data['rivalcoffeeshopNumber'] = commercial_shop[0].numberStore
                    tmp_data['revenue_per_one_person'] = round(commercial_revenue[0].quarterRevenue/commercial_lifepeople[0].likePeople, 2)
                    tmp_data['total_infra'] = (commercial_building[0].subwayNumber + commercial_building[0].chuldoNumber + commercial_building[0].busStopNumber + commercial_building[0].busTerminalNumber
                                            + commercial_building[0].theaterNumber + commercial_building[0].hotelNumber + commercial_building[0].hospitalNumber + commercial_building[0].schoolNumber)
                    tmp_data['sort_criteria'] = round(((round(commercial_revenue[0].quarterRevenue/commercial_lifepeople[0].likePeople, 2)) / tmp_data['rivalcoffeeshopNumber']) * \
                                    (commercial_building[0].subwayNumber + commercial_building[0].chuldoNumber + commercial_building[0].busStopNumber + commercial_building[0].busTerminalNumber \
                                    + commercial_building[0].theaterNumber + commercial_building[0].hotelNumber + commercial_building[0].hospitalNumber + commercial_building[0].schoolNumber), 3)
                except:
                    pass
                Data.append(deepcopy(tmp_data))
    # 중복값 제거
    data = []
    for d in Data:
        if d not in data:
            data.append(d)
    ##########
    # 주요 조건 별로 정렬 후 상위 5개를 출력
    data_sorted = sorted(data, key=lambda x: (-x['sort_criteria']))[:5]
    return JsonResponse(data_sorted, safe=False)


@api_view(['GET'])
@permission_classes([AllowAny])
def machine_recommend(request, gu_name):
    Data = []
    tmp_data = {
        'commercialArea': '',
        'commercialAreaName': '',
        'salarymanNumber': 0,
        'lifePeopleAge10': 0,
        'lifePeopleAge20': 0,
        'totalPeople': 0,
        'apartmentAvgPrice': 0,
        'commercialAreaCenterXPoint': '',
        'commercialAreaCenterYPoint': '',
        'commercialAreaXYPoint': []
    }
    # gu_name이 없는 경우 objects.all을 하면된다.
    if gu_name == 'none':
        sanggwon = CommercialArea.objects.all()

        for commercial_area in sanggwon:
            tmp_data['commercialArea'] = commercial_area.commercialAreaCode
            tmp_data['commercialAreaName'] = commercial_area.commercialAreaName
            tmp_data['commercialAreaCenterXPoint'] = commercial_area.commercialCenterXPoint
            tmp_data['commercialAreaCenterYPoint'] = commercial_area.commercialCenterYPoint
            tmp_data['commercialAreaXYPoint'] = eval(commercial_area.commercialAreaXYPoint) 
            commercial_company = CommercialAreaCompany.objects.filter(commercialArea = commercial_area.commercialAreaCode)
            apartmentAvgPrice = CommercialAreaApartment.objects.filter(commercialAreaCode = commercial_area.commercialAreaCode)
            commercialAreaPeople = CommercialAreaPeople.objects.filter(commercialArea = commercial_area.commercialAreaCode)

            try:
                tmp_data['salarymanNumber'] = commercial_company[0].companyPeople
                tmp_data['apartmentAvgPrice'] = apartmentAvgPrice[0].apartmentAvgPrice
                tmp_data['lifePeopleAge10'] = commercialAreaPeople[0].likePeopleAge10
                tmp_data['lifePeopleAge20'] = commercialAreaPeople[0].likePeopleAge20
                tmp_data['totalPeople'] = commercialAreaPeople[0].likePeopleAge10 + commercialAreaPeople[0].likePeopleAge20 + commercial_company[0].companyPeople
            except:
                pass
            Data.append(deepcopy(tmp_data))
    else:
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
                commercial_company = CommercialAreaCompany.objects.filter(commercialArea = commercial_area.commercialAreaCode)
                apartmentAvgPrice = CommercialAreaApartment.objects.filter(commercialAreaCode = commercial_area.commercialAreaCode)
                commercialAreaPeople = CommercialAreaPeople.objects.filter(commercialArea = commercial_area.commercialAreaCode)

                try:
                    tmp_data['salarymanNumber'] = commercial_company[0].companyPeople
                    tmp_data['apartmentAvgPrice'] = apartmentAvgPrice[0].apartmentAvgPrice
                    tmp_data['lifePeopleAge10'] = commercialAreaPeople[0].likePeopleAge10
                    tmp_data['lifePeopleAge20'] = commercialAreaPeople[0].likePeopleAge20
                    tmp_data['totalPeople'] = commercialAreaPeople[0].likePeopleAge10 + commercialAreaPeople[0].likePeopleAge20 + commercial_company[0].companyPeople
                
                except:
                    pass
                Data.append(deepcopy(tmp_data))
    # 중복값 제거
    data = []
    for d in Data:
        if d not in data:
            data.append(d) 
    ##########
    # 주요 조건 별로 정렬 후 상위 5개를 출력
    data_sorted = sorted(data, key = lambda x: (-x['totalPeople'], x['apartmentAvgPrice']))[:5]
    return JsonResponse(data_sorted, safe=False)

@api_view(['GET'])
@permission_classes([AllowAny])
def brunch_recommend(request, gu_name):
    Data = []
    tmp_data = {
        'commercialArea': '',
        'commercialAreaName': '',
        'revenue1114': '',
        'numberStore': 0,
        'apartmentNumber': 0,
        'sort_criteria': 0,
        'commercialAreaCenterXPoint': '',
        'commercialAreaCenterYPoint': '',
        'commercialAreaXYPoint': []  
    }
    # gu_name이 없는 경우 objects.all을 하면된다.
    if gu_name == 'none':
        sanggwon = CommercialArea.objects.all()

        for commercial_area in sanggwon:
            tmp_data['commercialArea'] = commercial_area.commercialAreaCode
            tmp_data['commercialAreaName'] = commercial_area.commercialAreaName
            tmp_data['commercialAreaCenterXPoint'] = commercial_area.commercialCenterXPoint
            tmp_data['commercialAreaCenterYPoint'] = commercial_area.commercialCenterYPoint
            tmp_data['commercialAreaXYPoint'] = eval(commercial_area.commercialAreaXYPoint) 
            commercial_background = CommercialAreaBackground.objects.filter(commercialArea = commercial_area.commercialAreaCode)
            commercial_revenue = CommercialAreaRevenue.objects.filter(commercialArea = commercial_area.commercialAreaCode)
            numberStore = CommercialAreaNumber.objects.filter(commercialArea = commercial_area.commercialAreaCode)
            apartmentNumber = CommercialAreaApartment.objects.filter(commercialAreaCode = commercial_area.commercialAreaCode)
            try:
                tmp_data['revenue1114'] = commercial_revenue[0].revenue1114
                tmp_data['numberStore'] = numberStore[0].numberStore
                tmp_data['apartmentNumber'] = apartmentNumber[0].apartmentCount
                tmp_data['sort_criteria'] = round((apartmentNumber[0].apartmentCount * commercial_revenue[0].revenue1114) / numberStore[0].numberStore, 3)
                # tmp_data['avgIncome'] = commercial_background[0].avgIncome
            except:
                pass
            Data.append(deepcopy(tmp_data))
    else:
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
                commercial_background = CommercialAreaBackground.objects.filter(commercialArea = commercial_area.commercialAreaCode)
                commercial_revenue = CommercialAreaRevenue.objects.filter(commercialArea = commercial_area.commercialAreaCode)
                numberStore = CommercialAreaNumber.objects.filter(commercialArea = commercial_area.commercialAreaCode)
                apartmentNumber = CommercialAreaApartment.objects.filter(commercialArea = commercial_area.commercialAreaCode)

                try:
                    tmp_data['revenue1114'] = commercial_revenue[0].revenue1114
                    tmp_data['numberStore'] = numberStore[0].numberStore
                    tmp_data['apartmentNumber'] = apartmentNumber[0].apartmentCount
                    tmp_data['sort_criteria'] = round((apartmentNumber[0].apartmentCount * commercial_revenue[0].revenue1114) / numberStore[0].numberStore, 3)
                    # tmp_data['avgIncome'] = commercial_background[0].avgIncome
                except:
                    pass
                Data.append(deepcopy(tmp_data))
    # 중복값 제거
    data = []
    for d in Data:
        if d not in data:
            data.append(d) 
    ##########
    # 주요 조건 별로 정렬 후 상위 5개를 출력
    # print(data[0])
    data_sorted = sorted(data, key = lambda x: (-x['sort_criteria']))[:5]
    return JsonResponse(data_sorted, safe=False)




