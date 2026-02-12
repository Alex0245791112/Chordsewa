from django.contrib import admin
from .models import Song, Version

@admin.register(Song)
class SongAdmin(admin.ModelAdmin):
    list_display = ("title", "section", "slot", "original_key")
    list_filter = ("section",)
    search_fields = ("title",)


@admin.register(Version)
class VersionAdmin(admin.ModelAdmin):
    list_display = ("song", "user", "key", "votes")
    list_filter = ("song", "user")
