from carts.models import Cart
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from .serializers import CartSerializer
from django.db.models import Sum
from rest_framework.response import Response

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = CartSerializer

    @action(detail=False)
    def by_dates(self, request):
        start_date = request.GET.get('start_date')
        end_date = request.GET.get('end_date')
        carts_ = Cart.objects.filter(date__gte=start_date,date__lte=end_date)
        serializer = self.get_serializer(carts_,many=True)
        return Response(serializer.data)