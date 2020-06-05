from __future__ import unicode_literals
from .models import *
from rest_framework import serializers

class CustomerSerializer(serializers.ModelSerializer):
    order = OrderSerializer()
    class meta:
        model = Customer
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    item = ItemSerializer()
    class meta:
        model = Order
        fields = '__all__'

class ItemSerializer(serializer.ModelSerializer):
    product = ProductSerializer()
    class meta:
        model = Item
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class meta:
        model = Product
        fields = '__all__'
