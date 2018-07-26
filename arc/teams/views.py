from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .serialisers import team_dataSerialiser, user_recordSerialiser
from .models import user_record, team_data
import json
from django.http import JsonResponse, HttpResponse


class teams(APIView):
    def get(self, request):
        teams = team_data.objects.all()
        serializer = team_dataSerialiser(teams, many=True)
        return Response(serializer.data)

    def post(self,request):
        serializer = team_dataSerialiser(data=(request.data))
        if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(request.data, status=status.HTTP_400_BAD_REQUEST)


class user_register(APIView):
    def get(self,request):
        users = user_record.objects.all()
        serializer2 = user_recordSerialiser(users, many=True)
        return Response(serializer2.data)

    def post(self, request):
        serializer2 = user_recordSerialiser(data=(request.data))
        if serializer2.is_valid():
            serializer2.save()
            return Response(serializer2.data, status=status.HTTP_201_CREATED)
        return Response(request.data, status=status.HTTP_400_BAD_REQUEST)


def checkusername(request):
    data = json.loads(request.body)
    data1 = json.dumps(data)
    userr = eval(data1).get('name')
    
    if user_record.objects.filter(tag = userr).exists():
        return HttpResponse(json.dumps({'presence': True}), content_type='application/json')
    else:
        return HttpResponse(json.dumps({'presence'  : False }), content_type='application/json')


def checkteamname(request):
    data = json.loads(request.body)
    data1 = json.dumps(data)
    teamss = eval(data1).get('name')

    if team_data.objects.filter(team_name = teamss).exists():
        return HttpResponse(json.dumps({'presence': True}), content_type='application/json')
    else:
        return HttpResponse(json.dumps({'presence'  : False }), content_type='application/json')



