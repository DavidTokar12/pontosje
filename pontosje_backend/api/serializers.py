from rest_framework import serializers
from .models import TextContent, Prospect


class TextContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextContent
        fields = "__all__"


class ProspectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prospect
        fields = ['first_name', 'last_name', 'email']