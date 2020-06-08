from django.db import models

# Create your models here.
class Customer(models.Model):
    lastName = models.CharField(max_length=100)
    firstName = models.CharField(max_length=100)
    email = models.EmailField(max_length=500,unique=True,primary_key=True)
    number = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
