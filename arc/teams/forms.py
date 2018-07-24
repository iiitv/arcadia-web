from django import forms
from . import models

class user(forms.ModelForm):
    class Meta:
        model=models.user_record
        fields=('name','tag')
