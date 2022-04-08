# EODIYA

1. 사용한 JVM, 웹서버, WAS 제품 등의 종류와 설정값, 버전 기재
2. 빌드 시 사용되는 환경 변수 등의 주요 내용 상세 기재
3. 배포 시 특이사항 기재
4. DB 접속 정보 등 프로젝트(ERD)에 활용되는 주요 계정 및 프로퍼티가 정의된 파일 목록

---

### 1. 사용한 JVM, 웹서버, WAS 제품 등의 종류와 설정값, 버전 기재

### IDE

- VSCode

### Frontend

| Name       | Version      |
| ---------- | ------------ |
| React      | 17.0.2       |
| Javascript | ES6이상      |
| redux      | 16.14.0      |
| Nginx      | nginx-1.21.6 |

### Backend

| Name   | Version                 |
| ------ | ----------------------- |
| python | 3.7.9                   |
| MySQL  | 8.0.28-0ubuntu0.20.04.3 |
| Docker | 20.10.12                |
| Django | 3.2.12                  |

### DevOps

- NginX
- Docker

### 협업 툴

- Gitlab
- Notion
- Jira
- Mattermost
- Webex
- Figma
- ERD Cloud

### 2. 빌드 시 사용되는 환경 변수 등의 주요 내용 상세 기재

```python
# /frontend/Dockerfile


FROM node:16 as build-stage

# 도커 컨테이너 내부 작업 디렉터리를 /app으로 지정
WORKDIR /app

# /front 내부 모든 파일을 {container}/app으로 이동
ADD . .

# 옮긴 파일들을 빌드
RUN npm install
RUN npm run build

# Nginx =========================

FROM nginx:stable-alpine as production-stage

# front/nginx/nginx.conf 파일을 도커 컨테이너 내부로 이동
# -> /etc/nginx/conf.d/default.conf로 이동
COPY  ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# /app 은 위에서 지정한 workdir 바로 아래 생긴 파일을 nginx로 웹 서버 구동.
COPY --from=build-stage /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

```

```python
# /frontend/nginx/nginx.conf

# https로 바꿔주는 과정
server {
  listen 80; # 80포트를
  listen [::]:80; # 80포트와 연결

  # server_name 도메인;
  server_name j6e203.p.ssafy.io;

  access_log /var/log/nginx/access.log;
  error_log /var/log/nginx/error.log;

  location / {
    alias /usr/share/nginx/html;
    try_files $uri $uri/ /index.html;
    return 301 https://$server_name$request_uri;
  }
}

# https로 요청이 들어왔을 경우
server {
    listen 443 ssl;
    listen [::]:443 ssl;

    # server_name 도메인;
    server_name j6e203.p.ssafy.io;

    ssl_certificate /var/www/html/fullchain.pem;
    ssl_certificate_key /var/www/html/privkey.pem;

    root /usr/share/nginx/html;
    index index.html;

    # 기본적으로는 요청 그대로 진행
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 약속된 루트인 /api로 요청이 왔을 경우 요청을 보내는 위치를 proxy_pass로 바꿔줌
    location /api {
        proxy_pass http://j6e203.p.ssafy.io:8000;
    }
}

```

```python
# /server/Dockerfile


FROM python:3.9.7

ENV PYTHONUNBUFFERED 1

RUN apt-get -y update
# docker 안에서 vim설치를 안하도록
RUN apt-get -y install vim

# mysql 추가
# RUN apt-get install -y libmysqlclient-dev=5.7.31-0ubuntu0.18.04.1
# RUN pip install mysqlclient

# docker안에서 srv/docker-server 폴더 생성
RUN mkdir /srv/docker-server
# 현재 디렉토리를 통째로 srv/docker-server폴더에 복사
ADD . /srv/docker-server

# 작업 디렉토리 설정
WORKDIR /srv/docker-server

# pip 업그레이드
RUN pip install --upgrade pip
# 필수 패키지 설치
RUN pip install -r requirements.txt
# migrate
RUN python manage.py makemigrations
RUN python manage.py migrate

# 8000번 포트를 사용하라
EXPOSE 8000

# 장고 실행 명령어. 0.0.0.0:8000은 모든 호스트에서 8000번 포트로 오는 요청은 모두 받아준다는 뜻
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

### 3. 배포 시 특이사항 기재

```markdown
현재는 백엔드와 프론트엔드 도커 이미지를 따로 관리하고있으므로
server/
frontend/
두 위치에서 따로 빌드-푸쉬 후 EC2에서 풀-런 해줘야 함.

빌드방법:
Dockerfile과 같은 위치에서

로컬 터미널//

1.  docker build -t (dockerhub명)/(사용할이미지명):(사용할버전태그)

이미지 명과 버전 태그는 항상 임의로 설정하면 된다. 편의성을 위해 이미지명은 그대로 두고, 버전 태그만 바꾸는 것을 추천한다.
태그를 항상 바꿔주는 것이 귀찮다면 latest를 활용해도 된다.

2.  docker push (dockerhub명)/(사용할이미지명):(사용할버전태그)

여기서 이미지 명과 버전 태그는 위에서 빌드한 그대로 사용해야 한다. 아니면 다른 이미지가 올라갈 수 있다.

EC2 환경 3.
sudo docker pull (dockerhub명)/(사용할이미지명):(사용할버전태그)

4.  (프론트엔드 이미지 런)
    sudo docker run -d --rm -p 80:80 -p 443:443 -v /home/ubuntu/docker-volume/ssl:/var/www/html (dockerhub명)/(사용할이미지명):(사용할버전태그)
    (백엔드 이미지 런)
    sudo docker run -d --rm -p 8000:8000 (dockerhub명)/(사용할이미지명):(사용할버전태그)

프론트 엔드는 nginx도 함께 사용하기 때문에 볼륨을 설정해줘야 하는데, ssl 보안 관련 설정은 되어있으니 걱정말자!
```

### 4. DB 접속 정보 등 프로젝트(ERD)에 활용되는 주요 계정 및 프로퍼티가 정의된 파일 목록

- 접속 정보

![화면 캡처 2022-04-07 234003](C:\Users\SSAFY\Desktop\S06P22E203\exec\Docs\화면 캡처 2022-04-07 234003.png)

- erd

![화면 캡처 2022-04-07 234533](C:\Users\SSAFY\Desktop\S06P22E203\exec\Docs\화면 캡처 2022-04-07 234533.png)
