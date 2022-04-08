from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import JsonResponse
from django.db.models import Q
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import CommercialArea, SeoulGuDong, CommercialAreaRevenue
from .serializers import CommercialAreaSerializer, SeoulGuDongSerializer
from commercial_area import serializers
import pandas as pd




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
        'A' : [],
    }
    # data = {
    #     'commercialAreaInfo' : [],
    # }
    # commercialArea = CommercialArea.objects.filter(seoulGuDong__dongName=dongName)
    # for i in range(len(commercialArea)):
    #     str1 = commercialArea[i].commercialAreaXYPoint.replace('[', '').replace(']', '')
    #     lst1 = str1.split(', ')
    #     res1 = []
    #     temp = []
    #     for j in range(len(lst1)):
    #         temp.append(float(lst1[j]))
    #         if j%2 == 1:
    #             res1.append(temp)
    #             temp = []
    #     data['commercialAreaInfo'].append(
    #         {
    #             'commercialAreaCode' : commercialArea[i].commercialAreaCode,
    #             'commercialAreaName' : commercialArea[i].commercialAreaName,
    #             'commercialAreaXYPoint' : res1,
    #         }
    #     )
    # data = {
    #     'dongInfo' : []
    # }
    # commercialArea = CommercialArea.objects.filter(seoulGuDong__dongName=dongName)
    # num = len(commercialArea)
    # if num == 0:
    #     data['dongInfo'].append('상권이 없습니다.')
    # else:
    #     likePeople = 0
    #     numberStore = 0
    #     for i in range(len(commercialArea)):
    #         likePeople += commercialArea[i].commercialareapeople.likePeople
    #         numberStore += commercialArea[i].commercialareanumber.numberStore
    #     data['dongInfo'].append(
    #         {
    #             'likePeople' : likePeople,
    #             'numberStore' : numberStore,
    #         }
    #     )

    return JsonResponse(data)


