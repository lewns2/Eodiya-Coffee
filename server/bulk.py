import os
import django
import json
from pandas.io.json import json_normalize
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Odiya.settings')
django.setup()

from commercial_area.models import CommercialAreaBuilding, CommercialAreaCompany, CommercialAreaPlus, SeoulGuDong, CommercialArea, CommercialAreaRevenue, CommercialAreaPeople, CommercialAreaBackground, CommercialAreaNumber
from cafes.models import CafeList, CafeMenu
import pandas as pd

# #### 지역 테이블 만들기
# df = pd.read_csv('../Data/commercialAreaData/상권-행정동.csv', encoding='CP949')
# # 구의 중심좌표를 구하기 위함
# df_gu = pd.read_csv('../Data/XY_point/gu.csv')
# res = [] # 상권 코드의 집합
# gu_center_point = []
# for i in range(len(df)):
#     code = df.iloc[i]['상권_코드']
#     res.append(code)
#     for j in range(len(df_gu)):
#         if df.iloc[i]['시군구명'] == df_gu.iloc[j]['시군구명']:
#             guCenterXPoint = df_gu.iloc[j]['X']# 구 중심의 x좌표
#             guCenterYPoint = df_gu.iloc[j]['Y']# 구 중심의 y좌표
#             gu_center_point.append([guCenterXPoint, guCenterYPoint])

# # # 구의 경계좌표를 구하기 위함
# df_gu2 = pd.read_json('../Data/XY_point/seoul_sigungu.json', orient='index')
# gu_point_array = []
# for i in range(len(df_gu2[0]['features'])):
#     if df_gu2[0]['features'][i]['properties']['SIG_CD'][0] == '1':
#         gu_point = str(df_gu2[0]['features'][i]['geometry']['coordinates'][0])
#         gu_point = gu_point[1:]
#         gu_point = gu_point[:-1]
#         gu_name = df_gu2[0]['features'][i]['properties']['SIG_KOR_NM']
#         gu_point_array.append((gu_name, gu_point))

# # 동의 중심좌표를 구하기 위함
# df_dong = pd.read_csv('../Data/XY_point/dong.csv', encoding='CP949')
# dong_center_point = []
# for i in range(len(df)):
#     for j in range(len(df_dong)):
#         # 강남구에도 신사동이 있고 관악구에도 신사동(신림동)이 있다
#         if df.iloc[i]['행정동명'] == df_dong.iloc[j]['읍면동명'] and df.iloc[i]['시군구명'] == df_dong.iloc[j]['시군구명']:
#             dongCenterXPoint = df_dong.iloc[j]['X'] # 동 중심의 x좌표
#             dongCenterYPoint = df_dong.iloc[j]['Y'] # 동 중심의 y좌표
#             dong_center_point.append([dongCenterXPoint, dongCenterYPoint])


# # 동의 경계좌표를 구하기 위함
# df_dong2 = pd.read_json('../Data/XY_point/seoul_sigungudong.json', orient='index')
# dong_point_array = []
# for i in range(len(df_dong2[0]['features'])):
#     dong_point = str(df_dong2[0]['features'][i]['geometry']['coordinates'][0])
#     dong_point = dong_point[1:-1]
#     dong_point_array.append([df_dong2[0]['features'][i]['properties']['adm_nm'], dong_point])


# # ### SeoulGuDong Model
# instances = []
# check = []
# for i in range(len(df)):
#     dongCode = df.iloc[i]['행정동_코드']
#     guName = df.iloc[i]['시군구명']
#     guCenterXPoint = gu_center_point[i][0] # 구 중심의 x좌표
#     guCenterYPoint = gu_center_point[i][1] # 구 중심의 y좌표
#     for j in gu_point_array:
#         if j[0] == guName:
#             guXYPoint = j[1] # 구 경계의 xy좌표
#             break
#     # print(dongCode, guName, guCenterXPoint, guCenterYPoint, guXYPoint)
#     dongName = df.iloc[i]['행정동명']
#     dongCenterXPoint = dong_center_point[i][0] # 동 중심의 x좌표
#     dongCenterYPoint = dong_center_point[i][1]# 동 중심의 y좌표
#     for k in dong_point_array:
#         if k[0][6:] == guName + ' ' + dongName:
#             dongXYPoint = k[1] # 동 경계의 xy좌표
#             break
#     # print(dongName + guName, dongXYPoint)
#     if dongCode in check: continue
#     check.append(dongCode)
#     # print(dongCode, guName, (guCenterXPoint, guCenterYPoint), guXYPoint, dongName, (dongCenterXPoint, dongCenterYPoint), dongXYPoint)
#     instances.append(SeoulGuDong(dongCode=dongCode, guName=guName, guCenterXPoint=guCenterXPoint, guCenterYPoint=guCenterYPoint, guXYPoint=guXYPoint, dongName=dongName, 
#                                  dongCenterXPoint=dongCenterXPoint, dongCenterYPoint=dongCenterYPoint, dongXYPoint=dongXYPoint))
# SeoulGuDong.objects.bulk_create(instances)


