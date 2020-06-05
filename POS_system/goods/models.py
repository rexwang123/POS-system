from django.db import models

# Create your models here.
class Goods(models.Model):
    product = models.CharField(max_length=100)
    cost = models.DecimalField(decimal_places=2, max_digits=4)
    selling_price = models.DecimalField(decimal_places=2, max_digits=4)