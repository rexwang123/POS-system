from rest_framework import serializers
from sections.models import Section
from entries.serializers import EntrySerializer

class SectionSerializer(serializers.ModelSerializer):
    entries = EntrySerializer(many=True, read_only=True)
    class Meta:
        model = Section
        fields = ('id','section','entries')

    