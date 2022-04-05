from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import JsonResponse
from django.db.models import Q
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import CommercialArea, SeoulGuDong, CommercialAreaRevenue
from .serializers import CommercialAreaSerializer, SeoulGuDongSerializer
from commercial_area import serializers



# gu_list = ['마포구','서대문구','은평구','종로구','중구','용산구','성동구','광진구',
#            '동대문구','성북구','강북구','도봉구','노원구','중랑구','강동구','송파구',
#            '강남구','서초구','관악구','동작구','영등포구','금천구','구로구','양천구','강서구']

# Create your views here.
@api_view(['GET'])
@permission_classes([AllowAny])
def commercial_area_gu(request, guName):
    data = {
        'guInfo' : [],
        'dongInfo': [],
        }
    seoulGuDong = SeoulGuDong.objects.filter(guName=guName)
    str1 = seoulGuDong[0].guXYPoint.replace('[', '').replace(']', '')
    lst1 = str1.split(', ')
    res1 = []
    temp = []
    for j in range(len(lst1)):
        temp.append(float(lst1[j]))
        if j%2 == 1:
            res1.append(temp)
            temp = []
    data['guInfo'].append(
        {
            'guName': seoulGuDong[0].guName,
            'guCenterXPoint': seoulGuDong[0].guCenterXPoint,
            'guCenterYPoint': seoulGuDong[0].guCenterYPoint,
            'guXYPoint': res1,
        }
    )
    for i in range(len(seoulGuDong)):
        str2 = seoulGuDong[i].dongXYPoint.replace('[', '').replace(']', '')
        lst2 = str2.split(', ')
        res2 = []
        temp = []
        for j in range(len(lst2)):
            temp.append(float(lst2[j]))
            if j%2 == 1:
                res2.append(temp)
                temp = []
        data['dongInfo'].append(
            {
                'dongCode': seoulGuDong[i].dongCode,
                'dongName': seoulGuDong[i].dongName,
                'dongCenterXPoint': seoulGuDong[i].dongCenterXPoint,
                'dongCenterYPoint': seoulGuDong[i].dongCenterYPoint,
                'dongXYPoint': res2
            }
        )
    return JsonResponse(data)

@api_view(['GET'])
@permission_classes([AllowAny])
def commercial_area_dong(request, guName, dongName):
    data = {
        'commercialAreaInfo' : [],
    }
    commercialArea = CommercialArea.objects.filter(seoulGuDong__dongName=dongName)
    for i in range(len(commercialArea)):
        str1 = commercialArea[i].commercialAreaXYPoint.replace('[', '').replace(']', '')
        lst1 = str1.split(', ')
        res1 = []
        temp = []
        for j in range(len(lst1)):
            temp.append(float(lst1[j]))
            if j%2 == 1:
                res1.append(temp)
                temp = []
        data['commercialAreaInfo'].append(
            {
                'commercialAreaCode' : commercialArea[i].commercialAreaCode,
                'commercialAreaName' : commercialArea[i].commercialAreaName,
                'commercialAreaXYPoint' : res1,
            }
        )
    return JsonResponse(data)


