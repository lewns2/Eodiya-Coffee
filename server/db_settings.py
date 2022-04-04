DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'ssafy_bigdata',
        # 아래는 로컬용 db setting

        # 'USER': 'root',
        # 'PASSWORD': '1234',
        # 'HOST': '127.0.0.1',
        # 'PORT': '3306',

        # 아래는 배포용 db setting
        'USER': 'ssafy',
        'PASSWORD': 'Ssafy203!!',
        'HOST': 'j6e203.p.ssafy.io',
        'PORT': '3636',
    }
}
