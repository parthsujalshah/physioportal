from django.db import models
from django.conf import settings


class Exercise(models.Model):
    patient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='exercises_performed')
    date_time_performed = models.DateTimeField(auto_now_add=True)
    average_score = models.DecimalField(max_digits=10, decimal_places=3)