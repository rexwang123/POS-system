from django.db import models

# Create your models here.
class Goods(models.Model):
    goods = models.CharField(max_length=100, unique=True, primary_key=True)
    cost = models.DecimalField(decimal_places=2, max_digits=20)
    selling_price = models.DecimalField(decimal_places=2, max_digits=20)
    