# serializers.py
from rest_framework import serializers
from .models import Course, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    level_display = serializers.CharField(source='get_level_display', read_only=True)

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'slug', 'short_description', 'description',
            'category', 'category_name', 'icon', 'duration', 'level',
            'level_display', 'price', 'is_free', 'is_featured',
            'enrollment_count', 'created_at'
        ]