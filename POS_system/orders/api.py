from orders.models import Order
from rest_framework import viewsets, permissions 
from .serializers import OrderSerializer, OrderGetSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('-created_at')
    permission_classes = [
        permissions.AllowAny
    ]

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return OrderGetSerializer 
        return OrderSerializer 
    
    @action(detail=False)
    def by_dates(self, request):
        start_date = request.GET.get('start_date')
        end_date = request.GET.get('end_date')
        orders_ = Order.objects.filter(date__gte=start_date,date__lte=end_date)
        serializer = self.get_serializer(orders_,many=True)
        return Response(serializer.data)

    
    @action(detail=False)
    def recent(self, request):
        orders_ = Order.objects.all().order_by('-created_at')[:20]
        serializer = self.get_serializer(orders_,many=True)
        return Response(serializer.data)