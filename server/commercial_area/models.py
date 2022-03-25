from pyexpat import model
from tkinter import CASCADE
from django.db import models

# Create your models here.

class SeoulGuDong(models.Model):
    guName = models.CharField(max_length=50) # 구 이름
    dongName = models.CharField(max_length=50) # 동 이름
    
    
class CommercialArea(models.Model):
    seoulgudong = models.ForeignKey(SeoulGuDong, related_name='commercialAreas', on_delete=models.CASCADE)
    code = models.IntegerField() # 상권 코드
    commercialAreaName = models.CharField(max_length=50) #상권 이름
    revenue = models.IntegerField() # 분기 매출
    priceByCase = models.IntegerField() # 건단가
    maleRevenue = models.IntegerField()  # 남성 매출
    femaleRevenue = models.IntegerField() # 여성 매출
    ageGroup = models.CharField(max_length=50) # 매출 주 연령대
    timeGroup = models.CharField(max_length=50) # 매출 주 시간대
    numberStore = models.IntegerField() # 점포 수
    similarStore = models.IntegerField() # 유사 점포 수
    openingStore = models.IntegerField() # 개업 점포 수
    closureStore = models.IntegerField() # 폐업 점포 수
    openingRate = models.IntegerField() # 개업률
    closureRate = models.IntegerField() # 폐업률
    residentPeople = models.IntegerField() # 상주 인구
    maleResidentPeople = models.IntegerField() # 남성 상주 인구
    femaleResidentPeople = models.IntegerField() # 여성 상주 인구
    numberHouseholds = models.IntegerField() # 가구 수
    age10 = models.IntegerField() # 10대 수
    age20 = models.IntegerField() # 20대 수
    age30 = models.IntegerField() # 30대 수
    age40 = models.IntegerField() # 40대 수
    age50 = models.IntegerField() # 50대 수
    age60 = models.IntegerField() # 60대 이상 수