## dataFrame
df1 = pd.read_csv('../Data/commercialAreaData/서울시 우리마을가게 상권분석서비스(상권-추정매출).csv', encoding='CP949')
df1 = df1.loc[(df1['기준_분기_코드'] == 3) & (df1['서비스_업종_코드_명'] == '커피-음료')]
df2 = pd.read_csv('../Data/commercialAreaData/서울시 우리마을가게 상권분석서비스(상권-점포).csv', encoding='CP949')
df2 = df2.loc[(df2['기준_년_코드'] == 2021) &(df2['기준_분기_코드'] == 3) & (df2['서비스_업종_코드_명'] == '커피-음료')]
df3 = pd.read_csv('../Data/commercialAreaData/서울시 우리마을가게 상권분석서비스(상권-생활인구).csv', encoding='CP949')
df3 = df3.loc[(df3['기준 년코드'] == 2021) &(df3['기준_분기_코드'] == 3)]
df4 = pd.read_csv('../Data/commercialAreaData/서울시 우리마을가게 상권분석서비스(상권-상권변화지표).csv', encoding='CP949')
df4 = df4.loc[(df4['기준_년_코드'] == 2021) & (df4['기준_분기_코드'] == 3)]
df5 = pd.read_csv('../Data/commercialAreaData/서울시 우리마을가게 상권분석서비스(상권배후지-소득소비).csv', encoding='CP949')
df5 = df5.loc[(df5['기준 년 코드'] == 2021) & (df4['기준_분기_코드'] == 3)]
df6 = pd.read_csv('../Data/commercialAreaData/상권-행정동.csv', encoding='CP949')    
df7 = pd.read_csv('../Data/commercialAreaData/서울시 우리마을가게 상권분석서비스(상권-집객시설).csv', encoding='CP949')
df7 = df7.loc[(df7['기준_년_코드'] == 2021) & (df7['기준_분기_코드'] == 3)]
df7.fillna(0, inplace=True)
df8 = pd.read_csv('../Data/commercialAreaData/서울시 우리마을가게 상권분석서비스(상권-직장인구).csv', encoding='CP949')
df8 = df8.loc[(df8['기준_년월_코드'] == 2021) & (df7['기준_분기_코드'] == 3)]
df9 = pd.read_csv('../Data/commercialAreaData/서울시 우리마을가게 상권분석서비스(상권-추정매출).csv', encoding='CP949')
df9 = df9.loc[(df9['기준_분기_코드'] == 2) & (df9['서비스_업종_코드_명'] == '커피-음료')]

### res Data
res1 = []
for i in range(len(df1)):
    code = df1.iloc[i]['상권_코드']
    res1.append(code)
    
res2 = []
for i in range(len(df2)):
    code = df2.iloc[i]['상권_코드']
    res2.append(code)
    
res3 = []
for i in range(len(df3)):
    code = df3.iloc[i]['상권_코드']
    res3.append(code)
    
res4 = []
for i in range(len(df4)):
    code = df4.iloc[i]['상권_코드']
    res4.append(code)
    
res5 = []
for i in range(len(df8)):
    code = df8.iloc[i]['상권_코드']
    res5.append(code)

res6 = []
for i in range(len(df6)):
    code = df6.iloc[i]['상권_코드']
    res6.append(code)
    
    
res = list(set(res1) & set(res2) & set(res3) & set(res4) & set(res5) & set(res6) )

