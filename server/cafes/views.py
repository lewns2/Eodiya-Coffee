from django.shortcuts import render
from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import JsonResponse
from rest_framework import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import CafeList
from commercial_area.models import SeoulGuDong, CommercialArea
from .serializers import CafeListSerializer
from copy import deepcopy

# Create your views here.

word_grouping = {
    '브런치카페': ['브런치'],
    '키즈카페/아기동반': ['키즈', '아기의자', '아이', '이유식', '놀이터', '어린이놀이방'], # 노키즈존도 있으니 조건문으로 걸러줘야 한다.
    '애견카페/반려동물가능': ['애견', '반려동물', '반려견', '강아지', '동반', '비숑미용'],
    '방탈출카페': ['방탈출'],
    '북카페/책읽기좋은': ['북카페', '책', '조용한', '도서관풍', '독립서점', '공부하기좋은'], # 강북카페도 있으니 조건문으로 걸러줘야 한다.
    '디저트카페': ['디저트', '케이크', '마카롱', '티라미슈', '휘낭시에', '스콘', '마들렌', '에끌레어', '케익', '빵', '쿠키', '티라미수', '와플', '디져트', '카스테라',
              '키라임파이', '그래놀라', '빙수', '파운드', '비스킷', '구움과자', '초콜릿', '달고나', '크림치즈', '테린느', '르뱅', '캐러멜', '뚱카롱', '크레페', '피넛버터크리미',
              '파르페', '타르트', '블랙롤', '푸딩', '크로플'
              ],
    '분위기있는': ['분위기', '채광', '힐링', '아늑한', '낭만적인', '데이트', '아기자기', '예쁜', '고즈넉한', '조용한', '인스타', '빈티지', '정갈한', '분위좋은', '한옥', '미드센추리모던',
              '정감있는', '고급진', '감성', '이국적인', '도서관풍', '부띠끄', '미니멀디자인','깔끔한', '편안한', '모던한', '이쁜', '공주풍', '앤틱한', '북유럽인테리어', '캠핑느낌', '무채색',
              '유럽풍'
              ],
    '사진찍기좋은': ['포토존', '루프탑', '테라스', '채광', '힐링', '데이트', '아기자기', '예쁜', '전망', '인스타', '사진', '분위좋은', '한옥', '야외', '감성','부띠끄', '포토카페', '이쁜',
               '북유럽인테리어', '온실', '경치좋은'
               ],
    '커피전문점/커피맛집': ['커피전문점', '라떼', '아인슈페너', '아인슈패너', '아메리카노', '에스프레소', '로스팅', '드립', '보스코', '시그니처커피', '원두', '더치', '로스터리', '커피숍', 
                   'cafe', 'COFFEE', 'coffee', '디카페인', '호주식커피', '소금커피', '비엔나커피', '필터커피', '레스토', '커피오마카세', '타이거커피', '콜드브루', 'Espresso', '영국커피', '카페'
                   ], # 카페는 카페만 있는 걸로 한다.
    '특색있는': ['체험', '만들기', '클래스', '뮤직', '힐링', '데이트', '로봇', '이색', '세제리필', '제로웨이스트', '사주', '타로', '베트남풍', '재즈', '티카페', '명리강의',
              '무인', '비건', '생일', '베이커리', '드로잉', '슬라임', '공방', '안마의자', '옷', '비트박스', '파티룸', '오락실', '실내낚시', '빨래방', '공간대여', '모임', '배달', '다트',
              '한옥', '테마', '레트로', '24시', '룸카페', '개별룸', '티룸', '샵', '떡', '궁합', '마사지', '소개팅', '신점', '공연', '오피스', '도서관풍', '전시회', 'DJ','상담', '부띠끄',
              '락카페', '꽃집', '호주식커피', '뮤지엄', '외국어', '가구', '도자기', '식물카페', '이벤트카페', '외부음식반입가능', '창고형', 'VR카페', '좌식카페', '미니멀디자인', '음악바',
              '베이킹', '침대카페', '트램폴린카페', '라이브카페', '산소카페', '아쿠아카페', '메세지캔', '서울식물원', '다이닝카페', '포토카페', '노트북하기좋은', '가성비', '라운지카페', '구관인형',
              '공주풍', '캘리그라피', '찻집', '아케이드', '노펫존', '시리얼', '고양이', '과일', '글루텐프리', '갤러리', '스페셜티커피', '작명소', '피규어', '온실', '다락방카페', '라이브바', '캠핑느낌',
              '양궁', '플라워', '수공예품', '영국식', '무채색', '프라모델', '뉴트로', '가성비', '족욕카페', '교육', '컬쳐카페', '라쿤', '드레스', '미술전시', '유럽풍', 'LP바', '다락방'
             ], # 티카페에서 뷰티카페를 걸러야 함
    '술과 함께': ['술집', '와인', '펍', '술한잔', '낮술', '혼술', '위스키', '피맥', '칵테일', '맥주', '양주', '비어카페', '가맥', '버맥', '스탠딩바', 'LP바'], 
    '보드게임카페': ['보드게임', '보드카페'],
    '만화카페': ['만화'],
    '커피말고 다른건 어때?': ['맛집', '필리핀', '아침식사', '프랑스', '전통음식', '도라지청', '오믈렛', '에이드', '바게트', '베이글', '요거트', '샐러드', '일본', '음료', '샌드위치',
                     '도라지', '로컬푸드', '뷔페', '프렌치토스트', '수제우유', '밀크티', '홍차', '터키요리', '보틀우유', '점심식사', '핫도그', '점심특선', '독일', '카야토스트', '수제청',
                     '티블랜딩', '찻집', '시리얼', '과일', '스페인요리', '자몽허니블랙티', '애프터눈티', '그릴드치즈', '비스트로', '경양식요리', '유럽가정식', '수제청', '멕시코요리', '수면',
                     '달고나밀크티'
                     ], # 전망맛집이 있으니 걸러줘야 한다.
    '스터디카페/카공': ['스터디', '공부하기좋은'],
    '다방': ['다방'],
    '놀기좋은': ['놀거리', '먹골', '경춘선숲길', '카페거리', '노원불빛정원', '2001아울렛', '서울식물원', '핫플카페', '성수동핫플', '서울숲', '용리단길', '이태원핫플', '경리단길', '남산서울타워',
             '송리단길', '힙지로', '익선동핫플'
             ],
}
# 카페 정보 요청
@api_view(['GET'])
@permission_classes([AllowAny])
def get_cafes(request, guName, dongName, tag):
    cafes = CafeList.objects.filter(guName = guName)
    serializer = CafeListSerializer(cafes, many=True)
    # print(cafes.values())
    # cafeListId = CafeList.objects.get(UrlId=22549791)
    Dong = SeoulGuDong.objects.filter(guName = guName, dongName = dongName)
    data = []
    tmp_data = {
        'dongCode' : '',
        'commercialCode' : [], 
        'guName' : '', 
        'UrlId'  : '', 
        'cafeName' : '', 
        'cafeRate' :  '',
        'reviewCount' : '',
        'cafeAddress' : '',
        'cafeHour' : '',
        'cafeTel' : '',
        'cafeHomepage' : '',
        'cafeTag' : '',
        'cafePhoto' : '',
        'cafePoint' : [],
    }
    for cafe in cafes:
    #     print(cafe.values())
        tmp_data['dongCode'] = cafe.dongCode_id
        tmp_data['guName'] = cafe.guName
        tmp_data['UrlId'] = cafe.UrlId
        tmp_data['cafeName'] = cafe.cafeName
        tmp_data['cafeRate'] = cafe.cafeRate
        tmp_data['reviewCount'] = cafe.reviewCount
        tmp_data['cafeAddress'] = cafe.cafeAddress
        tmp_data['cafeHour'] = cafe.cafeHour.split('&')
        tmp_data['cafeTel'] = cafe.cafeTel
        tmp_data['cafeHomepage'] = cafe.cafeHomepage
        tmp_data['cafePhoto'] = cafe.cafePhoto
        tmp_data['cafePoint'] = cafe.cafePoint.split('&')
        # print(cafe.commercialCode)
        # tmp_data['commercialCode'] 
        # tmp_data['cafeTag'] = 
        print(tmp_data)
        data.append(deepcopy(tmp_data))
    # print(data)
    # print(cafes.values())
    # print(cafeDong.values())
    # cafeDong = ''
    # print('동', Dong[0].dongName, Dong[0].dongCode)
    # for cafe in cafes:
    #     print(cafe.dongCode)
    #     if cafe.dongCode == Dong[0].dongCode:
    #         print('조건에 맞음')
    #     #     cafeDong = Dong[0].dongName
    # print('이것은', cafeDong)

    # 데이터를 프론트에서 원하는 형식으로 만들어줘야 한다.
    
    return JsonResponse(data, safe=False)
    # return Response(serializer.data)

### 방법
# 1. tag가 넘어오면 딕녀서리의 key를 순회 
# 2. tag에 해당하는 key의 values를 순회
# 3. 동에 있는 모든 카페의 태그를 순회하면서 values의 단어가 카페 태그에 존재하면 그 카페를 뽑는다.
# 4. 해당하는 모든 카페들을 프론트로 보내줌
    
