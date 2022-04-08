# <img src="README.assets/EodiyaLogo.jpg" width="50" height="50">**부울경 2반 E203 - 빅데이터 추천**

## **프로젝트 기획 📃**

---

### **1. 프로젝트 주제**

- 카페 창업 장소 추천 시스템
- 작업 기간: 2022.02.28 ~ 2022.04.08

### **2. 기획 배경**

- **2019년에 비해 2021년에 창업한 점포들 중 제과점을 포함한 카페의 비중이 두 배 이상 늘어나고 있다.**
  - 8일 국세청 사업자 통계를 통해 업종별 외식사업체 현황을 전수 분석한 결과 지난 1월 기준 전국 커피음료점은 7만1906곳으로 전년 동기 대비 15.5% 불어났다.
- **늘어난 카페는 많으나 페업하는 곳 또한 많아지고 있다.**
  - KB금융 지주 경영 연구소가 최근 내놓은 ‘커피전문점 현황 및 시장 여건 분석’ 보고서에 따르면 카페의 연간 폐업률(그해 폐업한 매장 수/전년도 총 매장 수×100)은 2018년 기준 14.1%로 치킨집(10.0%)보다 높다. 2013년 11.0%에서 더 높아졌다. 2018년 폐업한 카페의 절반 이상(52.6%)이 영업 기간 3년 미만인 신생 업체들이었다.
  - 출처 : 시사저널(http://www.sisajournal.com)
- **창업을 성공으로 이끌 수 있느냐 없느냐를 결정하는 요소 가운데 60~70%를 차지하는 것이 점포의 위치이다.**

**⇒ 창업하기 좋은 상권을 추천해 카페 창업이 성공할 수 있도록 기여하는 것을 목표로 한다.**

### **3. 주요 서비스**

- 카페 창업을 위한 주변 상권 분석 정보 제공
  - 매출 지표, 주요 고객 층, 개・폐업 점포 수, 생활 인구, 주변 시설 정보
  - 시장성, 성장성, 안전성 높은 상권 순위
- 현재 영업 중인 카페 정보 제공
- 해당 위치의 테마 별 추천 정보를 제공
- 분석 내용을 알아 보기 쉽게 지도와 차트를 통해 정보 제공

### 4**. 서비스 장점**

- 카페를 새로 개업을 고민하는 사용자에게 카페 사업의 전망 등 정보를 제공해 줄 수 있다.
- 개업을 하려는 사용자에게 좋은 개업 장소에 대한 다양한 정보를 제공해 줄 수 있다.
- 자신이 개업하고 싶은 위치의 주변의 정보를 제공할 수 있다.
- 적절한 카페 위치 추천을 통해 자영업자가 만족할 수 있다.
- 많은 사용자들이 찜한 장소는 성공할 확률이 높다는 신뢰성을 가질 수 있다.

### 5**. 추천 방식**

- 시장성, 성장성, 안정성 기준으로 추천
- 테마(카페 종류)별 상권 추천 ex) 커피전문점, 디저트카페, 브런치카페, 스터디카페 ...
- 검색한 동과 비슷한 동을 추천(매출, 매출 주 연령대, 주 시간대를 고려)

## ERD\***\*✏️\*\***

![ERD](README.assets/ERD.png)

## **기술스택 📖**

---

### **FrontEnd : <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">(17.0.2)**

### **Backend :<img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=Django&logoColor=white">(3.2.12)**

### **DB : <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">(8.0.28-0ubuntu0.20.04.3)**

### **CI/CD : <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white">(20.10.12)**

### **Language: <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white">(3.7.9) <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">(ES6이상)**

### **기타: <img src="https://img.shields.io/badge/GitLab-FCA121?style=for-the-badge&logo=GitLab&logoColor=white"> <img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white"> <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">**

## Data 📖

```jsx
서울시 공공 데이터 사용, 카카오맵 카페 검색 결과 스크래핑을 통해서 데이터 수집

# 구글드라이버 실행
# 카카오맵 이동
# 스크래핑
```

## 아키텍처 🔨

---

![프로젝트아키텍처.jpg](README.assets/프로젝트아키텍처.jpg)

### [Backend]

- AWS :EC2 서비스를 사용하여 Ubuntu 서버 구축
- Nginx : 웹 서버 구축
- Django : 웹 프레임워크
- MySql : 서비스에 필요한 데이터를 저장

### [Frontend]

- React: 사용자 인터페이스를 위해 사용
- Redux: 데이터 상태 관리
- Kakao Map API : 지도를 이용한 서비스를 제공
- Material-UI: UI 프레임워크
- ApexCharts: 차트를 사용하기 위한 라이브러리

### [협업]

- GitLab : Git Flow에 따른 프로젝트 관리
- Jira : 매주 진행할 사항을 이슈로 등록하고 스토리 포인트 지정
- Notion: 협업에 필요한 문서 및 산출물 공유

## **UI 💻**

---

### 메인페이지

![메인페이지gif](README.assets/메인페이지gif.gif)

- [메인페이지] : 프로젝트 소개

### 상권분석

![상권분석gif](README.assets/상권분석gif.gif)

- [상권분석] : 사용자가 원하는 상권의 위치를 선택할 수 있다.
- [분석하기 버튼 클릭 시] : 사용자가 검색하는 동에 대한 정보 및 분석 결과를 시각화하여 보여준다.

### 카페현황

![카페현황gif](README.assets/카페현황gif.gif)

- [카페현황] : 사용자가 원하는 지역을 선택할 수 있다.
- [카페 태그 클릭 시] : 카페 데이터를 태그 별로 분류하여 선택한 지역과 카테고리에 해당하는 카페를 보여준다.

### 테마분석

![테마분석gif](README.assets/테마분석gif.gif)

- [테마분석] : 사용자가 원하는 카페 창업 테마와 위치를 선택할 수 있다.
- [분석하기 클릭 시] : 사용자가 원하는 카페 창업 테마와 위치에 따라 자체 추천 알고리즘을 통해 상위 상권을 표시한다.

### 지도

![지도gif](README.assets/지도gif.gif)

- [지도] : 사용자가 선택한 위치를 알아보기 쉽게 지도를 이용하여 표시해준다.

## 프로젝트 실행\***\*🏃\*\***

---

### Git Clone

```bash
$ git clone https://lab.ssafy.com/s06-bigdata-rec-sub2/S06P22E203.git
```

### Data

```bash
1. mysql와 연동
python manage.py makemigrations
python manage.py migrate

2. DB에 데이터 저장
python bulk.py
```

### DB

```bash
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'ssafy_bigdata',
        'USER': 'ssafy',
        'PASSWORD': {DB계정비밀번호},
        'HOST': 'j6e203.p.ssafy.io',
        'PORT': '3636',
    }
}
```

### Backend

```bash
cd server
pip install -r requirements.txt
python manage.py runserver
```

### FrontEnd

```bash
cd frontend
npm i
npm start
```

## 팀원 소개**🧑‍🤝‍🧑**

---

- **Backend: 박진성, 조영현, 최명재**
- **Frontend: 김동현, 김윤지, 정인수**

---

## [**산출물**](https://www.notion.so/f1c100ef8fda4a65bc3c87e2ed071b64)
