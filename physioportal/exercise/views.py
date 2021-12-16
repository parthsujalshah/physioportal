from django.contrib.auth import get_user_model
from rest_framework.decorators import permission_classes
from rest_framework.viewsets import ModelViewSet
from .models import Exercise
from .serializers import PatientListSerializer, ExerciseSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView, RetrieveAPIView


class DoctorPatientListView(ModelViewSet):
    serializer_class = PatientListSerializer
    perission_classes = [IsAuthenticated]
    queryset = get_user_model().objects.all()

    def get_queryset(self):
        l = []
        for twp in self.request.user.twp_doctor.filter(status='ALLOWED'):
            l.append(twp.patient)
        return l

class PatientExerciseCreateViewset(ModelViewSet):
    serializer_class = ExerciseSerializer
    permission_classes = [IsAuthenticated]
    queryset = Exercise.objects.all()

    def perform_create(self, serializer):
        return serializer.save(patient=self.request.user)


class PatientExerciseListViewset(ListAPIView):
    serializer_class = ExerciseSerializer
    permission_classes = [IsAuthenticated]
    queryset = Exercise.objects.all()

    def get_queryset(self):
        instance = get_user_model()
        return instance.objects.get(pk=self.kwargs['pk']).exercises_performed.all()
