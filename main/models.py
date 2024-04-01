from django.db import models
from django.contrib.auth.models import User

class Message(models.Model):
    message=models.TextField(max_length=300)
    nickname=models.CharField(max_length=50,default="Anonymous")
    is_read=models.BooleanField(default=False)
    date_time=models.DateTimeField((""), auto_now_add=True)
    to=models.ForeignKey(User,on_delete=models.CASCADE,null=True)
