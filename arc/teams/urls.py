from django.conf.urls import url
from .views import teams, checkusername, checkteamname
from .views import user_register
from rest_framework.urlpatterns import format_suffix_patterns
urlpatterns = [
    
    url(r'register/$', user_register.as_view(), name = 'register'), #url for user registration
    url(r'checkusername/$', checkusername, name = 'checkusername'), #checks that the game tag is available or not
    url(r'showteams/$', teams.as_view() , name = 'showteams'), # on post request a team registered and and it all the on get req
    url(r'checkteamname/$', checkteamname, name = 'checkteamname'), #checks that the team name is available or not
    url(r'showusers/$', user_register.as_view(), name = 'showusers') #returns all the current users with their taga

]


urlpatterns = format_suffix_patterns(urlpatterns)
