from django.db import models

# Create your models here.
class Order(models.Model):
    STATUS = (
        ("P", "PAID"),
        ("NP", "NOT PAID"),
        ("TD", "TO BE DELIVERED")
    )
    status = models.CharField(choices=STATUS, max_length = 2)
    customer = models.ForeignKey('customer.Customer', on_delete=models.CASCADE)
    delivery_Fee = models.DecimalField(decimal_places=2, max_digits=4)
    created_at = models.DateTimeField(auto_now_add=True)

    #orderID = time + phone number + random number , which is unique
    orderID = models.CharField(max_length=100)