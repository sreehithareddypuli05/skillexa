from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ServiceViewSet,
    AdminServiceListCreateView,
    AdminServiceRetrieveUpdateDestroyView,
)

router = DefaultRouter()
router.register('', ServiceViewSet, basename='services')

urlpatterns = [
    # ── Public ────────────────────────────────────────────────────────
    path('', include(router.urls)),

    # ── Admin CRUD ────────────────────────────────────────────────────
    path('admin/create/',             AdminServiceListCreateView.as_view(),               name='admin-service-list-create'),
    path('admin/<slug:slug>/update/', AdminServiceRetrieveUpdateDestroyView.as_view(),    name='admin-service-detail'),
    path('admin/<slug:slug>/delete/', AdminServiceRetrieveUpdateDestroyView.as_view(),    name='admin-service-delete'),
]