# ### CommercialArea Model
# instances=  []
# for i in range(len(res)):
#     code = res[i]
#     dongCode = df6.loc[df6['상권_코드'] == code]['행정동_코드'].values[0]
#     temp_df = df4.loc[df4['상권_코드'] == code]
#     if temp_df.empty:
#         continue
#     commercialAreaCode = temp_df['상권_코드'].values[0]
#     commercialAreaName = temp_df['상권_코드_명'].values[0]
#     commercialAreaChange = temp_df['상권_변화_지표_명'].values[0]
#     with open("../Data/XY_point/seoul_sanggwon.json", "r", encoding="utf8") as f:
#         contents = f.read()
#         json_data = json.loads(contents)
#         commercialAreaXYPoint = ''
#         for i in range(len(json_data['features'])):
#             name = str(json_data['features'][i]['properties']['TRDAR_CD_N'])
#             if name == commercialAreaName:
#                 commercialAreaXYPoint = str(json_data['features'][i]['geometry']['coordinates'][0])[1:-1]
#                 break
#     seoulGuDong = SeoulGuDong.objects.get(dongCode=dongCode)

#     instances.append(CommercialArea(seoulGuDong=seoulGuDong, commercialAreaCode=commercialAreaCode, commercialAreaName=commercialAreaName, commercialAreaChange=commercialAreaChange, commercialAreaXYPoint=commercialAreaXYPoint))
# CommercialArea.objects.bulk_create(instances)

# ### CommercialAreaRevenue Model
# ### 상권-추정매출
# instances = []
# for i in range(len(res)):
#     code = res[i]
#     temp_df = df1.loc[df1['상권_코드'] == code]
#     if temp_df.empty:
#         continue
#     quarterRevenue = temp_df['분기당_매출_금액'].values[0]
#     if temp_df['분기당_매출_건수'].values[0] == 0:
#         perRevenue = 0
#     else:
#         perRevenue = temp_df['분기당_매출_금액'].values[0] / temp_df['분기당_매출_건수'].values[0]
#     maleRevenue = temp_df['남성_매출_금액'].values[0]
#     femaleRevenue = temp_df['여성_매출_금액'].values[0]
    
#     lst = list(temp_df.iloc[0, 27:33].values)
#     idx = lst.index(max(lst))
#     if idx == 0: ageGroup = '10대'
#     elif idx == 1: ageGroup = '20대'
#     elif idx == 2: ageGroup = '30대'
#     elif idx == 3: ageGroup = '40대'
#     elif idx == 4: ageGroup = '50대'
#     elif idx == 5: ageGroup = '60대 이상'
    
#     lst = list(temp_df.iloc[0, 19:25].values)
#     idx = lst.index(max(lst))
#     if idx == 0: timeGroup = '0~6시'
#     elif idx == 1: timeGroup = '6~11시'
#     elif idx == 2: timeGroup = '11~14시'
#     elif idx == 3: timeGroup = '14~17시'
#     elif idx == 4: timeGroup = '17~21시'
#     elif idx == 5: timeGroup = '21~24시'
    
#     # 시간대 10~14시 매출
#     revenue1114 = temp_df['시간대_11~14_매출_금액'].values[0]
#     # 시간대 17~24시 매출
#     revenue1721 = temp_df['시간대_17~21_매출_금액'].values[0]
#     revenue2124 = temp_df['시간대_21~24_매출_금액'].values[0]
    
    
    
#     commercialArea = CommercialArea.objects.get(commercialAreaCode=code)
#     instances.append(CommercialAreaRevenue(revenue1114=revenue1114, revenue1721=revenue1721, revenue2124=revenue2124, commercialArea=commercialArea, quarterRevenue=quarterRevenue, perRevenue=perRevenue, maleRevenue=maleRevenue, femaleRevenue=femaleRevenue, ageGroup=ageGroup, timeGroup=timeGroup))
# CommercialAreaRevenue.objects.bulk_create(instances)
    
