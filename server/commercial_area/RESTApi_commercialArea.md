### 상권

- 상권 전체 조회(구, 동)

```
url : http://127.0.0.1:8000/api/v1/commercial_area/
method : get
Content-Type : application/json

[
    {
        "id": 1,
        "code": 1001496,
        "commercialAreaName": "강남 마이스 관광특구",
        "guName": "강남구",
        "dongName": "삼성1동"
    },
    {
        "id": 2,
        "code": 1001495,
        "commercialAreaName": "잠실 관광특구",
        "guName": "송파구",
        "dongName": "오륜동"
    },
    ...
```



- 상권 상세 조회

```
url : http://127.0.0.1:8000/api/v1/commercial_area/<상권코드>
method : get
Content-Type : application/json

{
    "id": 353,
    "code": 1001010,
    "commercialAreaName": "풍성로37가길",
    "revenue": 29749568,
    "priceByCase": 4365,
    "maleRevenue": 15057167,
    "femaleRevenue": 14692401,
    "ageGroup": "30대",
    "timeGroup": "6~11시",
    "numberStore": 5,
    "similarStore": 5,
    "openingStore": 0,
    "closureStore": 0,
    "openingRate": 0,
    "closureRate": 0,
    "residentPeople": 2935,
    "maleResidentPeople": 1461,
    "femaleResidentPeople": 1474,
    "numberHouseholds": 1576,
    "age10": 289,
    "age20": 375,
    "age30": 441,
    "age40": 473,
    "age50": 517,
    "age60": 840,
    "guName": "강동구",
    "dongName": "성내2동"
}

	# Model
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
    guName = models.CharField(max_length=50) # 구 이름
    dongName = models.CharField(max_length=50) # 동 이름
```