@api_view(['GET'])
@permission_classes([AllowAny])
def dong_info(request, guName, dongName):
    data = {
        'dongInfo' : [],
    }
    commercialArea = CommercialArea.objects.filter(seoulGuDong__dongName=dongName)
    num = len(commercialArea)
    if num == 0:
        data['dongInfo'].append('상권이 없습니다.')
    else:
        quarterRevenue, perRevenue = 0, 0
        ageGroupDict = dict()
        timeGroupDict = dict()
        numberStore, openingStore, closureStore, openingRate, closureRate = 0, 0, 0, 0, 0
        likePeople, maleLikePeople, femaleLikePeople = 0, 0, 0
        likePeopleAge10, likePeopleAge20, likePeopleAge30, likePeopleAge40, likePeopleAge50, likePeopleAge60 = 0, 0, 0, 0, 0, 0
        
        for i in range(len(commercialArea)):
            quarterRevenue += commercialArea[i].commercialarearevenue.quarterRevenue
            perRevenue += commercialArea[i].commercialarearevenue.perRevenue
            if ageGroupDict.get(commercialArea[i].commercialarearevenue.ageGroup) == None:
                ageGroupDict[commercialArea[i].commercialarearevenue.ageGroup] = 1
            else:
                ageGroupDict[commercialArea[i].commercialarearevenue.ageGroup] += 1
            if timeGroupDict.get(commercialArea[i].commercialarearevenue.timeGroup) == None:
                timeGroupDict[commercialArea[i].commercialarearevenue.timeGroup] = 1
            else:
                timeGroupDict[commercialArea[i].commercialarearevenue.timeGroup] += 1
            numberStore += commercialArea[i].commercialareanumber.numberStore
            openingStore += commercialArea[i].commercialareanumber.openingStore
            closureStore += commercialArea[i].commercialareanumber.closureStore
            openingRate += commercialArea[i].commercialareanumber.openingRate
            closureRate += commercialArea[i].commercialareanumber.closureRate
            likePeople += commercialArea[i].commercialareapeople.likePeople
            maleLikePeople += commercialArea[i].commercialareapeople.maleLikePeople
            femaleLikePeople += commercialArea[i].commercialareapeople.femaleLikePeople
            likePeopleAge10 += commercialArea[i].commercialareapeople.likePeopleAge10
            likePeopleAge20 += commercialArea[i].commercialareapeople.likePeopleAge20
            likePeopleAge30 += commercialArea[i].commercialareapeople.likePeopleAge30
            likePeopleAge40 += commercialArea[i].commercialareapeople.likePeopleAge40
            likePeopleAge50 += commercialArea[i].commercialareapeople.likePeopleAge50
            likePeopleAge60 += commercialArea[i].commercialareapeople.likePeopleAge60
        quarterRevenue /= num
        perRevenue /= num
        max_temp = max(ageGroupDict.values())
        for key in ageGroupDict:
            if ageGroupDict[key] == max_temp:
                ageGroup = key
                break
        max_temp = max(timeGroupDict.values())
        for key in timeGroupDict:
            if timeGroupDict[key] == max_temp:
                timeGroup = key
                break
        numberStore /= num
        openingStore /= num
        closureStore /= num
        openingRate /= num
        closureRate /= num
        likePeople /= num
        maleLikePeople /= num
        femaleLikePeople /= num
        likePeopleAge10 /= num
        likePeopleAge20 /= num
        likePeopleAge30 /= num
        likePeopleAge40 /= num
        likePeopleAge50 /= num
        likePeopleAge60 /= num
        
        data['dongInfo'].append(
            {
                'quarterRevenue' : round(quarterRevenue, 2),
                'perRevenue' : round(perRevenue, 2),
                'ageGroup' : ageGroup,
                'timeGroup' : timeGroup,
                'numberStore' : round(numberStore, 2),
                'openingStore' : round(openingStore, 2),
                'closureStore' : round(closureStore, 2),
                'openingRate' : round(openingRate, 2),
                'closureRate' : round(closureRate, 2),
                'likePeople' : round(likePeople, 2),
                'maleLikePeople' : round(maleLikePeople, 2),
                'femaleLikePeople' : round(femaleLikePeople, 2),
                "likePeopleAge10" : round(likePeopleAge10, 2),
                "likePeopleAge20" : round(likePeopleAge20, 2),
                "likePeopleAge30" : round(likePeopleAge30, 2),
                "likePeopleAge40" : round(likePeopleAge40, 2),
                "likePeopleAge50" : round(likePeopleAge50, 2),
                "likePeopleAge60" : round(likePeopleAge60, 2),
            }
        )
    return JsonResponse(data)


# @api_view(['GET'])
# @permission_classes([AllowAny])
# def dong_info_detail(request, guName, dongName):
#     data = {
#         'detailInfo' : []
#     }
#     commercialArea = CommercialArea.objects.filter(seoulGuDong__dongName=dongName)
#     num = len(commercialArea)
#     if num == 0:
#         data['detailInfo'].append('상권이 없습니다.')
#     else:
#         likePeople, maleLikePeople, femaleLikePeople = 0, 0, 0
#         likePeopleAge10, likePeopleAge20, likePeopleAge30, likePeopleAge40, likePeopleAge50, likePeopleAge60 = 0, 0, 0, 0, 0, 0
#         for i in range(len(commercialArea)):
#             likePeople += commercialArea[i].commercialareapeople.likePeople
#             maleLikePeople += commercialArea[i].commercialareapeople.maleLikePeople
#             femaleLikePeople += commercialArea[i].commercialareapeople.femaleLikePeople
#             likePeopleAge10 += commercialArea[i].commercialareapeople.likePeopleAge10
#             likePeopleAge20 += commercialArea[i].commercialareapeople.likePeopleAge20
#             likePeopleAge30 += commercialArea[i].commercialareapeople.likePeopleAge30
#             likePeopleAge40 += commercialArea[i].commercialareapeople.likePeopleAge40
#             likePeopleAge50 += commercialArea[i].commercialareapeople.likePeopleAge50
#             likePeopleAge60 += commercialArea[i].commercialareapeople.likePeopleAge60
#         data['detailInfo'].append(
#             {
#                 "likePeopleAge10" : likePeopleAge10,
#                 "likePeopleAge20" : likePeopleAge20,
#                 "likePeopleAge30" : likePeopleAge30,
#                 "likePeopleAge40" : likePeopleAge40,
#                 "likePeopleAge50" : likePeopleAge50,
#                 "likePeopleAge60" : likePeopleAge60,
#             }
#         )
#     return JsonResponse(data)



