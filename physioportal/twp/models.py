from django.db import models
from django.conf import settings


class TwoWayPermission(models.Model):

    STATUS_CHOICES = [('DENIED', 'DENIED'), ('PENDING', 'PENDING'), ('ALLOWED', 'ALLOWED')]

    doctor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='twp_doctor')
    patient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='twp_patient')
    status = models.CharField(choices=STATUS_CHOICES, max_length=10, default='PENDING')