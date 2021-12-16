from django.urls import path, include
from rest_framework import urlpatterns
from .views import DoctorPatientListView, PatientExerciseCreateViewset, PatientExerciseListViewset
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('doctor-patient-list', DoctorPatientListView)
router.register('doctor-patient-exercise-create', PatientExerciseCreateViewset)

urlpatterns = [
    path('', include(router.urls)),
    path('doctor-patient-exercise-list/<int:pk>/', PatientExerciseListViewset.as_view()),
]