# courses/serializers.py — make sure pdf_file is included in CourseSerializer
# 
# If your existing serializer uses Meta fields = '__all__', you're done — pdf_file
# will be included automatically.
#
# If you list fields explicitly, add 'pdf_file' to the list:

from rest_framework import serializers
from .models import Course, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    level_display = serializers.CharField(source='get_level_display', read_only=True)

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'slug', 'short_description', 'description',
            'category', 'icon', 'duration', 'level', 'level_display',
            'price', 'is_free', 'is_featured', 'is_active',
            'enrollment_count', 'order',
            'pdf_file',           # ← NEW
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'enrollment_count', 'created_at', 'updated_at']