from django.db import models
from django.db.models import Q
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

from django.contrib.auth.models import User



# Create your models here.

class user_record(models.Model):
    name = models.CharField(max_length=100, default = 'user')
    tag = models.CharField(max_length=300, default = 'usertag')
    def __str__(self):
        return self.tag


class team_data(models.Model):
    team_name = models.CharField(max_length=100)
    leader  = models.CharField(max_length=100)
    member = models.CharField(max_length=100)
    membertag = models.CharField(max_length=100)
    member2 = models.CharField(max_length=100)
    member2tag = models.CharField(max_length=100)
    member3 = models.CharField(max_length=100)
    member3tag = models.CharField(max_length=100)
    member4 = models.CharField(max_length=100)
    member4tag = models.CharField(max_length=100)
    member5 = models.CharField(max_length=100)
    member5tag = models.CharField(max_length=100)
    #games_played=models.IntegerField()
    #games_won=models.IntegerField()


    def __str__(self):
        return self.team_name
