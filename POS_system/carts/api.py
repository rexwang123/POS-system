from carts.models import Cart
from rest_framework import viewsets, permissions
from .serializers import CartSerializer

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = CartSerializer