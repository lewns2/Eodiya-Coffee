from pyexpat import model
from tkinter import CASCADE
from django.db import models

# Create your models here.

class SeoulGuDong(models.Model):
    dongCode = models.IntegerField(primary_key=True) # 행정동코드
    guName = models.CharField(max_length=50) # 구 이름
    guCenterXPoint = models.FloatField() # 구 중심의 x좌표
    guCenterYPoint = models.FloatField() # 구 중심의 y좌표
    guXYPoint = models.TextField() # 구 경계의 xy좌표
    dongName = models.CharField(max_length=50) # 동 이름
    dongCenterXPoint = models.FloatField() # 동 중심의 x좌표
    dongCenterYPoint = models.FloatField() # 동 중심의 y좌표
    dongXYPoint = models.TextField() # 동 경계의 xy좌표
    
    
class CommercialArea(models.Model):
    dongCode = models.ForeignKey(SeoulGuDong, related_name='commercialAreas', on_delete=models.CASCADE)
    commercialCode = models.IntegerField() # 상권 코드
    commercialAreaName = models.CharField(max_length=50) #상권 이름
    
    # revenue = models.IntegerField() # 분기 매출
    # priceByCase = models.IntegerField() # 건단가
    # maleRevenue = models.IntegerField()  # 남성 매출
    # femaleRevenue = models.IntegerField() # 여성 매출
    # ageGroup = models.CharField(max_length=50) # 매출 주 연령대
    # timeGroup = models.CharField(max_length=50) # 매출 주 시간대
    # numberStore = models.IntegerField() # 점포 수
    # similarStore = models.IntegerField() # 유사 점포 수
    # openingStore = models.IntegerField() # 개업 점포 수
    # closureStore = models.IntegerField() # 폐업 점포 수
    # openingRate = models.IntegerField() # 개업률 - 실수로 변경해야 함
    # closureRate = models.IntegerField() # 폐업률 - 실수로 변경해야 함
    # lifePeople = models.IntegerField() # 생활인구 수
    # maleLifePeople = models.IntegerField() # 남성 생활인구 수
    # femaleLifePeople = models.IntegerField() # 여성 생활인구 수
    # life_age10 = models.IntegerField() # 10대 생활인구 수
    # life_age20 = models.IntegerField() # 20대 생활인구 수
    # life_age30 = models.IntegerField() # 30대 생활인구 수
    # life_age40 = models.IntegerField() # 40대 생활인구 수
    # life_age50 = models.IntegerField() # 50대 생활인구 수
    # life_age60 = models.IntegerField() # 60대이상 생활인구 수
    # life_time1 = models.IntegerField() # 00~06시
    # life_time2 = models.IntegerField() # 06~11시
    # life_time3 = models.IntegerField() # 11~14시
    # life_time4 = models.IntegerField() # 14~17시
    # life_time5 = models.IntegerField() # 17~21시
    # life_time6 = models.IntegerField() # 21~24시
    # avgIncome = models.IntegerField() # 평균 소득
    # incomeGrade = models.IntegerField() # 소득 분위
    # outcomeForFood = models.IntegerField() # 식료품에 지출하는 금액

# class CafeList(models.Model):
#     dongCode = models.ForeignKey(SeoulGuDong, related_name='dong_cafes',on_delete=models.CASCADE)
#     commercialCode = models.ForeignKey(CommercialArea, related_name='commercial_cafes', on_delete=models.CASCADE)
#     guName = models.CharField(max_length=10)
#     UrlId = models.IntegerField(primary_key=True)
#     cafeName = models.CharField(max_length=50)
#     cafe_rate = models.FloatField()
#     reviewCount = models.CharField(max_length=10)
#     cafeAddress = models.CharField(max_length=100)
#     cafeHour = models.CharField(max_length=50)
#     cafeTel = models.CharField(max_length=20)
#     cafeHomepage = models.CharField(max_length=100)
#     cafeTag = models.CharField(max_length=100)
#     cafePhoto = models.CharField(max_length=255)
    
    