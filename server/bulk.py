import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Odiya.settings')
django.setup()

from commercial_area.models import SeoulGuDong, CommercialArea
import pandas as pd

df = pd.read_csv('../Data/commercialAreaData/상권-행정동.csv', encoding='CP949')    
### SeoulGuDong Model
instances = []
check = []
for i in range(len(df)):
    guName = df.iloc[i]['시군구명']
    dongName = df.iloc[i]['행정동명']
    if dongName in check: continue
    check.append(dongName)
    instances.append(SeoulGuDong(guName=guName, dongName=dongName))
SeoulGuDong.objects.bulk_create(instances)


### CommercialArea Model
df1 = pd.read_csv('../Data/commercialAreaData/서울시 우리마을가게 상권분석서비스(상권-추정매출).csv', encoding='CP949')
df1 = df1.loc[(df1['기준_분기_코드'] == 3) & (df1['서비스_업종_코드_명'] == '커피-음료')]
df2 = pd.read_csv('../Data/commercialAreaData/서울시 우리마을가게 상권분석서비스(상권-점포).csv', encoding='CP949')
df2 = df2.loc[(df2['기준_년_코드'] == 2021) &(df2['기준_분기_코드'] == 3) & (df2['서비스_업종_코드_명'] == '커피-음료')]
df3 = pd.read_csv('../Data/commercialAreaData/서울시 우리마을가게 상권분석서비스(상권_상주인구).csv', encoding='CP949')
df3 = df3.loc[(df3['기준_년_코드'] == 2021) &(df3['기준_분기_코드'] == 3)]
df4 = pd.read_csv('../Data/commercialAreaData/상권-행정동.csv', encoding='CP949')
res = []
instances=  []
for i in range(len(df1)):
    # 1 상권-추정매출
    code = df1.iloc[i]['상권_코드']
    if code in res: continue
    commercialAreaName = df1.iloc[i]['상권_코드_명']
    revenue = df1.iloc[i]['분기당_매출_금액']
    if df1.iloc[i]['분기당_매출_건수'] == 0:
        priceByCase = 0
    else:
        priceByCase = df1.iloc[i]['분기당_매출_금액'] // df1.iloc[i]['분기당_매출_건수']
    maleRevenue = df1.iloc[i]['남성_매출_금액']
    femaleRevenue = df1.iloc[i]['여성_매출_금액']
    
    lst = list(df1.iloc[i][27:33].values)
    idx = lst.index(max(lst))
    if idx == 0: ageGroup = '10대'
    elif idx == 1: ageGroup = '20대'
    elif idx == 2: ageGroup = '30대'
    elif idx == 3: ageGroup = '40대'
    elif idx == 4: ageGroup = '50대'
    elif idx == 5: ageGroup = '60대 이상'
    
    lst = list(df1.iloc[i][19:25].values)
    idx = lst.index(max(lst))
    if idx == 0: timeGroup = '0~6시'
    elif idx == 1: timeGroup = '6~11시'
    elif idx == 2: timeGroup = '11~14시'
    elif idx == 3: timeGroup = '14~17시'
    elif idx == 4: timeGroup = '17~21시'
    elif idx == 5: timeGroup = '21~24시'
    
    # 2 상권-점포
    temp_df = df2.loc[df2['상권_코드'] == code]
    if temp_df.empty:
        continue
    numberStore = temp_df['점포_수']
    similarStore = temp_df['유사_업종_점포_수']
    openingStore = temp_df['개업_점포_수']
    closureStore = temp_df['폐업_점포_수']
    openingRate = temp_df['개업_율']
    closureRate = temp_df['폐업_률']
    
    # 3 상권-상주인구
    temp_df = df3.loc[df3['상권 코드'] == code]
    if temp_df.empty:
        continue
    residentPeople = temp_df['총 상주인구 수']
    maleResidentPeople = temp_df['남성 상주인구 수']
    femaleResidentPeople = temp_df['여성 상주인구 수']
    numberHouseholds = temp_df['총 가구 수']
    age10 = temp_df['연령대 10 상주인구 수']
    age20 = temp_df['연령대 20 상주인구 수']
    age30 = temp_df['연령대 30 상주인구 수']
    age40 = temp_df['연령대 40 상주인구 수']
    age50 = temp_df['연령대 50 상주인구 수']
    age60 = temp_df['연령대 60 이상 상주인구 수']
    
    # 4 상권-행정동
    temp_df = df4.loc[df4['상권_코드'] == code]
    if temp_df.empty:
        continue
    dongName = temp_df['행정동명'].values[0]
    seoulgudong = SeoulGuDong.objects.get(dongName=dongName)
    res.append(code)
    instances.append(CommercialArea(seoulgudong=seoulgudong, code=code, commercialAreaName=commercialAreaName, revenue=revenue, priceByCase=priceByCase, maleRevenue=maleRevenue, femaleRevenue=femaleRevenue, ageGroup=ageGroup, timeGroup=timeGroup, numberStore=numberStore, similarStore=similarStore, openingStore=openingStore, closureStore=closureStore, openingRate=openingRate, closureRate=closureRate, residentPeople=residentPeople, maleResidentPeople=maleResidentPeople, femaleResidentPeople=femaleResidentPeople, numberHouseholds=numberHouseholds, age10=age10, age20=age20, age30=age30, age40=age40, age50=age50, age60=age60))
CommercialArea.objects.bulk_create(instances)