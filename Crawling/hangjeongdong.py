from urllib.parse import quote_plus, urlencode
from urllib.request import urlopen, Request
import xml.etree.ElementTree as ET
import json
import csv
import sys
import pandas as pd


# pd.set_option('display.max_rows', None) # 데이터프레임 행 모두 보여주기
# pd.set_option('display.max_columns', None) # 데이터프레임 열 모두 보여주기
# pd.set_option('display.max_colwidth', -1) # 데이터프레임 열이름 모두 보여주기
# gu_list = ['마포구','서대문구','은평구','종로구','중구','용산구','성동구','광진구',
#            '동대문구','성북구','강북구','도봉구','노원구','중랑구','강동구','송파구',
#            '강남구','서초구','관악구','동작구','영등포구','금천구','구로구','양천구','강서구']
gu_list = ['강서구']


for gu_name in gu_list:
    df_cafe = pd.read_csv(gu_name + 'cafe.csv', sep='|')
    df_cafe.insert(6, '행정동', None)
    hangjeongdong = []
    # print(df_cafe['주소'])
    # 주소컬럼을 순회
    # print(df_cafe['주소'])
    juso_tmp = []
    for juso in df_cafe['주소']:
    # print(juso)
    # juso = '서울 마포구 연희로 11'
        juso_list = juso.split()

        # print(juso_list)
        # 도로명까지만 출력하도록
        if len(juso_list) > 4:
            juso_list = juso_list[:4]
        else:
            juso_list =juso_list
        # print(juso_list)
        juso_list = ' '.join(juso_list) # 도로명주소를 문자열로 바꿈
        print('도로명주소 검색API 서비스를 이용한 주소검색결과를 보여줍니다.')
        keystr = juso_list # 검색할 도로명 주소
        # print(keystr)
        # keystr = '서울 서대문구 수색로 100'
        resulttype = '1' # json타입으로 결과를 받음

        if resulttype =='1':
            resulttype = 'json'
            
        else:
            resulttype = 'xml'

        #print(resulttype)

        #API요청
        url = 'http://www.juso.go.kr/addrlink/addrLinkApi.do'
        queryParams = '?' + urlencode({ 
            quote_plus('currentPage') : '1' , 
            quote_plus('countPerPage') : '10', 
            quote_plus('resultType') : resulttype, 
            quote_plus('keyword') : keystr, 
            quote_plus('confmKey') : 'bGk3MHZtMWJ2anNkODIwMTQwOTEyMTg0NDI2',
            quote_plus('addInfoYn') : 'Y'
            }) 

        request = Request(url + queryParams)
        request.get_method = lambda: 'GET'
        response_body = urlopen(request).read()

        tmp_hang = []
        if resulttype =='json':
            root_json = json.loads(response_body)
            # print(root_json)
            if not root_json['results']['juso']:
                hangjeongdong.append('없음')
                # print('처음 없는 경우: ', hangjeongdong)
            else:   
                for child in root_json['results']['juso']:
                    print('-'*100)
                    print('[' + child['zipNo'] + '] ' + child['roadAddr'])
                    print('    지번주소     = ' + child['jibunAddr'])
                    print('    영문주소     = ' + child['engAddr'])
                    print('    도로명코드   = ' + child['rnMgtSn'])
                    print('    건물관리번호 = ' + child['bdMgtSn'])
                    print('    법정동코드   = ' + child['admCd'])
                    print('    상세건물명   = ' + child['detBdNmList'])
                    print('    관할주민센터 = ' + child['hemdNm'])
                    tmp_hang.append(child['hemdNm']) # 비슷한 주소를 가진 경우 결과값이 여러개 나옴
                # print(tmp_hang)
                # print(tmp_hang[0])
                # print(type(tmp_hang[0]))
                if tmp_hang[0]:
                    dong = tmp_hang[0] # 결과값은 정확도 기준으로 정렬되기 때문에 0번이 가장 정확
                    # print(dong)
                    hang = []
                    # 행정동만 추출하기 위해서 
                    for idx in range(len(dong)-1, -1, -1):
                        # print(dong[idx])
                        hang.append(dong[idx])
                        if dong[idx] == ' ':
                            break
                    hang.pop(-1)
                    hang = hang[::-1]
                    hang = ''.join(hang)
                    # juso_tmp.append(hang)
                    # API 데이터에는 상권 행정동과 이름이 다르다
                    if "제" in hang:
                        if hang == "제기동":
                            # continue
                            hangjeongdong.append(hang)
                        elif hang[:2] == "홍제":
                            # continue
                            hangjeongdong.append(hang)
                        else:
                            hang = hang.replace("제", "")
                            hangjeongdong.append(hang)
                    else:
                        hangjeongdong.append(hang)
                else:
                    hangjeongdong.append('없음')
                
            print('마지막: ', hangjeongdong)
                
            # 행정동 데이터를 카페 데이터에 집어넣기
            for idx in range(len(hangjeongdong)):
                if hangjeongdong[idx] == '없음':
                    df_cafe['행정동'][idx] = hangjeongdong[idx]
                else:
                    df_cafe['행정동'][idx] = gu_name + " " + hangjeongdong[idx]
            df_cafe.to_csv(gu_name + '_hangjeongdong_cafe.csv', )
            
    
    
