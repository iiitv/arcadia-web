from rest_framework import serializers

from .models import team_data, user_record

class team_dataSerialiser(serializers.ModelSerializer):
    class Meta:
        model  = team_data
        fields = '__all__'

class user_recordSerialiser(serializers.ModelSerializer):
    class Meta:
        model  = user_record
        fields = '__all__'

