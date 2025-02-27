from rest_framework import serializers
from customers.models import Customer
from orders.serializers import OrderSerializer

class CustomerSerializer(serializers.ModelSerializer):
    orders = OrderSerializer(many=True,read_only=True)
    class Meta:
        model = Customer
        fields = '__all__'

