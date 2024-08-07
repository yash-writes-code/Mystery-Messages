from django.db.models.base import Model as Model
from django.shortcuts import render,redirect
from .models import Message
from django.views.generic import ListView,DetailView,FormView,CreateView
from forms.message_form import Message_Form
from django.urls import reverse_lazy,reverse
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.contrib import messages


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
            return redirect(reverse("user_auth:login"))
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
    model = Message
    
    def form_valid(self, form):
        form.instance.to = get_object_or_404(User, id=self.kwargs.get('pk'))
        messages.success(self.request, 'Message Sent')
        return super().form_valid(form)
    
    def get_success_url(self):
        # Return the URL of the current page
        id=self.kwargs.get('pk')
        return reverse_lazy('main:send_msgs',kwargs={"pk":id})
    
    
      