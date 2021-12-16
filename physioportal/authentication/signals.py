from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import PatientProfile


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_related_profile(sender, instance, created, *args, **kwargs):
    if created:
        if instance.userType == 'PATIENT':
            instance.buyerProfile = PatientProfile.objects.create(user=instance)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def save_related_profile(sender, instance, *args, **kwargs):
    if instance.userType == 'PATIENT':
        instance.patientProfile.save()
