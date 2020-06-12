from django.db import models

# Create your models here.
class Entry(models.Model):
    entry = models.CharField(max_length=200)
    section = models.ForeignKey('sections.Section',on_delete=models.CASCADE, related_name="entries")
    created_at = models.DateTimeField(auto_now_add=True)