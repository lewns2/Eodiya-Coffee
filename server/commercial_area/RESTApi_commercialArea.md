### 상권

- 상권 전체 조회

```
url : http://127.0.0.1:8000/api/v1/commercial_area/
method : get
Content-Type : application/json
```



- 상권 단일 조회

```
url : http://127.0.0.1:8000/api/v1/commercial_area/<상권코드>
method : get
Content-Type : application/json

{
    "id": 1,
    "code": 1001496,
    "commercialAreaName": "강남 마이스 관광특구",
    "revenue": 1587526033,
    "priceByCase": 7122,
    "maleRevenue": 554342508,
    "femaleRevenue": 740584277,
    "ageGroup": "30대",
    "timeGroup": "11~14시",
    "numberStore": 20,
    "similarStore": 51,
    "openingStore": 0,
    "closureStore": 0,
    "openingRate": 0,
    "closureRate": 0,
    "residentPeople": 29,
    "maleResidentPeople": 16,
    "femaleResidentPeople": 13,
    "numberHouseholds": 18,
    "age10": 2,
    "age20": 4,
    "age30": 2,
    "age40": 4,
    "age50": 9,
    "age60": 8,
    "seoulgudong": 68
}

 ### Model
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
```

