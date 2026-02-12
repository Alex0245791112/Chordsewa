from django.db import models
from django.contrib.auth.models import User

class Song(models.Model):
    SECTION_CHOICES = [
        ("bhajan", "Bhajan"),
        ("chorus", "Chorus"),
        ("baal_chorus", "Baal Chorus"),
        ("other", "Other"),
    ]

    title = models.CharField(max_length=255)
    original_key = models.CharField(max_length=5, blank=True, null=True)
    section = models.CharField(max_length=20, choices=SECTION_CHOICES, default="other")  # NEW
    slot = models.IntegerField(blank=True, null=True)  # optional, for Bhajans/Chorus/Baal
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.section in ["bhajan", "chorus", "baal_chorus"] and self.slot:
            return f"{self.title} (Slot {self.slot})"
        return self.title


class Version(models.Model):
    song = models.ForeignKey(Song, on_delete=models.CASCADE, related_name="versions")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    key = models.CharField(max_length=5, blank=True, null=True)
    chord_text = models.TextField()
    votes = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.song.title} by {self.user.username}"
