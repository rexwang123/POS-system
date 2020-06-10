from rest_framework import serializers
from orders.models import Order
from customers.serializers import CustomerSerializer
from carts.serializers import CartSerializer

   
class OrderGetSerializer(serializers.ModelSerializer):
    carts = CartSerializer(many=True,read_only=True)
    customer = CustomerSerializer(read_only=True)
    class Meta:
        model = Order
        fields = ('status','customer','delivery_fee','total_quantity','total_cost','total_price','total_revenue','date','address','city','state','zipcode','orderId','carts')


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
