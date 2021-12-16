from rest_framework.serializers import ModelSerializer, DateTimeField
from .models import Exercise
from django.contrib.auth import get_user_model


class PatientListSerializer(ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['email', 'id']


class ExerciseSerializer(ModelSerializer):
    date_time_performed = DateTimeField(read_only=True)
    class Meta:
        model = Exercise
        fields = ['id', 'average_score', 'date_time_performed']