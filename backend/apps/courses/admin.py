from django.contrib import admin
from .models import Course, Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = [
        'title',
        'level',
        'duration',
        'is_featured',
        'is_active',
        'enrollment_count',
        'order'   # ✅ added
    ]

    list_filter = [
        'level',
        'is_featured',
        'is_active',
        'category'
    ]

    search_fields = [
        'title',
        'short_description'
    ]

    prepopulated_fields = {
        'slug': ('title',)
    }

    list_editable = [
        'is_featured',
        'is_active',
        'order'
    ]