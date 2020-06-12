from sections.models import Section
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from .serializers import SectionSerializer
from django.db.models import Sum
from rest_framework.response import Response

class SectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = SectionSerializer

  