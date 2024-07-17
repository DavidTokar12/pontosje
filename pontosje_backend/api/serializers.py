from rest_framework import serializers
from .models import TextContent


class TextContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextContent
        fields = "__all__"
