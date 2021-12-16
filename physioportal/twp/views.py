from django.db.models.base import Model
from rest_framework.decorators import permission_classes
from rest_framework.viewsets import ModelViewSet
from .models import TwoWayPermission
from .serializers import TwoWayPermissionCreateSerializer, TwoWayPermissionUpdateSerializer, TwoWayPermissionDefaultSerializer
from rest_framework.permissions import IsAuthenticated


class TwoWayPermissionViewset(ModelViewSet):
    queryset = TwoWayPermission.objects.all()
    serializer_action_classes = [TwoWayPermissionCreateSerializer, TwoWayPermissionUpdateSerializer, TwoWayPermissionDefaultSerializer]
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'create':
            return self.serializer_action_classes[0]
        elif self.action == 'patch':
            return self.serializer_action_classes[1]
        return self.serializer_action_classes[2]

    def get_queryset(self):
        return self.request.user.twp_patient.filter(status='PENDING')

    def perform_create(self, serializer):
        return serializer.save(doctor=self.request.user)
