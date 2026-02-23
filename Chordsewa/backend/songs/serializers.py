from rest_framework import serializers
from .models import Song, Version

class VersionSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  # Shows username

    class Meta:
        model = Version
        fields = ['id', 'song', 'user', 'key', 'chord_text', 'votes', 'created_at']


class SongSerializer(serializers.ModelSerializer):
    versions = VersionSerializer(many=True, read_only=True)  # nested versions

    class Meta:
        model = Song
        fields = ['id', 'title', 'original_key', 'section', 'slot', 'created_at', 'versions']

class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = "__all__"