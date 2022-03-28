# /docker-server/mysite/Dockerfile
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

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]