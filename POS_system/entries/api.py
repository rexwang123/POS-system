from entries.models import Entry
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from .serializers import EntrySerializer
from django.db.models import Sum
from rest_framework.response import Response

class EntryViewSet(viewsets.ModelViewSet):
    queryset = Entry.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = EntrySerializer
