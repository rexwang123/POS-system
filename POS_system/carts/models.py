from django.db import models

# Create your models here.
class Cart(models.Model):
    goods = models.CharField(max_length=100)
    order = models.ForeignKey('orders.Order', on_delete=models.CASCADE, related_name="carts")
    quantity = models.DecimalField(decimal_places=1, max_digits=20)
    cost = models.DecimalField(decimal_places=2, max_digits=20)
    selling_price = models.DecimalField(decimal_places=2, max_digits=20)
    revenue = models.DecimalField(decimal_places=2, max_digits=20)
    date = models.DateField()
    created = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ('created',)

    def __unicode__(self):
        return '%s,%d,%d,%d,%d'%(self.goods,self.quantity,self.cost,self.selling_price,self.revenue)

