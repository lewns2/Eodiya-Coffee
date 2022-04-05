from django.db import models
from commercial_area.models import SeoulGuDong, CommercialArea

# Create your models here.

class CafeList(models.Model):
    dongCode = models.ForeignKey(SeoulGuDong, related_name='dong_cafes',on_delete=models.CASCADE)
    commercialCode = models.ManyToManyField(CommercialArea, related_name='commercialCode')
    guName = models.CharField(max_length=10)
    UrlId = models.IntegerField(primary_key=True)
    cafeName = models.CharField(max_length=50)
    cafeRate = models.FloatField()
    reviewCount = models.CharField(max_length=10)
    cafeAddress = models.CharField(max_length=255, null=True)
    cafeHour = models.CharField(max_length=255, null=True)
    cafeTel = models.CharField(max_length=20, null=True)
    cafeHomepage = models.CharField(max_length=255, null=True)
    cafeTag = models.CharField(max_length=255, null=True)
    cafePhoto = models.TextField(null=True)
    cafePoint = models.CharField(max_length=100)

class CafeMenu(models.Model):
    UrlId = models.ForeignKey(CafeList, related_name='Url_id', on_delete=models.CASCADE)
    menuName = models.CharField(max_length=255, null=True)
    menuPrice = models.IntegerField(null=True)
    
