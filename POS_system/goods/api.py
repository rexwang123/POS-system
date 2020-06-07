from goods.models import Goods
from rest_framework import viewsets, permissions
from .serializers import GoodsSerializer

class GoodsViewSet(viewsets.ModelViewSet):
    queryset = Goods.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = GoodsSerializer