from customers.models import Customer
from orders.models import Order
from rest_framework import viewsets, permissions
from .serializers import CustomerSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = CustomerSerializer

