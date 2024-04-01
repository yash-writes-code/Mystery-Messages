from django.urls import path,include
from .views import *

app_name="main"

urlpatterns = [
    path("index/",index,name="index"),
    path("",Home.as_view(),name="home"),
    path("<int:pk>/",Msg.as_view(),name="message_details"),
    path("send_msg/<int:pk>",Send_Msgs.as_view(),name="send_msgs")
]