@api_view(['GET'])
@permission_classes([AllowAny])
def dong_info(request, guName, dongName):
    data = {
        'detail' : [],
        'XYInfo' : [],
    }
    commercialArea = CommercialArea.objects.filter(seoulGuDong__guName=guName, seoulGuDong__dongName=dongName)
    num = len(commercialArea)
    if num == 0:
        data['detail'].append('상권이 없습니다.')
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
        
        data['detail'].append(
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
        

    commercialArea = CommercialArea.objects.filter(seoulGuDong__guName=guName, seoulGuDong__dongName=dongName)
    num = len(commercialArea)
    if num == 0:
        data['XYInfo'].append('상권이 없습니다.')
    else:
        likePeople = 0
        numberStore = 0
        for i in range(len(commercialArea)):
            likePeople += commercialArea[i].commercialareapeople.likePeople
            numberStore += commercialArea[i].commercialareanumber.numberStore
        
        seoulGuDong = SeoulGuDong.objects.filter(guName=guName, dongName=dongName)
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
            data['XYInfo'].append(
                {
                    'dongCode': seoulGuDong[i].dongCode,
                    'dongName': seoulGuDong[i].dongName,
                    'likePeople' : likePeople,
                    'numberStore' : numberStore,
                    'dongCenterXPoint': seoulGuDong[i].dongCenterXPoint,
                    'dongCenterYPoint': seoulGuDong[i].dongCenterYPoint,
                    'dongXYPoint': res2
                }
            )
            break   
        
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
    commercialArea = CommercialArea.objects.filter(seoulGuDong__guName=guName, seoulGuDong__dongName=dongName)
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
        'commercialAreaInfo' : [],
    }
    ### recommend0 ###
    
    # seoulCommercialArea = CommercialArea.objects.all()
    # seoulAvg = 0
    # for i in range(len(seoulCommercialArea)):
    #     seoulAvg += seoulCommercialArea[i].commercialarearevenue.quarterRevenue
    # seoulAvg /= len(seoulCommercialArea)
    # print(seoulAvg)
    ### seoulAvg 상수
    # seoulAvg = 190096104.8488228
    
    
    ### 1
    ### 상권 평균 매출 >= 서울시 평균 매출 and 상권 == 다이나믹 or 상권 == 상권확장
    # commercialArea1 = CommercialArea.objects.filter(seoulGuDong__guName=guName, commercialAreaChange='다이나믹')
    # commercialArea2 = CommercialArea.objects.filter(seoulGuDong__guName=guName, commercialAreaChange='상권확장')
    # commercialArea = commercialArea1 | commercialArea2
    
    
    ### 2
    ### 상권 평균 매출 >= 서울시 평균 매출
    # commercialArea = CommercialArea.objects.filter(seoulGuDong__guName=guName)
    
    # commercialArea = commercialArea.order_by('-commercialarearevenue__quarterRevenue')
    # num = len(commercialArea)
    # if num == 0:
    #     data['recommend1'].append('상권이 없습니다.')
    # else:
    #     for i in range(len(commercialArea)):
    #         if commercialArea[i].commercialarearevenue.quarterRevenue >= seoulAvg:
    #             data['recommend1'].append(
    #                 {
    #                     'commercialAreaName' : commercialArea[i].commercialAreaName,
    #                     'commercialQuarterRevenue' : commercialArea[i].commercialarearevenue.quarterRevenue,
    #                     'commercialAreaChange' : commercialArea[i].commercialAreaChange,
    #                 }
    #             )
    #     if data['recommend1'] == []:
    #         data['recommend1'].append('상권이 없습니다.')
            
            
            
    ### recommend1 ###
    ### ### 시장성 = (기초구역 내 분기 매출액 / 분기 점포수) - (시군구 내 분기 매출액 / 분기 점포수) -> 상권 분기 매출액 / 점포수 - 동 분기 매출액 / 점포수
    # guCommercialArea = CommercialArea.objects.filter(seoulGuDong__guName=guName)
    # guRevenue, guStoreNumber = 0, 0
    # len1 = len(guCommercialArea)
    
    # for i in range(len(guCommercialArea)):
    #     guRevenue += guCommercialArea[i].commercialarearevenue.quarterRevenue
    #     guStoreNumber += guCommercialArea[i].commercialareanumber.numberStore
    # gu_res = guRevenue // guStoreNumber
    
    dongCommercialArea = CommercialArea.objects.filter(seoulGuDong__guName=guName, seoulGuDong__dongName=dongName)
    dongRevenue, dongStoreNumber = 0, 0
    for i in range(len(dongCommercialArea)):
        dongRevenue += dongCommercialArea[i].commercialarearevenue.quarterRevenue
        dongStoreNumber += dongCommercialArea[i].commercialareanumber.numberStore
    dong_res = dongRevenue / dongStoreNumber
    
    commercialArea = CommercialArea.objects.filter(seoulGuDong__guName=guName, seoulGuDong__dongName=dongName)
    res = []
    for i in range(len(commercialArea)):
        revenue, storeNumber = 0, 0
        revenue += commercialArea[i].commercialarearevenue.quarterRevenue
        storeNumber += commercialArea[i].commercialareanumber.numberStore
        commercialArea_res = revenue / storeNumber
        시장성 = commercialArea_res - dong_res
        res.append([commercialArea[i], 시장성, commercialArea_res, dong_res])
    res.sort(key=lambda x:-x[1])
    score = []
    score1 = []
    for i in range(len(res)):
        score.append([res[i][0].commercialAreaName, 0])
        score1.append([res[i][0].commercialAreaName, len(res) - i])
        data['recommend1'].append(
                        {
                            'commercialAreaName' : res[i][0].commercialAreaName,
                            '시장성' : round(res[i][1], 3),
                            'commercialArea_res' : round(res[i][2], 3),
                            'dong_res' : round(res[i][3], 3),
                        }
                    )
    if data['recommend1'] == []:
        data['recommend1'].append('상권이 없습니다.')
    
    
    ### recommend2 ###
    ### 성장성 = 당년 분기 매출액 / 전년 동분기 매출액 -> 이번 분기 매출액 / 전 분기 매출액
    res = []
    for i in range(len(dongCommercialArea)):
        code = dongCommercialArea[i].commercialAreaCode
        revenue3 = dongCommercialArea[i].commercialarearevenue.quarterRevenue
        revenue2 = dongCommercialArea[i].commercialareaplus.quarterRevenue
        성장성 = revenue3 / revenue2
        res.append([dongCommercialArea[i].commercialAreaName, 성장성])
    res.sort(key=lambda x:-x[1])
    score2 = []
    for i in range(len(res)):
        score2.append([res[i][0], len(res) - i])
        data['recommend2'].append(
                        {
                            'commercialAreaName' : res[i][0],
                            '성장성' : round(res[i][1], 4)
                        }
                    )
    if data['recommend2'] == []:
        data['recommend2'].append('상권이 없습니다.')
        
    
    ### recommend3 ###
    ### 안정성 = 1 - (폐업 점포수 / 신규 점포수)
    res = []
    for i in range(len(dongCommercialArea)):
        openingStore = dongCommercialArea[i].commercialareanumber.openingStore
        closureStore = dongCommercialArea[i].commercialareanumber.closureStore
        if openingStore == 0:
            안정성 = 0.5
        else:
            안정성 = 1 - (closureStore / openingStore)
        res.append([dongCommercialArea[i].commercialAreaName, 안정성])
    res.sort(key=lambda x:-x[1])
    score3 = []
    for i in range(len(res)):
        score3.append([res[i][0], len(res) - i])
        data['recommend3'].append(
                        {
                            'commercialAreaName' : res[i][0],
                            '안정성' : round(res[i][1], 3)
                        }
                    )
    if data['recommend3'] == []:
        data['recommend3'].append('상권이 없습니다.')
        
    for i in range(len(score)):
        for j in range(len(score1)):
            if score[i][0] == score1[i][0]:
                score[i][1] += score1[i][1]
                break
    for i in range(len(score)):
        for j in range(len(score2)):
            if score[i][0] == score2[i][0]:
                score[i][1] += score2[i][1]
                break
    for i in range(len(score)):
        for j in range(len(score3)):
            if score[i][0] == score3[i][0]:
                score[i][1] += score3[i][1]
                break
    
    score.sort(key=lambda x:-x[1])
    for i in range(len(score)):
        if i < round(len(score) / 3):
            score[i][1] = 'Good'
        elif round(len(score) / 3) <= i <= round(len(score) * 2 / 3):
            score[i][1] = 'Normal'
        else:
            score[i][1] = 'Bad'
    
    
    commercialArea = CommercialArea.objects.filter(seoulGuDong__guName=guName, seoulGuDong__dongName=dongName)
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
        minX, minY = 1000000, 1000000
        maxX, maxY = 0, 0
        for j in range(len(res1)):
            minX = min(minX, res1[j][0])
            minY = min(minY, res1[j][1])
            maxX = max(maxX, res1[j][0])
            maxY = max(maxY, res1[j][1])
        centerXPoint = (minX + maxX) / 2
        centerYPoint = (minY + maxY) / 2
        data['commercialAreaInfo'].append(
            {
                'grade' : score[i][1],
                'commercialAreaCode' : commercialArea[i].commercialAreaCode,
                'commercialAreaName' : commercialArea[i].commercialAreaName,
                'centerXPoint' : centerXPoint,
                'centerYPoint' : centerYPoint,
                'commercialAreaXYPoint' : res1,
            }
        )


    return JsonResponse(data)


