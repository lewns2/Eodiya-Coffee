# 25개구 for문으로 돌려서 카페 정보 크롤링하기
import os
from time import sleep
import time
import re
from bs4 import BeautifulSoup # 아나콘다 파이썬으로 실행하면 BeautifulSoup을 다운 받지 않아도 된다.
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import ElementNotInteractableException
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
# 크롬 크롤링 디버깅용
from selenium.webdriver.chrome.options import Options

##########################################################################
##################### variable related selenium ##########################
##########################################################################

# 서울 특별시 구 리스트
# gu_list = ['마포구','서대문구','은평구','종로구','중구','용산구','성동구','광진구',
#            '동대문구','성북구','강북구','도봉구','노원구','중랑구','강동구','송파구',
#            '강남구','서초구','관악구','동작구','영등포구','금천구','구로구','양천구','강서구']
gu_list = ['영등포구']

# csv 파일에 헤더 만들어 주기
for index, gu_name in enumerate(gu_list):
    fileName = gu_name + 'cafe.csv' # index.__str__() + '_' + gu_name + '.'+'csv'
    file = open(fileName, 'w', encoding='utf-8')
    # 파일 만들기
    file.write("구"+ "|" + "URL_ID" + "|" + "카페명" + "|" + "평점" + "|" + "리뷰개수" + "|" + "주소" + "|" 
               + "영업시간" + "|" + "전화번호" + "|" + "홈페이지주소" + "|" 
               + "태그" + "|"  + "메뉴"  + "|" + "대표사진주소" + "|" + "\n") # 처음에 csv파일에 칼럼명 만들어주기
    file.close()                                    
    
    # 크롬 크롤링 디버깅용
    # chrome_options = Options()
    # chrome_options.add_experimental_option("debuggerAddress", "127.0.0.1:9222")
    ### C드라이브에 크롬이 깔려있는 곳에 가서 cmd 실행 후 'chrome.exe --chrome.exe --remote-debugging-port=9222 --user-data-dir="C:/ChromeTEMP"'입력하면 디버깅용 크롬이 나옴

    
    # 진짜 크롤링용
    options = webdriver.ChromeOptions()
    options.add_experimental_option("excludeSwitches", ["enable-logging"])
    # options.add_argument('headless')
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36") 
    # options.add_argument('lang=ko_KR')
    driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
    
    # 카카오맵
    url = 'https://map.kakao.com/'
    driver.get(url)  # 주소 가져오기
    search_area = driver.find_element_by_xpath('//*[@id="search.keyword.query"]') # 검색 창
    search_area.send_keys('서울 ' + gu_name + ' 카페')  # 검색어 입력
    driver.find_element_by_xpath('//*[@id="search.keyword.submit"]').send_keys(Keys.ENTER)  # Enter로 검색
    driver.implicitly_wait(3) # 기다려 주자
    more_page = driver.find_element_by_id("info.search.place.more")
    more_page.send_keys(Keys.ENTER) # 더보기 누르고
    # 첫 번째 검색 페이지 끝
    # 기다려주기
    time.sleep(1)

    # next 사용 가능?
    next_btn = driver.find_element_by_id("info.search.page.next")
    has_next = "disabled" not in next_btn.get_attribute("class").split(" ")
    Page = 1
    
    while has_next: # 다음 페이지가 있으면 loop
        time.sleep(1)
        # 페이지 루프
        #info\.search\.page\.no1 ~ .no5
        page_links = driver.find_elements_by_css_selector("#info\.search\.page a")
        pages = [link for link in page_links if "HIDDEN" not in link.get_attribute("class").split(" ")]
        # print(len(pages), "개의 페이지 있음")
        # pages를 하나씩 클릭하면서
        for i in range(1, 6):
            xPath = '//*[@id="info.search.page.no' + str(i) + '"]'
            try:
                page = driver.find_element_by_xpath(xPath)
                page.send_keys(Keys.ENTER)
            except ElementNotInteractableException:
                print('End of Page')
                break
            sleep(3)
            place_lists = driver.find_elements_by_css_selector('#info\.search\.place\.list > li')
            for p in place_lists: # WebElement
                file = open(fileName, 'a', encoding='utf-8')
                # time.sleep(10)
                store_html = p.get_attribute('innerHTML')
                # print(store_html)
                store_info = BeautifulSoup(store_html, "html.parser")
 
                place_name = store_info.select('.head_item > .tit_name > .link_name')
                if len(place_name) == 0:
                    continue # 광고는 제외
                # 가게 이름
                place_name = store_info.select('.head_item > .tit_name > .link_name')[0].text
                print(place_name)
                # 가게 카테고리
                place_category = store_info.select('.head_item > .subcategory.clickable')[0].text
                place_category = '#' + place_category + " "
                # 가게 주소
                place_address = store_info.select('.info_item > .addr > p')[0].text
                # 가게 전화번호
                place_tel = store_info.select('.info_item > .contact > span')[0].text
                # 가게 평점
                place_rate = ""
                review_count = ""
                try:
                    place_rate = store_info.select('.rating.clickArea > .score > em')[0].text
                    review_count = store_info.select('.rating.clickArea > .score > a')[0].text
                except:
                    place_rate = ""
                    review_count = ""
                
                # print(place_rate, review_count)
                
                # 카페 상세페이지 이동
                detail = p.find_element_by_css_selector('div.info_item > div.contact > a.moreview')
                detail.send_keys(Keys.ENTER)

                driver.switch_to.window(driver.window_handles[-1])

                # 가게 URL ID(PK예정)
                place_url = driver.current_url
                place_url = place_url.strip('https://place.map.kakao.com/')
                
                # 가게 사진
                place_photo = ""
                try:
                    photo = driver.find_element_by_css_selector('span.bg_present')
                    photo_url = photo.get_attribute('style')
                    m = re.search('"(.+?)"', photo_url)
                    if m:
                        place_photo = m.group(1)
                    else:
                        place_photo = ""
                except:
                    place_photo = ""
                
                # 가게 홈페이지
                try: 
                    place_homepage = driver.find_element_by_css_selector('div.placeinfo_default.placeinfo_homepage > div.location_detail > div.location_present > a.link_homepage').text
                except:
                    place_homepage = ""
                # 가게 태그
                try: 
                    place_tags = driver.find_element_by_css_selector('div.placeinfo_default > div.location_detail > div.txt_tag > span.tag_g').text
                    place_tags = place_category + place_tags
                except: 
                    place_tags = ""
                    place_tags = place_category + place_tags
                # print(place_tags)
                
                # 가게 영업시간
                flag = False
                try:
                    if driver.find_element_by_css_selector(
                        '#mArticle > div.cont_essential > div.details_placeinfo > div:nth-child(3) > div > div.fold_floor'
                    ):
                        flag = True
                except:
                    pass
                place_hour = ""
                if flag:
                    try:
                        # find elements로 여러개 뽑아와서 반복문 돌리기
                        elements = driver.find_elements_by_css_selector(
                            '#mArticle > div.cont_essential > div.details_placeinfo > div:nth-child(3) > div > div.fold_floor > div'
                        )
                        # print(flag)
                        # print('good')
                        for i in elements:
                            j = i.get_attribute('innerHTML')
                            k = BeautifulSoup(j, "html.parser")
                            a = (k.text).strip('\n')
                            times = a.split('\n')
                        for j in range(len(times)-1):
                            times[j] = times[j].rstrip()
                            if times[j]:
                                place_hour += '&' + times[j]
                        place_hour = place_hour.lstrip('&')

                    except:
                        print('except')

                else:
                    try:
                        element = driver.find_element_by_css_selector(
                            '#mArticle > div.cont_essential > div.details_placeinfo > div:nth-child(3) > div > div > ul')
                        # print(flag)
                        # print(element.text)
                        place_hour = '영업시간&' + element.text
                        # selling_day_dict[mydict].append(element.text)
                        # print(selling_day_dict)
                    except:
                        print('except noflag')
                
                # print('카페이름: ' + place_name)
                
                # 카페 메뉴
                place_menu = ""
                try:
                    if driver.find_element_by_class_name('cont_menu'):
                        # print('있음1')
                        # menu_lists = driver.find_element_by_css_selector('div.cont_menu' > 'ul.list_menu')
                        menu_lists = driver.find_element_by_xpath('//*[@id="mArticle"]/div[3]/ul') 
                        # print(menu_lists)
                        menu_lists = menu_lists.get_attribute('innerHTML')
                        # print(menu_lists)
                        menu_lists = BeautifulSoup(menu_lists, "html.parser")
                        # print(menu_lists)
                        for menu in menu_lists:
                            tmp = menu.text.strip('\n')
                            menu = tmp.split('\n')
                            if len(menu) > 1:
                                if '추천' in menu[1]:
                                    Menu = menu[1].strip('추천')
                                    menu_name = '메뉴 이름: ' + Menu
                                else:
                                    menu_name = '메뉴 이름: ' + menu[1]
                                menu_price = menu[2]
                                place_menu += (menu_name + ' ' + menu_price) + '&'
                        place_menu = place_menu.rstrip('&')

                except:
                    print('없음')

                driver.close()
                driver.switch_to.window(driver.window_handles[0])
                file.write(gu_name + "|" + place_url + "|" + place_name + "|" + place_rate + "|" + review_count + "|" + place_address + "|" + place_hour + "|" + place_tel + "|" + place_homepage + "|" 
                           + place_tags + "|" + place_menu + "|" +  place_photo + "\n")
                file.close()
            print(i, ' of', ' [ ' , Page, ' ] ')
            
        next_btn = driver.find_element_by_id("info.search.page.next")
        has_next = "disabled" not in next_btn.get_attribute("class").split(" ")
        if not has_next:
            print('Arrow is Disabled')
            driver.close()
            file.close()
            break # 다음 페이지 없으니까 종료
        else: # 다음 페이지 있으면
            Page += 1
            next_btn.send_keys(Keys.ENTER)
    print("End of Crawl")