# # ### CommercialAreaNumber Model    
# # ### 상권-점포
# instances = []
# for i in range(len(res)):
#     code = res[i]
#     temp_df = df2.loc[df2['상권_코드'] == code]
#     if temp_df.empty:
#         continue
#     numberStore = temp_df['점포_수'].values[0]
#     numberSimilarStore = temp_df['유사_업종_점포_수'].values[0]
#     openingStore = temp_df['개업_점포_수'].values[0]
#     closureStore = temp_df['폐업_점포_수'].values[0]
#     openingRate = temp_df['개업_율'].values[0]
#     closureRate = temp_df['폐업_률'].values[0]
#     commercialArea = CommercialArea.objects.get(commercialAreaCode=code)
#     instances.append(CommercialAreaNumber(commercialArea=commercialArea, numberStore=numberStore, numberSimilarStore=numberSimilarStore, openingStore=openingStore, closureStore=closureStore, openingRate=openingRate, closureRate=closureRate))
# CommercialAreaNumber.objects.bulk_create(instances)
    
    
# ### CommercialAreaPeople Model
# ### 상권-생활인구
# instances = []
# for i in range(len(res)):
#     code = res[i] 
#     temp_df = df3.loc[df3['상권_코드'] == code]
#     if temp_df.empty:
#         continue
#     likePeople = temp_df['총_생활인구_수'].values[0]
#     maleLikePeople = temp_df['남성_생활인구_수'].values[0]
#     femaleLikePeople = temp_df['여성_생활인구_수'].values[0]
#     likePeopleAge10 = temp_df['연령대_10_생활인구_수'].values[0]
#     likePeopleAge20 = temp_df['연령대_20_생활인구_수'].values[0]
#     likePeopleAge30 = temp_df['연령대_30_생활인구_수'].values[0]
#     likePeopleAge40 = temp_df['연령대_40_생활인구_수'].values[0]
#     likePeopleAge50 = temp_df['연령대_50_생활인구_수'].values[0]
#     likePeopleAge60 = temp_df['연령대_60_이상_생활인구_수'].values[0]
#     commercialArea = CommercialArea.objects.get(commercialAreaCode=code)
    
    
    
#     instances.append(CommercialAreaPeople(commercialArea=commercialArea, likePeople=likePeople, maleLikePeople=maleLikePeople, femaleLikePeople=femaleLikePeople, likePeopleAge10=likePeopleAge10, likePeopleAge20=likePeopleAge20, likePeopleAge30=likePeopleAge30, likePeopleAge40=likePeopleAge40, likePeopleAge50=likePeopleAge50, likePeopleAge60=likePeopleAge60))
# CommercialAreaPeople.objects.bulk_create(instances)

# ### CommercialAreaBackground Model
# ### 상권배후지-소득소비
# instances = []
# for i in range(len(res)):
#     code = res[i] 
#     temp_df = df5.loc[df5['상권_코드'] == code]
#     if temp_df.empty:
#         continue
#     avgIncome = temp_df['월_평균_소득_금액'].values[0]
#     gradeIncome = temp_df['소득_구간_코드'].values[0]
#     commercialArea = CommercialArea.objects.get(commercialAreaCode=code)
#     instances.append(CommercialAreaBackground(commercialArea=commercialArea, avgIncome=avgIncome, gradeIncome=gradeIncome))
# CommercialAreaBackground.objects.bulk_create(instances)
    
# ## CommercialAreaBuilding Model
# ## 상권-집객시설
# instances = []
# for i in range(len(res)):
#     code = res[i] 
#     temp_df = df7.loc[df7['상권_코드'] == code]
#     if temp_df.empty:
#         continue
#     bankNumber = temp_df['은행_수']
#     hospitalNumber = temp_df['종합병원_수'] + temp_df['일반_병원_수']
#     pharmacyNumber = temp_df['약국_수']
#     kindergardenNumber = temp_df['유치원_수']
#     schoolNumber =  temp_df['초등학교_수'] + temp_df['중학교_수'] + temp_df['고등학교_수']
    
#     schoolNumber1 = temp_df['초등학교_수']
#     schoolNumber2 = temp_df['중학교_수']
#     schoolNumber3 = temp_df['고등학교_수']
    
#     universityNumber = temp_df['대학교_수']
#     departmentStoreNumber = temp_df['백화점_수']
#     supermarketNumber = temp_df['슈퍼마켓_수']
#     theaterNumber = temp_df['극장_수']
#     hotelNumber = temp_df['숙박_시설_수']
#     busTerminalNumber = temp_df['버스_터미널_수']
#     subwayNumber = temp_df['지하철_역_수']
#     busStopNumber = temp_df['버스_정거장_수']
    
#     airportNumber = temp_df['공항_수']
#     chuldoNumber = temp_df['철도_역_수']
    
#     commercialArea = CommercialArea.objects.get(commercialAreaCode=code)
#     instances.append(CommercialAreaBuilding(schoolNumber=schoolNumber, airportNumber=airportNumber, chuldoNumber=chuldoNumber, commercialArea=commercialArea, bankNumber=bankNumber, hospitalNumber=hospitalNumber, pharmacyNumber=pharmacyNumber, kindergardenNumber=kindergardenNumber, schoolNumber1=schoolNumber1, schoolNumber2=schoolNumber2, schoolNumber3=schoolNumber3, universityNumber=universityNumber, departmentStoreNumber=departmentStoreNumber, supermarketNumber=supermarketNumber, theaterNumber=theaterNumber, hotelNumber=hotelNumber, busTerminalNumber=busTerminalNumber, subwayNumber=subwayNumber, busStopNumber=busStopNumber))
# CommercialAreaBuilding.objects.bulk_create(instances)


