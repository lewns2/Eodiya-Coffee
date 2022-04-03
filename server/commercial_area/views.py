from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import JsonResponse
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
    commecialArea = CommercialArea.objects.filter(seoulGuDong__dongName=dongName)
    num = len(commecialArea)
    if num == 0:
        data['dongInfo'].append('상권이 없습니다.')
    else:
        quarterRevenue, perRevenue = 0, 0
        ageGroupDict = dict()
        timeGroupDict = dict()
        numberStore, openingStore, closureStore, openingRate, closureRate = 0, 0, 0, 0, 0
        likePeople, maleLikePeople, femaleLikePeople = 0, 0, 0
        for i in range(len(commecialArea)):
            quarterRevenue += commecialArea[i].commercialarearevenue.quarterRevenue
            perRevenue += commecialArea[i].commercialarearevenue.perRevenue
            if ageGroupDict.get(commecialArea[i].commercialarearevenue.ageGroup) == None:
                ageGroupDict[commecialArea[i].commercialarearevenue.ageGroup] = 1
            else:
                ageGroupDict[commecialArea[i].commercialarearevenue.ageGroup] += 1
            if timeGroupDict.get(commecialArea[i].commercialarearevenue.timeGroup) == None:
                timeGroupDict[commecialArea[i].commercialarearevenue.timeGroup] = 1
            else:
                timeGroupDict[commecialArea[i].commercialarearevenue.timeGroup] += 1
            numberStore += commecialArea[i].commercialareanumber.numberStore
            openingStore += commecialArea[i].commercialareanumber.openingStore
            closureStore += commecialArea[i].commercialareanumber.closureStore
            openingRate += commecialArea[i].commercialareanumber.openingRate
            closureRate += commecialArea[i].commercialareanumber.closureRate
            likePeople += commecialArea[i].commercialareapeople.likePeople
            maleLikePeople += commecialArea[i].commercialareapeople.maleLikePeople
            femaleLikePeople += commecialArea[i].commercialareapeople.femaleLikePeople
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
            }
        )
    return JsonResponse(data)

@api_view(['GET'])
@permission_classes([AllowAny])
def dong_info_location(request, guName, dongName):
    data = {
        'locationInfo' : []
    }
    commecialArea = CommercialArea.objects.filter(seoulGuDong__dongName=dongName)
    num = len(commecialArea)
    if num == 0:
        data['locationInfo'].append('상권이 없습니다.')
    else:
        bankNumber, hospitalNumber, pharmacyNumber, kindergardenNumber, schoolNumber, universityNumber, departmentStoreNumber, supermarketNumber, theaterNumber, hotelNumber, busTerminalNumber, subwayNumber, busStopNumber = 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        
        for i in range(len(commecialArea)):
            bankNumber += commecialArea[i].commercialareabuilding.bankNumber
            hospitalNumber += commecialArea[i].commercialareabuilding.hospitalNumber
            pharmacyNumber += commecialArea[i].commercialareabuilding.pharmacyNumber
            kindergardenNumber += commecialArea[i].commercialareabuilding.kindergardenNumber
            schoolNumber += commecialArea[i].commercialareabuilding.schoolNumber
            universityNumber += commecialArea[i].commercialareabuilding.universityNumber
            departmentStoreNumber += commecialArea[i].commercialareabuilding.departmentStoreNumber
            supermarketNumber += commecialArea[i].commercialareabuilding.supermarketNumber
            theaterNumber += commecialArea[i].commercialareabuilding.theaterNumber
            hotelNumber += commecialArea[i].commercialareabuilding.hotelNumber
            busTerminalNumber += commecialArea[i].commercialareabuilding.busTerminalNumber
            subwayNumber += commecialArea[i].commercialareabuilding.subwayNumber
            busStopNumber += commecialArea[i].commercialareabuilding.busStopNumber
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
        'recommendInfo' : []
    }