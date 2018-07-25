from django.conf.urls import url
from .views import teams, randomresponse, user_register, checkusername, checkteamname
#from .views import user_register, checkusername, team_register, teams, example
from rest_framework.urlpatterns import format_suffix_patterns
urlpatterns = [

    url(r'register/$', user_register.as_view(), name = 'register'),
   url(r'team_register/$', teams.as_view() , name = 'tregister'),
    url(r'checkusername/$', checkusername, name = 'checkusername'),
     url(r'showteams/$', teams.as_view() , name = 'showteams'),
    url(r'checkteamname/$', checkteamname, name = 'checkteamname'),
    url(r'showusers/$', user_register.as_view(), name = 'showusers')

]


urlpatterns = format_suffix_patterns(urlpatterns)
