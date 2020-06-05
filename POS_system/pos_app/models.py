from django.db import models

# Create your models here.
class Customer(models.Model):
    lastName = models.CharField(max_length=100)
    firstName = models.CharField(max_length=100)
    email = models.EmailField(max_length=500,unique=True)
    number = models.PositiveIntegerField()
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

class Order(models.Model):
    STATUS = (
        ("P", "PAID"),
        ("NP", "NOT PAID"),
        ("TD", "TO BE DELIVERED")
    )
    status = models.CharField(choices=STATUS, max_length = 2)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    delivery_Fee = models.DecimalField(decimal_places=2, max_digits=4)
    created_at = models.DateTimeField(auto_now_add=True)

    #orderID = time + phone number + random number , which is unique
    orderID = models.CharField(max_length=100)
    
class Product(models.Model):
    product = models.CharField(max_length=100)
    cost = models.DecimalField(decimal_places=2, max_digits=4)
    selling_price = models.DecimalField(decimal_places=2, max_digits=4)

class Item(models.Model):
    item = models.OneToOneField(Product, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    quantity = models.DecimalField(decimal_places=1, max_digits=4)
    
    