@api_view(['GET'])
@permission_classes([AllowAny])
def dong_info_similar(request, guName, dongName):
    data = {
        'similar' : []
    }
    # 동 구하기
    # All = CommercialArea.objects.all()
    # dong_list = []
    # for i in range(len(All)):
    #     dong_list.append(All[i].seoulGuDong.dongName)
    # print(list(set(dong_list)))
    dong_list = ['망원1동', '원효로2동', '화양동', '사당5동', '신월3동', '사당1동', '신정2동', '서림동', '한남동', '면목3.8동', '상일동', '상도1동', '가양1동',
                 '대흥동', '성산1동', '서초3동', '신도림동', '가락2동', '휘경1동', '삼성1동', '청량리동', '수유3동', '개봉1동', '시흥1동', '도곡1동', '상도3동',
                 '서빙고동', '수색동', '하계1동', '고덕1동', '창5동', '신원동', '북아현동', '상봉2동', '가락본동', '신대방2동', '역삼2동', '구로5동', '면목본동',
                 '자양2동', '방화2동', '화곡4동', '삼성2동', '청파동', '삼양동', '녹번동', '가산동', '아현동', '사근동', '석관동', '신길6동', '방화1동', '마천2동',
                 '명동', '마장동', '자양4동', '방배4동', '사당4 동', '묵2동', '구의3동', '월곡2동', '사당3동', '구로2동', '장안2동', '신사동', '성수1가2동', '화곡본동',
                 '가회동', '갈현2동', '망우3동', '이화동', '시흥4동', '은천동', '방배본동', '묵1동', '용답동', '수궁동', '공항동', '효창동', '용문동', '번2동', '구의2동',
                 '공덕동', '성내2동', '가리봉동', '삼청동', '능동', '고척2동', '신월7동', '명일2동', '암사2동', '이촌2동', '개포4동', '월곡1동', '약수동', '석촌동', '정릉3동',
                 '행당1동', '충현동', '종로1.2.3.4가동', '성산2동', '도봉2동', '풍납1동', '전농2동', '신길7동', '안암동', '이태원2동', '청운효자동', '등촌1동', '신정7동',
                 '숭인2동', '신수동', '답십리2동', '다산동', '옥수동', '신내1동', '송중동', '면목2동', '대치2동', '합정동', '성내3동', '염창동', '남영동', '중곡1동', '삼선동',
                 '화곡6동', '평창동', '면목4동', '논현2동', '대조동', '대방동', '상도4동', '암사1동', '삼전동', '시흥5동', '노량진2동', '삼각산동', '신정3동', '시흥3동',
                 '독산2동', '오금동', '천호2동', '증산동', '낙성대동', '도화동', '연남동', '금호2.3가동', '독산1동', '휘경2동', '고덕2동', '발산1동', '후암동', '원효로1동',
                 '성현동', '대학동', '중화2동', '송천동', '청구동', '응암3동', '쌍문2동', '송정동', '홍제1동', '목1동', '잠실본동', '천호1동', '반포1동', '이태원1동',
                 '용산2가동', '당산1동', '성수1가1동', '상계1동', '방배2동', '화 곡1동', '자양3동', '북가좌2동', '양재1동', '개봉2동', '개포2동', '신월5동', '을지로동',
                 '광장동', '길음2동', '신월1동', '상계2동', '성내1동', '동화동', '논현1동', '서초2동', '종암동', '홍제2동', '조원동', '청담동', '행운동', '도곡2동', '암사3동',
                 '응암1동', '신월2동', '양평2동', '반포4동', '장충동', '창3동', '중계4동', '방이2동', '역촌동', '대림3동', '월계1동', '황학동', '망원2동', '답십리1동', '정릉4동',
                 '화곡3동', '문정1동', '공릉1동', '신정4동', '도림동', '방학1동', '번1동', '갈현1동', '망우본동', '용신동', '구산동', '성수2가3동', '방배1동', '신월4동', '신사1동',
                 '송파1동', '일원1동', '회현동', '사직동', '쌍문1동', '회기동', '등촌2동', '혜화동', '역삼1동', '노량진1동', '보문동', '난곡동', '길동', '이문1동', '자양1동',
                 '대치1동', '목3동', '연희동', '신림동', '양평1동', '오류2동', '영등포동', '홍은1동', '염리동', '신대방1 동', '신길1동', '서강동', '중곡2동', '한강로동', '전농1동',
                 '화곡8동', '방이1동', '상계5동', '성북동', '용강동', '상암동', '성수2가1동', '미성동', '구로4동', '쌍문3동', '홍제3동', '영등포본동', '제기동', '도봉1동',
                 '문래동', '신사2동', '화곡2동', '미아동', '당산2동', '보라매동', '고척1동', '우장산동', '장위2동', '서교동', '왕십리도선동', '흑석동', '창1동', '구로3동',
                 '잠원동', '서초1동', '남가좌1동', '중곡4동', '대림2동', '청림동', '불광2동', '상봉1동', '왕십리2동', '보광동', '신정1동', '면목7동', '중화1동', '사당2동',
                 '번3동', '개봉3동', '상도2동', '목2동', '장안1동', '수유1동', '인수동', '독산4동', '명일1동', '청룡동', '목4동', '남현동', '구의1동', '중곡3동', '방배3동',
                 '천호3동', '인헌동', '방학2동', '둔촌2동', '부암동', '남가좌2동', '신당동', '신당5동', '독산3동', '동선동', '정릉2동', '방학3동', '대치4동', '양재2동']
      
    similar = '없음'
    gap = int(1e18)
    commercialArea = CommercialArea.objects.filter(seoulGuDong__guName=guName, seoulGuDong__dongName=dongName)
    num = len(commercialArea)
    if num == 0:
        data['similar'].append(similar)
        return JsonResponse(data)
    quarterRevenue_ = 0
    ageGroupDict = dict()
    timeGroupDict = dict()
    for i in range(len(commercialArea)):
        quarterRevenue_ += commercialArea[i].commercialarearevenue.quarterRevenue
        if ageGroupDict.get(commercialArea[i].commercialarearevenue.ageGroup) == None:
            ageGroupDict[commercialArea[i].commercialarearevenue.ageGroup] = 1
        else:
            ageGroupDict[commercialArea[i].commercialarearevenue.ageGroup] += 1
        if timeGroupDict.get(commercialArea[i].commercialarearevenue.timeGroup) == None:
            timeGroupDict[commercialArea[i].commercialarearevenue.timeGroup] = 1
        else:
            timeGroupDict[commercialArea[i].commercialarearevenue.timeGroup] += 1
    quarterRevenue_ /= num
    max_temp = max(ageGroupDict.values())
    for key in ageGroupDict:
        if ageGroupDict[key] == max_temp:
            ageGroup_ = key
            break
    max_temp = max(timeGroupDict.values())
    for key in timeGroupDict:
        if timeGroupDict[key] == max_temp:
            timeGroup_ = key
            break
    
    
    for k in range(len(dong_list)):
        if dong_list[k] == dongName: continue
        dongCommercialArea = CommercialArea.objects.filter(seoulGuDong__dongName=dong_list[k])
        num = len(dongCommercialArea)
        if num == 0: continue
        quarterRevenue = 0
        ageGroupDict = dict()
        timeGroupDict = dict()
        for i in range(len(dongCommercialArea)):
            quarterRevenue += dongCommercialArea[i].commercialarearevenue.quarterRevenue
            if ageGroupDict.get(dongCommercialArea[i].commercialarearevenue.ageGroup) == None:
                ageGroupDict[dongCommercialArea[i].commercialarearevenue.ageGroup] = 1
            else:
                ageGroupDict[dongCommercialArea[i].commercialarearevenue.ageGroup] += 1
            if timeGroupDict.get(dongCommercialArea[i].commercialarearevenue.timeGroup) == None:
                timeGroupDict[dongCommercialArea[i].commercialarearevenue.timeGroup] = 1
            else:
                timeGroupDict[dongCommercialArea[i].commercialarearevenue.timeGroup] += 1
        quarterRevenue /= num
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
        
        if ageGroup_ == ageGroup and timeGroup_ == timeGroup:
            if abs(quarterRevenue_ - quarterRevenue) < gap:
                similar = dong_list[k]
                gap = abs(quarterRevenue_ - quarterRevenue)
                
    data['similar'].append(similar)
    return JsonResponse(data)