from rest_framework import fields
from rest_framework.serializers import Serializer, EmailField, ModelSerializer
from .models import TwoWayPermission
from django.contrib.auth import get_user_model


class TwoWayPermissionCreateSerializer(Serializer):
    patient = EmailField()

    def create(self, validated_data):
        auth_models = get_user_model()
        doctor_instance = auth_models.objects.get(email=validated_data.get('doctor'))
        patient_instance = auth_models.objects.get(email=validated_data.get('patient'))
        print(doctor_instance, patient_instance)
        print(type(doctor_instance), type(patient_instance))
        return TwoWayPermission.objects.create(doctor_id=doctor_instance.id, patient_id=patient_instance.id)


class TwoWayPermissionUpdateSerializer(ModelSerializer):
    class Meta:
        model = TwoWayPermission
        fields = ['status']


class TwoWayPermissionDefaultSerializer(ModelSerializer):
    doctor_email = EmailField(source='doctor.email')
    class Meta:
        model = TwoWayPermission
        fields = ['id', 'doctor_email', 'patient', 'status']