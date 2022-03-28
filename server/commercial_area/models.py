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
    
# class ReviewList(models.Model):
#     UrlId = models.ForeignKey(CafeList, related_name='', on_delete=models.CASCADE)
#     cafeName = models.CharField(max_length=50)
#     Reviews = models.TextField()
    
    