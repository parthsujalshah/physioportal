from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TwoWayPermissionViewset

router = DefaultRouter()
router.register('', TwoWayPermissionViewset)

urlpatterns = [
    path('', include(router.urls))
]