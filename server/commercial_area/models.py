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
    seoulGuDong = models.ForeignKey(SeoulGuDong, related_name='commercialAreas', on_delete=models.CASCADE)
    commercialAreaCode = models.IntegerField(primary_key=True) # 상권 코드
    commercialAreaName = models.CharField(max_length=50) #상권 이름
    commercialAreaChange = models.CharField(max_length=10) # 상권의 변동사항
    commercialAreaXYPoint = models.TextField() # 상권 경계의 X, Y 좌표
    
    
class CommercialAreaRevenue(models.Model):
    commercialArea = models.ForeignKey(CommercialArea, related_name='revenueInfo', on_delete=models.CASCADE)
    quaterRevenue = models.BigIntegerField() # 분기 매출
    perRevenue = models.FloatField() # 건단가
    maleRevenue = models.BigIntegerField()  # 남성 매출
    femaleRevenue = models.BigIntegerField() # 여성 매출
    ageGroup = models.CharField(max_length=50) # 매출 주 연령대
    timeGroup = models.CharField(max_length=50) # 매출 주 시간대
    
    
class CommercialAreaNumber(models.Model):
    commercialArea = models.ForeignKey(CommercialArea, related_name='numberInfo', on_delete=models.CASCADE)
    numberStore = models.IntegerField() # 점포 수
    numberSimilarStore = models.IntegerField() # 유사 점포 수
    openingStore = models.IntegerField() # 개업 점포 수
    closureStore = models.IntegerField() # 폐업 점포 수
    openingRate = models.FloatField() # 개업률
    closureRate = models.FloatField() # 폐업률
    
    
class CommercialAreaPeople(models.Model):
    commercialArea = models.ForeignKey(CommercialArea, related_name='peopleInfo', on_delete=models.CASCADE)
    likePeople = models.IntegerField() # 생활 인구
    maleLikePeople = models.IntegerField() # 남성 생활 인구
    femaleLikePeople = models.IntegerField() # 여성 생활 인구
    likePeopleAge10 = models.IntegerField() # 10대 수
    likePeopleAge20 = models.IntegerField() # 20대 수
    likePeopleAge30 = models.IntegerField() # 30대 수
    likePeopleAge40 = models.IntegerField() # 40대 수
    likePeopleAge50 = models.IntegerField() # 50대 수
    likePeopleAge60 = models.IntegerField() # 60대 이상 수
    

class CommercialAreaBackground(models.Model):
    commercialArea = models.ForeignKey(CommercialArea, related_name='backgroundInfo', on_delete=models.CASCADE)
    avgIncome = models.IntegerField() # 평균 소득
    gradeIncome = models.IntegerField() # 소득 분위
    guCenterXPoint = models.FloatField() # 구 중심의 x좌표
    guCenterYPoint = models.FloatField() # 구 중심의 y좌표
    guXYPoint = models.TextField() # 구 경계의 xy좌표
    dongName = models.CharField(max_length=50) # 동 이름
    dongCenterXPoint = models.FloatField() # 동 중심의 x좌표
    dongCenterYPoint = models.FloatField() # 동 중심의 y좌표
    dongXYPoint = models.TextField() # 동 경계의 xy좌표