# # ### 카페 모델
# gu_list = ['마포구','서대문구','은평구','종로구','중구','용산구','성동구','광진구',
#            '동대문구','성북구','강북구','도봉구','노원구','중랑구','강동구','송파구',
#            '강남구','서초구','관악구','동작구','영등포구','금천구','구로구','양천구','강서구']
# # gu_list = ['강남구']

# instances = []

# # 구 순회
# for gu in gu_list:
#     sanggwon_dong = [] # 상권의 행정동 
#     for k in range(len(df)):
#         if gu == df.loc[k]['시군구명']:
#             sanggwon_dong.append(df.loc[k]['시군구명'] + ' ' + df.loc[k]['행정동명'])
                
#     df_cafe = pd.read_csv(f'../Data/Cafe_Data/{gu}_cafe_data.csv', encoding='CP949')

#     for i in range(len(df_cafe)):
#         hangjeongdong = df_cafe.loc[i]['행정동']
#         # print(hangjeongdong)
#         # 카페의 행정동 코드 
#         for k in range(len(df)):
#             dong = df.loc[k]['시군구명'] + ' ' + df.loc[k]['행정동명']
#             if hangjeongdong == dong:
#                 tmp_dongCode = df.loc[k]['행정동_코드']
#                 break
#             elif hangjeongdong != dong and hangjeongdong not in sanggwon_dong:
#                 tmp_dongCode = df.loc[k]['행정동_코드']
#                 break      
#         dongCode = SeoulGuDong.objects.get(dongCode = tmp_dongCode)
#         guName = df_cafe.iloc[i]['구']
#         UrlId = df_cafe.iloc[i]['URL_ID']
#         cafeName = df_cafe.iloc[i]['카페명']
#         cafeRate = df_cafe.iloc[i]['평점']
#         reviewCount =df_cafe.iloc[i]['리뷰개수']
#         cafeAddress = df_cafe.iloc[i]['주소']
#         cafeHour = df_cafe.iloc[i]['영업시간']
#         cafeTel = df_cafe.iloc[i]['전화번호']
#         cafeHomepage = df_cafe.iloc[i]['홈페이지주소']
#         cafeTag = df_cafe.iloc[i]['태그']
#         cafePhoto = df_cafe.iloc[i]['대표사진주소']
#         Xpoint, Ypoint = df_cafe.loc[i]['경도'], df_cafe.loc[i]['위도']
#         cafePoint = str(Xpoint) + '&' + str(Ypoint)
    
#         instances.append(CafeList(dongCode=dongCode, guName=guName, UrlId=UrlId, cafeName=cafeName, cafeRate=cafeRate, reviewCount=reviewCount, cafeAddress=cafeAddress,
#                 cafeHour=cafeHour, cafeTel = cafeTel, cafeHomepage=cafeHomepage, cafeTag=cafeTag, cafePhoto=cafePhoto, cafePoint = cafePoint
#                 ))
# CafeList.objects.bulk_create(instances)

# ## 상권과 카페의 중개 테이블

# square = [] # 북남동서
# df_sang = pd.read_json('../Data/XY_point/seoul_sanggwon.json', orient='index')

# for idx in range(len(df_sang[0]['features'])):
#     max_border_x, min_border_x, max_border_y, min_border_y = 0, 987654321, 0, 987654321
#     for border_x, border_y in df_sang[0]['features'][idx]['geometry']['coordinates'][0]:
#         # print(border_x, border_y)
#         if border_x >= max_border_x:
#             max_border_x = border_x
#         elif border_x <= min_border_x:
#             min_border_x = border_x
#         if border_y >= max_border_y:
#             max_border_y = border_y
#         elif border_y <= min_border_y:
#             min_border_y = border_y
#     # 상권들의 경계
#     square.append([df_sang[0]['features'][idx]['properties']['TRDAR_CD_N'], df_sang[0]['features'][idx]['properties']['TRDAR_CD'], [max_border_x, max_border_y, min_border_x, min_border_y]])

# instances = []
# for gu in gu_list:
#     df_cafe = pd.read_csv(f'../Data/Cafe_Data/{gu}_cafe_data.csv', encoding='CP949')
    
