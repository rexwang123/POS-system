from orders.models import Order
from rest_framework import viewsets, permissions
from .serializers import OrderSerializer, OrderGetSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return OrderGetSerializer 
        return OrderSerializer 
    
   