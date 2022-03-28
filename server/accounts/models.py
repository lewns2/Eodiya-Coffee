from tkinter import CASCADE
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.


class User(AbstractUser):
    # user_email = models.CharField(max_length=128)
    # user_nickname = models.CharField(max_length=64)
    # password = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    birthday = models.CharField(max_length=32)
    gender = models.CharField(max_length=16)

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['username']


class UserLog(models.Model):
    user_log_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    gu = models.CharField(max_length=16)
    dong = models.CharField(max_length=32)
    theme = models.CharField(max_length=62)
    keywords = models.CharField(max_length=255)
    log_time = models.DateTimeField(auto_now_add=True)
