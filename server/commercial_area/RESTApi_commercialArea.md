### 상권

- 상권 조회

```
url : http://127.0.0.1:8000/api/v1/commercial_area/<상권_코드>
method : get
Content-Type: application/json

[
    {
        "id": 321,
        "code": 1001050,
        "commercialAreaName": "교대역_1",
        "revenue": 3045808282,
        "priceByCase": 7925,
        "maleRevenue": 1469912521,
        "femaleRevenue": 885064800,
        "ageGroup": "40대",
        "timeGroup": "11~14시"
    },
    {
        "id": 321,
        "code": 1001050,
        "numberStore": 54,
        "similarStore": 81,
        "openingStore": 6,
        "closureStore": 6,
        "openingRate": 7,
        "closureRate": 7
    },
    {
        "id": 317,
        "code": 1001050,
        "residentPeople": 2678,
        "maleResidentPeople": 1321,
        "femaleResidentPeople": 1357,
        "numberHouseholds": 1476,
        "age10": 236,
        "age20": 543,
        "age30": 572,
        "age40": 353,
        "age50": 432,
        "age60": 542
    }
]

# 추정매출
class CommercialArea1(models.Model):
    code = models.IntegerField() # 상권 코드
    commercialAreaName = models.CharField(max_length=50) #상권 이름
    revenue = models.IntegerField() # 분기 매출
    priceByCase = models.IntegerField() # 건단가
    maleRevenue = models.IntegerField()  # 남성 매출
    femaleRevenue = models.IntegerField() # 여성 매출
    ageGroup = models.CharField(max_length=50) # 매출 주 연령대
    timeGroup = models.CharField(max_length=50) # 매출 주 시간대

# 점포
class CommercialArea2(models.Model):
    code = models.IntegerField() # 상권 코드
    numberStore = models.IntegerField() # 점포 수
    similarStore = models.IntegerField() # 유사 점포 수
    openingStore = models.IntegerField() # 개업 점포 수
    closureStore = models.IntegerField() # 폐업 점포 수
    openingRate = models.IntegerField() # 개업률
    closureRate = models.IntegerField() # 폐업률
    
# 상주인구
class CommercialArea3(models.Model):
    code = models.IntegerField() # 상권 코드
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
```

