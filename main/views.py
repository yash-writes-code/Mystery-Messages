from django.db.models.base import Model as Model
from django.db.models.query import QuerySet
from django.forms import BaseModelForm
from django.http import HttpRequest, HttpResponse
from django.shortcuts import render,redirect
from .models import Message
from django.views.generic import ListView,DetailView,FormView,CreateView
from forms.message_form import Message_Form
from django.urls import reverse_lazy,reverse
from django.contrib.auth.mixins import LoginRequiredMixin
from django.conf import settings

# def show_msgs(request):
#     msgs=Message.objects.all()
#     ctx={"msgs":msgs}
#     return render(request,"main/index.html",ctx)

def index(request):
    return render(request,"main/index.html")

class Home(ListView,LoginRequiredMixin):
    model=Message
    template_name="main/home.html"
    context_object_name="msgs"

    def get_queryset(self):
        return super().get_queryset().filter(to=self.request.user)
    
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect("auth/login/")
        return super().dispatch(request, *args, **kwargs)
    


class Msg(DetailView,LoginRequiredMixin):
    model=Message
    template_name="main/msg.html"
    context_object_name="msg"

    def get_queryset(self):
        return super().get_queryset().filter(to=self.request.user)
    
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect("auth/login/")
        return super().dispatch(request, *args, **kwargs)
    
class Send_Msgs(CreateView):
    form_class = Message_Form  # Correctly reference the form class
    template_name = "main/send_msg.html"
    success_url = reverse_lazy("main:home")
    model = Message
    
    def form_valid(self, form):
        form.instance.to=self.request.user
        print(form.instance.message)
        return super().form_valid(form)
    
    
      