@api_view(['GET'])
@permission_classes([AllowAny])
def dong_info_location(request, guName, dongName):
    data = {
        'locationInfo' : []
    }
    commercialArea = CommercialArea.objects.filter(seoulGuDong__dongName=dongName)
    num = len(commercialArea)
    if num == 0:
        data['locationInfo'].append('상권이 없습니다.')
    else:
        bankNumber, hospitalNumber, pharmacyNumber, kindergardenNumber, schoolNumber, universityNumber, departmentStoreNumber, supermarketNumber, theaterNumber, hotelNumber, busTerminalNumber, subwayNumber, busStopNumber = 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        
        for i in range(len(commercialArea)):
            try:
                bankNumber += commercialArea[i].commercialareabuilding.bankNumber
                hospitalNumber += commercialArea[i].commercialareabuilding.hospitalNumber
                pharmacyNumber += commercialArea[i].commercialareabuilding.pharmacyNumber
                kindergardenNumber += commercialArea[i].commercialareabuilding.kindergardenNumber
                schoolNumber += commercialArea[i].commercialareabuilding.schoolNumber
                universityNumber += commercialArea[i].commercialareabuilding.universityNumber
                departmentStoreNumber += commercialArea[i].commercialareabuilding.departmentStoreNumber
                supermarketNumber += commercialArea[i].commercialareabuilding.supermarketNumber
                theaterNumber += commercialArea[i].commercialareabuilding.theaterNumber
                hotelNumber += commercialArea[i].commercialareabuilding.hotelNumber
                busTerminalNumber += commercialArea[i].commercialareabuilding.busTerminalNumber
                subwayNumber += commercialArea[i].commercialareabuilding.subwayNumber
                busStopNumber += commercialArea[i].commercialareabuilding.busStopNumber
            except:
                continue
        data['locationInfo'].append(
            {
                'bankNumber' : bankNumber,
                'hospitalNumber' : hospitalNumber,
                'pharmacyNumber' : pharmacyNumber,
                'kindergardenNumber' : kindergardenNumber,
                'schoolNumber' : schoolNumber,
                'universityNumber' : universityNumber,
                'departmentStoreNumber' : departmentStoreNumber,
                'supermarketNumber' : supermarketNumber,
                'theaterNumber' : theaterNumber,
                'hotelNumber' : hotelNumber,
                'busTerminalNumber' : busTerminalNumber,
                'subwayNumber' : subwayNumber,
                'busStopNumber' : busStopNumber,
            }
        )
    return JsonResponse(data)



@api_view(['GET'])
@permission_classes([AllowAny])
def dong_info_recommend(request, guName, dongName):
    data = {
        'recommend1' : [],
        'recommend2' : [],
        'recommend3' : [],
    }
    ### recommend1
    
    seoulCommercialArea = CommercialArea.objects.all()
    seoulAvg = 0
    for i in range(len(seoulCommercialArea)):
        seoulAvg += seoulCommercialArea[i].commercialarearevenue.quarterRevenue
    seoulAvg /= len(seoulCommercialArea)
    ### 1
    ### 상권 평균 매출 >= 서울시 평균 매출 and 상권 == 다이나믹 or 상권 == 상권확장
    commercialArea1 = CommercialArea.objects.filter(seoulGuDong__guName=guName, commercialAreaChange='다이나믹')
    commercialArea2 = CommercialArea.objects.filter(seoulGuDong__guName=guName, commercialAreaChange='상권확장')
    commercialArea = commercialArea1 | commercialArea2
    ### 2
    ### 상권 평균 매출 >= 서울시 평균 매출
    commercialArea = CommercialArea.objects.filter(seoulGuDong__guName=guName)
    
    commercialArea = commercialArea.order_by('-commercialarearevenue__quarterRevenue')
    num = len(commercialArea)
    if num == 0:
        data['recommend1'].append('상권이 없습니다.')
    else:
        for i in range(len(commercialArea)):
            print(commercialArea[i].commercialarearevenue.quarterRevenue)
            if commercialArea[i].commercialarearevenue.quarterRevenue >= seoulAvg:
                data['recommend1'].append(
                    {
                        'commercialAreaName' : commercialArea[i].commercialAreaName,
                        'commercialQuarterRevenue' : commercialArea[i].commercialarearevenue.quarterRevenue,
                        'commercialAreaChange' : commercialArea[i].commercialAreaChange,
                    }
                )
        if data['recommend1'] == []:
            data['recommend1'].append('상권이 없습니다.')
    return JsonResponse(data)