from django.db import models

# Create your models here.


class SeoulGuDong(models.Model):
    dongCode = models.IntegerField(primary_key=True)  # 행정동코드
    guName = models.CharField(max_length=50)  # 구 이름
    guCenterXPoint = models.FloatField()  # 구 중심의 x좌표
    guCenterYPoint = models.FloatField()  # 구 중심의 y좌표
    guXYPoint = models.TextField()  # 구 경계의 xy좌표
    dongName = models.CharField(max_length=50)  # 동 이름
    dongCenterXPoint = models.FloatField()  # 동 중심의 x좌표
    dongCenterYPoint = models.FloatField()  # 동 중심의 y좌표
    dongXYPoint = models.TextField()  # 동 경계의 xy좌표


class CommercialArea(models.Model):
    seoulGuDong = models.ForeignKey(
        SeoulGuDong, related_name='commercialAreas', on_delete=models.CASCADE)
    commercialAreaCode = models.IntegerField(primary_key=True)  # 상권 코드
    commercialAreaName = models.CharField(max_length=50)  # 상권 이름
    commercialAreaChange = models.CharField(max_length=10)  # 상권의 변동사항
    commercialAreaXYPoint = models.TextField()  # 상권 경계의 X, Y 좌표
    commercialCenterXPoint = models.FloatField(default=0)  # 상권 중심의 x좌표
    commercialCenterYPoint = models.FloatField(default=0)  # 상권 중심의 y좌표


class CommercialAreaRevenue(models.Model):
    commercialArea = models.OneToOneField(
        CommercialArea, on_delete=models.CASCADE)
    quarterRevenue = models.BigIntegerField()  # 분기 매출
    perRevenue = models.FloatField()  # 건단가
    maleRevenue = models.BigIntegerField()  # 남성 매출
    femaleRevenue = models.BigIntegerField()  # 여성 매출

    # 시간대 10~14시 매출
    revenue1114 = models.BigIntegerField()
    # 시간대 17~24시 매출
    revenue1721 = models.BigIntegerField()
    revenue2124 = models.BigIntegerField()

    ageGroup = models.CharField(max_length=50)  # 매출 주 연령대
    timeGroup = models.CharField(max_length=50)  # 매출 주 시간대

# 경쟁업체 수 필요한데, 이건 추정매출에서 찾아봐도 될듯
# 직장 인구 수 테이블


class CommercialAreaCompany(models.Model):
    commercialArea = models.OneToOneField(
        CommercialArea, on_delete=models.CASCADE)
    companyPeople = models.IntegerField()
    companyMalePeople = models.IntegerField()
    companyFemalePeople = models.IntegerField()


class CommercialAreaNumber(models.Model):
    commercialArea = models.OneToOneField(
        CommercialArea, on_delete=models.CASCADE)
    numberStore = models.IntegerField()  # 점포 수
    numberSimilarStore = models.IntegerField()  # 유사 점포 수
    openingStore = models.IntegerField()  # 개업 점포 수
    closureStore = models.IntegerField()  # 폐업 점포 수
    openingRate = models.FloatField()  # 개업률
    closureRate = models.FloatField()  # 폐업률


class CommercialAreaPeople(models.Model):
    commercialArea = models.OneToOneField(
        CommercialArea, on_delete=models.CASCADE)
    likePeople = models.IntegerField()  # 생활 인구
    maleLikePeople = models.IntegerField()  # 남성 생활 인구
    femaleLikePeople = models.IntegerField()  # 여성 생활 인구

    # 20대 여성, 30대 여성 데이터

    likePeopleAge10 = models.IntegerField()  # 10대 수
    likePeopleAge20 = models.IntegerField()  # 20대 수
    likePeopleAge30 = models.IntegerField()  # 30대 수
    likePeopleAge40 = models.IntegerField()  # 40대 수
    likePeopleAge50 = models.IntegerField()  # 50대 수
    likePeopleAge60 = models.IntegerField()  # 60대 이상 수

    # 이건 필요없음
    # @property
    # def commercialAreaCode(self):
    #     return self.commercialArea

    # @property
    # def one_two(self):
    #     return self.likePeopleAge10 + self.likePeopleAge20


class CommercialAreaBackground(models.Model):
    commercialArea = models.OneToOneField(
        CommercialArea, on_delete=models.CASCADE)
    avgIncome = models.IntegerField(null=True)  # 평균 소득
    gradeIncome = models.IntegerField(null=True)  # 소득 분위


class CommercialAreaBuilding(models.Model):
    commercialArea = models.OneToOneField(
        CommercialArea, on_delete=models.CASCADE)
    bankNumber = models.IntegerField()
    hospitalNumber = models.IntegerField()
    pharmacyNumber = models.IntegerField()
    kindergardenNumber = models.IntegerField()

    schoolNumber = models.IntegerField()
    # 초 중 고 따로 필요
    schoolNumber1 = models.IntegerField()  # 초
    schoolNumber2 = models.IntegerField()  # 중
    schoolNumber3 = models.IntegerField()  # 고

    universityNumber = models.IntegerField()
    departmentStoreNumber = models.IntegerField()
    supermarketNumber = models.IntegerField()
    theaterNumber = models.IntegerField()
    hotelNumber = models.IntegerField()
    busTerminalNumber = models.IntegerField()

    # 공항, 철도
    airportNumber = models.IntegerField()
    chuldoNumber = models.IntegerField()

    subwayNumber = models.IntegerField()
    busStopNumber = models.IntegerField()


class CommercialAreaPlus(models.Model):
    commercialArea = models.OneToOneField(
        CommercialArea, on_delete=models.CASCADE)
    quarterRevenue = models.BigIntegerField()


class CommercialAreaApartment(models.Model):
    commercialAreaCode = models.OneToOneField(
        CommercialArea, on_delete=models.CASCADE)
    apartmentAvgPrice = models.BigIntegerField(null=True, default=0)
    apartmentCount = models.BigIntegerField(null=False, default=0)
