from django import forms
from main.models import Message

class Message_Form(forms.ModelForm):
    class Meta:
        model=Message
        fields=["nickname","message"]

        widgets={
            "nickname":forms.TextInput(),
            "message":forms.Textarea(
                {"rows":"2"}
            )
        }
