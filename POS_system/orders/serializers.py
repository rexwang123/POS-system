from rest_framework import serializers
from orders.models import Order

class CartsField(serializers.RelatedField):
    def to_representation(self, value):
        
        return '%s,%d,%d,%d,%d'%(value.goods,value.quantity,value.cost,value.selling_price,value.revenue)
        
class OrderSerializer(serializers.ModelSerializer):
    carts = CartsField(many=True,read_only=True)
    #customer = serializers.ReadOnlyField(source="customer.email")
    class Meta:
        model = Order
        fields = ('status','customer','delivery_Fee','date','address','city','state','zipcode','orderId','carts')

