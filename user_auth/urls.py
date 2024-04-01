from django.urls import path
from .views import *

app_name="user_auth"

urlpatterns=[
    path("signup/",SignUp.as_view(),name="signup"),
    # path("login/",Login.as_view(),name="login")
]