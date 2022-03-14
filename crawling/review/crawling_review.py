import requests
import re
import csv
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# 서울 특별시 구 리스트
gu_list = ['마포구','서대문구','은평구','종로구','중구','용산구','성동구','광진구',
           '동대문구','성북구','강북구','도봉구','노원구','중랑구','강동구','송파구',
           '강남구','서초구','관악구','동작구','영등포구','금천구','구로구','양천구','강서구']

# 파일 만들기
filename = "review.csv"
f = open(filename, "w", encoding="utf-8-sig", newline="")
writer = csv.writer(f)


# 구글드라이버 실행
options = webdriver.ChromeOptions() 
options.add_experimental_option("excludeSwitches", ["enable-logging"]) # 오류 제거
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
driver.maximize_window()

# 카카오맵 이동
url = "https://map.kakao.com/"
driver.get(url)
driver.implicitly_wait(3)

# 크롤링
for idx, gu_name in enumerate(gu_list):
    cafe_cnt = 1
    print(gu_name + "시작")
    search_area = driver.find_element(By.NAME, "q")
    search_area.clear()
    search_area.send_keys(gu_name + "카페")
    search_area.send_keys(Keys.ENTER)
    #
    more_page = driver.find_element_by_xpath('//*[@id="info.search.place.more"]')
    driver.execute_script("arguments[0].click();", more_page) # 클릭 호환성 에러 발생할 경우 스크립트로 클릭 설정
    
    page = 0
    while True:
        page += 1
        if page == 6: page = 1
        if page != 1:
            move_page = driver.find_element(By.ID, 'info.search.page.no{}'.format(page))
            if move_page.get_attribute("class") == "INACTIVE HIDDEN":
                print(gu_name + "끝")
                driver.get(url)
                break
            driver.execute_script("arguments[0].click();", move_page)
            print("다음페이지")
            time.sleep(0.5)
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "moreview")))
        detail_pages = driver.find_elements(By.CLASS_NAME, "moreview")

        for detail_page in detail_pages:
            # # 1 (error : requests.get 파싱에러?)
            # driver.execute_script("arguments[0].click();", detail_page)
            # detail_page.send_keys(Keys.ENTER)
            # detail_url = detail_page.get_attribute('href')
            # headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"}
            # res = requests.get(detail_url, headers=headers)
            # res.raise_for_status()
            # soup = BeautifulSoup(res.text, "lxml")
            
            # # 2
            # # requests.get()대신 page_source
            driver.execute_script("arguments[0].click();", detail_page)
            time.sleep(1)
            driver.switch_to.window(driver.window_handles[-1])
            detail_url = driver.current_url
            detail_url = detail_url.replace("https://place.map.kakao.com/", "")
            html = driver.page_source
            soup = BeautifulSoup(html, "lxml")
            WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "tit_location")))
            cafe_name = soup.find(attrs={"class":"tit_location"}).get_text()
            review_list = []
            review_page = 0
            review_page_first = True
            while True:
                reviews_content = soup.find_all(attrs={"class":"txt_comment"})
                for review_content in reviews_content:
                    review_content = review_content.get_text()[:-3] # 뒤에 더보기 삭제
                    # print(review_content)
                    # 리뷰 내용 없을경우 continue
                    if review_content == "": continue
                    review_list.append(review_content)
                review_page += 1
                if not review_page_first and review_page == 7:
                    review_page = 2
                if review_page_first and review_page == 6:
                    review_page = 2
                    review_page_first = False
                try:
                    move_review_page = driver.find_element(By.XPATH, '//*[@id="mArticle"]/div[6]/div[3]/div/a[{}]'.format(review_page))
                    # driver.execute_script("arguments[0].click();", move_review_page)
                    move_review_page.click()
                    time.sleep(0.1) ################################################## 데이터 중복되면 시간늘리기
                    driver.switch_to.window(driver.window_handles[-1])
                    html = driver.page_source
                    soup = BeautifulSoup(html, "lxml")
                    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "txt_comment")))
                except:
                    print("진행한", gu_name, "카페 갯수 :", cafe_cnt)
                    cafe_cnt += 1
                    break
            # print(review_list)
            writer.writerow([detail_url, cafe_name, review_list])
            driver.close()
            driver.switch_to.window(driver.window_handles[0])
            time.sleep(1)