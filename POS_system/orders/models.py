from django.db import models

# Create your models here.
class Order(models.Model):
    status = models.CharField(max_length = 20)
    customer = models.ForeignKey('customers.Customer', on_delete=models.CASCADE, related_name="orders")
    delivery_fee = models.DecimalField(decimal_places=2, max_digits=20)
    created_at = models.DateTimeField(auto_now_add=True)
    date = models.DateField()
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zipcode = models.PositiveIntegerField()
    orderId = models.CharField(max_length=100, primary_key=True)
    total_quantity = models.DecimalField(decimal_places=2, max_digits=20)
    total_cost = models.DecimalField(decimal_places=2, max_digits=20)
    total_price = models.DecimalField(decimal_places=2, max_digits=20)
    total_revenue = models.DecimalField(decimal_places=2, max_digits=20)

    class Meta:
        ordering = ('-created_at',)