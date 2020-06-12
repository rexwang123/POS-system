from django.db import models

# Create your models here.
class Section(models.Model):
    section = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    # id = models.AutoField(primary_key=True)
