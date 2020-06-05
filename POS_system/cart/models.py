from django.db import models

# Create your models here.
class Cart(models.Model):
    item = models.OneToOneField('Goods.goods', on_delete=models.CASCADE)
    order = models.ForeignKey('order.Order', on_delete=models.CASCADE)
    quantity = models.DecimalField(decimal_places=1, max_digits=4)