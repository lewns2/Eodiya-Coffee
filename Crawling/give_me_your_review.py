import sys
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

gu_list = ['종로구']
for gu_name in gu_list:

    sys.stdin = open(gu_name + 'cafe.csv', 'r', encoding='utf-8')

    # 새 파일
    filename = gu_name + 'review.csv'
    review_file = open(filename, "w", encoding="utf-8")
    review_file.write("URL_ID" + "|" + "카페명" + "|" +
                      "리뷰" + "\n")  # 처음에 csv파일에 칼럼명 만들어주기
    review_file.close()

    # 구글드라이버 실행
    options = webdriver.ChromeOptions()
    options.add_experimental_option(
        "excludeSwitches", ["enable-logging"])  # 오류 제거
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36") 
    # driver = webdriver.Chrome(service=Service(
    #     ChromeDriverManager().install()), options=options)
    driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
    # driver.maximize_window()

    # 카카오맵 이동
    # url = "https://map.kakao.com/"
    # driver.get(url)
    # driver.implicitly_wait(3)

    url_list = []

    while True:
        # print(sys.stdin.readline().split("|"))
        url_id = sys.stdin.readline().split("|")
        # print(url_id)
        if len(url_id) > 1:
            url_list.append(url_id[1])
        if url_id[0] == '':
            break
        # url_list.append(url_id)
        # print(url_id)

    cafe_list = url_list[1:]

    cnt = 0
    for url_ele in cafe_list:
        review_comment = ""
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
        # driver.execute_script("arguments[0].click();", detail_page)
        time.sleep(1)
        url = "https://place.map.kakao.com/" + url_ele
        driver.get(url)
        driver.implicitly_wait(3)
        # detail_url = driver.current_url
        # detail_url = detail_url.replace("https://place.map.kakao.com/", "")
        # driver.switch_to.window(driver.window_handles[-1])
        html = driver.page_source
        soup = BeautifulSoup(html, "lxml")
        # print(soup)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "tit_location")))
        # print('ok')
        # cafe_name = soup.find(attrs={"class": "tit_location"}).get_text()
        cafe_name = driver.find_elements_by_css_selector(
            "#mArticle > div.cont_essential > div:nth-child(1) > div.place_details > div > h2")[0].text
        # print(type(cafe_name))
        # print(cafe_name[0].text)

        review_page = 0
        review_page_first = True
        while True:
            #   #mArticle > div.cont_evaluation > div.evaluation_review > ul > li:nth-child(1)
            #   #mArticle > div.cont_evaluation > div.evaluation_review > ul > li:nth-child(1) > div.comment_info > p > span
            # mArticle > div.cont_evaluation > div.evaluation_review > ul > li:nth-child(2) > div.comment_info > p > span
            # mArticle > div.cont_evaluation > div.evaluation_review > ul > li:nth-child(1) > div.comment_info > p > span
            try:
                # print(driver.find_element_by_css_selector(
                #     '#mArticle > div.cont_evaluation > div.evaluation_review > ul > li:nth-child(1) > div.comment_info > p > span').text)
                # print(driver.find_element_by_css_selector(
                #     '#mArticle > div.cont_evaluation > div.evaluation_review > ul > li:nth-child(2) > div.comment_info > p > span').text)
                # print(driver.find_element_by_css_selector(
                #     '#mArticle > div.cont_evaluation > div.evaluation_review > ul > li:nth-child(3) > div.comment_info > p > span').text)
                # print(driver.find_element_by_css_selector(
                #     '#mArticle > div.cont_evaluation > div.evaluation_review > ul > li:nth-child(4) > div.comment_info > p > span').text)
                # print(driver.find_element_by_css_selector(
                #     '#mArticle > div.cont_evaluation > div.evaluation_review > ul > li:nth-child(5) > div.comment_info > p > span').text)
                review_comment += "$$" + (driver.find_element_by_css_selector(
                    '#mArticle > div.cont_evaluation > div.evaluation_review > ul > li:nth-child(1) > div.comment_info > p > span').text)
                review_comment += "$$" + (driver.find_element_by_css_selector(
                    '#mArticle > div.cont_evaluation > div.evaluation_review > ul > li:nth-child(2) > div.comment_info > p > span').text)
                review_comment += "$$" + (driver.find_element_by_css_selector(
                    '#mArticle > div.cont_evaluation > div.evaluation_review > ul > li:nth-child(3) > div.comment_info > p > span').text)
                review_comment += "$$" + (driver.find_element_by_css_selector(
                    '#mArticle > div.cont_evaluation > div.evaluation_review > ul > li:nth-child(4) > div.comment_info > p > span').text)
                review_comment += "$$" + (driver.find_element_by_css_selector(
                    '#mArticle > div.cont_evaluation > div.evaluation_review > ul > li:nth-child(5) > div.comment_info > p > span').text)
            except:
                pass

            # com = driver.find_elements_by_css_selector(
            #     '#mArticle > div.cont_evaluation > div.evaluation_review > ul'
            # )
            # print(len(com))
            # # for i in com:
            # #     # print('start')
            # #     print(i.find_element_by_css_selector(
            # #         'li:nth-child(1) > div.comment_info > p > span').text)
            # WebDriverWait(driver, 10).until(
            #     EC.presence_of_element_located((By.CLASS_NAME, "txt_comment")))
            # reviews_content = soup.find_all(attrs={"class": "txt_comment"})
            # for review_content in reviews_content:
            #     review_content = review_content.get_text()[:-3]  # 뒤에 더보기 삭제
            #     # print(review_content)
            #     # 리뷰 내용 없을경우 continue
            #     if review_content == "":
            #         continue
            #     review_comment += "$$" + review_content
            review_page += 1
            if not review_page_first and review_page == 7:
                review_page = 2
            if review_page_first and review_page == 6:
                review_page = 2
                review_page_first = False
            try:
                move_review_page = driver.find_element(
                    By.XPATH, '//*[@id="mArticle"]/div[6]/div[3]/div/a[{}]'.format(review_page))
                # driver.execute_script("arguments[0].click();", move_review_page)
                move_review_page.click()
                time.sleep(0.1)  # 데이터 중복되면 시간늘리기
                driver.switch_to.window(driver.window_handles[-1])
                html = driver.page_source
                soup = BeautifulSoup(html, "lxml")
                # WebDriverWait(driver, 10).until(
                #     EC.presence_of_element_located((By.CLASS_NAME, "txt_comment")))
            except:
                print("진행한", gu_name, "카페 갯수 :", cnt + 1)
                cnt += 1
                # print('except')
                break
        # print(review_list)
        review_file = open(filename, "a", encoding="utf-8")
        review_file.write(url_ele + "|" + cafe_name + "|" +
                          review_comment + "\n")
        review_file.close()
        # driver.switch_to.window(driver.window_handles[0])
        time.sleep(0.2)
