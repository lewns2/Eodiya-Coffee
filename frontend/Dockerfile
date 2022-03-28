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
