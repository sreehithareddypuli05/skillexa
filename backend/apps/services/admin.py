from django.contrib import admin
from .models import Service, ServiceRequest


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'is_featured', 'is_active', 'order']
    list_filter = ['category', 'is_featured', 'is_active']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['is_featured', 'is_active', 'order']


@admin.register(ServiceRequest)
class ServiceRequestAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'service', 'status', 'created_at']
    list_filter = ['status', 'service']
    search_fields = ['name', 'email']
    list_editable = ['status']