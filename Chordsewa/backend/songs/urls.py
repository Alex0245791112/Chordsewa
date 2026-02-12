from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SongViewSet, VersionViewSet

router = DefaultRouter()
router.register(r'songs', SongViewSet)
router.register(r'versions', VersionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