#     for i in range(len(df_cafe)):
#         guName = df_cafe.iloc[i]['구']
#         UrlId = df_cafe.iloc[i]['URL_ID']
#         cafeName = df_cafe.iloc[i]['카페명']
#         Xpoint, Ypoint = df_cafe.loc[i]['경도'], df_cafe.loc[i]['위도']
        
#         commercialCodes = []    
#         # 카페가 상권 안에 있는지 확인
#         for j in square:
#             if j[2][2] <= Xpoint <= j[2][0] and j[2][3] <= Ypoint <= j[2][1]:
#                 commercialCodes.append(j[1])
#         # print(guName, cafeName, commercialCodes)

#         for cc in commercialCodes:
#             # print(type(cc))
#             try:
#                 cc = int(cc)
#                 commercialareaId = CommercialArea.objects.get(commercialAreaCode=cc)
#                 print(commercialareaId)
#                 commercialareaId.commercialCode.add(UrlId)
#             except:
#                 pass

# ### 카페 메뉴
# instances = []
# for gu in gu_list:
#     df_cafe = pd.read_csv(f'../Data/Cafe_Data/{gu}_cafe_data.csv', encoding='CP949')
    
#     for idx in range(len(df_cafe)):
#         cafeMenu = df_cafe.loc[idx]['메뉴']
#         cafeUrl = df_cafe.loc[idx]['URL_ID']
#         tmp_menu = []
#         if type(cafeMenu) ==  str:
#             if cafeMenu[-1] == '&':
#                 cafeMenu = cafeMenu[:-1]
#             cafeMenu = cafeMenu.split('++')
#             for menu in cafeMenu:
#                 menu = menu.replace('가격: ', '++')
#                 menu = menu[7:]
#                 menu = menu.split('++')
#                 if menu != ['']:
#                     # print(menu)
#                     tmp_menu.append(menu)
#                 # print(menu)
#         elif type(cafeMenu) == float: 
#             cafeMenu = ''
#             tmp_menu.append(cafeMenu)
#             # print(False, cafeMenu, type(cafeMenu))
#         # print(tmp_menu)
#         UrlId = CafeList.objects.get(UrlId = cafeUrl)
#         for m in tmp_menu:
#             if m != '':
#                 menuName = m[0].strip()
#                 menuPrice = m[1].replace(',', '')
#                 menuPrice = int(menuPrice)
#                 print(cafeUrl, menuName, menuPrice)
            
#                 instances.append(CafeMenu(UrlId = UrlId, menuName = menuName, menuPrice = menuPrice))
# # print(instances)
# CafeMenu.objects.bulk_create(instances)
    
    
### CommercialAreaCompany Model
### 상권-직장인구
# instances = []
# for i in range(len(res)):
#     code = res[i] 
#     temp_df = df8.loc[df8['상권_코드'] == code]
#     if temp_df.empty:
#         continue
    
#     commercialArea = CommercialArea.objects.get(commercialAreaCode=code)
#     companyPeople = temp_df['총_직장_인구_수']
#     companyMalePeople = temp_df['남성_직장_인구_수']
#     companyFemalePeople = temp_df['여성_직장_인구_수']
    
    
#     instances.append(CommercialAreaCompany(commercialArea=commercialArea, companyPeople=companyPeople, companyMalePeople=companyMalePeople, companyFemalePeople=companyFemalePeople))
# CommercialAreaCompany.objects.bulk_create(instances)

# ### CommercialAreaPlus Model
# ### 상권-추정매출 2분기
# instances = []
# for i in range(len(res)):
#     code = res[i] 
#     temp_df = df9.loc[df9['상권_코드'] == code]
#     if temp_df.empty:
#         temp_df = df1.loc[df1['상권_코드'] == code]
#         commercialArea = CommercialArea.objects.get(commercialAreaCode=code)
#         quarterRevenue = temp_df['분기당_매출_금액'].values[0]
#         instances.append(CommercialAreaPlus(commercialArea=commercialArea, quarterRevenue=quarterRevenue))
#     else: 
#         commercialArea = CommercialArea.objects.get(commercialAreaCode=code)
#         quarterRevenue = temp_df['분기당_매출_금액'].values[0]
#         instances.append(CommercialAreaPlus(commercialArea=commercialArea, quarterRevenue=quarterRevenue))
# CommercialAreaPlus.objects.bulk_create(instances)