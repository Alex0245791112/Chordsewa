from rest_framework import viewsets, permissions
from .models import Song, Version
from .serializers import SongSerializer, VersionSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import HttpResponse

def home(request):
    return HttpResponse("Chordsewa backend is running!")


class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all().order_by('-created_at')
    serializer_class = SongSerializer
    permission_classes = [permissions.AllowAny]

class VersionViewSet(viewsets.ModelViewSet):
    queryset = Version.objects.all().order_by('-created_at')
    serializer_class = VersionSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        # Temporarily assign first user if auth not yet added
        # Later we’ll hook up real user from request.user
        serializer.save(user_id=1)
