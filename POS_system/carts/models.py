from django.db import models

# Create your models here.
class Cart(models.Model):
    goods = models.ManyToManyField('goods.Goods')
    order = models.OneToOneField('orders.Order', on_delete=models.CASCADE)
    quantity = models.DecimalField(decimal_places=1, max_digits=4)