from django.http import HttpRequest, HttpResponse
from django.shortcuts import render,redirect
from django.urls import reverse,reverse_lazy
# from django.contrib.auth.views import LoginView
from django.views.generic import CreateView
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.contrib.auth.views import LoginView
# Create your views here.

class SignUp(CreateView):
    
    form_class=UserCreationForm
    success_url=reverse_lazy("main:home")
    template_name="registration/signup.html"
    model = User
    
    def get(self, request: HttpRequest, *args: str, **kwargs) -> HttpResponse:
        if(self.request.user.is_authenticated):
            return redirect(reverse("main:home"))
        
        return super().get(request, *args, **kwargs)    

    
class Login(LoginView):
    def get(self, request: HttpRequest, *args: str, **kwargs) -> HttpResponse:
        if(self.request.user.is_authenticated):
            return redirect(reverse("main:home"))
        
        return super().get(request, *args, **kwargs) 