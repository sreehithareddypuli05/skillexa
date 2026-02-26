from rest_framework import serializers
from .models import Service, ServiceRequest


class ServiceSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = Service
        fields = ['id', 'title', 'slug', 'short_description', 'icon', 'category', 'category_display', 'is_featured']


class ServiceRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceRequest
        fields = ['id', 'service', 'name', 'email', 'phone', 'message', 'created_at']
        read_only_fields = ['created_at']