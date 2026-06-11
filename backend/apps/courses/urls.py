from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CourseViewSet,
    CategoryViewSet,
    AdminCourseListCreateView,
    AdminCourseRetrieveUpdateDestroyView,
)

router = DefaultRouter()
router.register('categories', CategoryViewSet, basename='categories')
router.register('', CourseViewSet, basename='courses')

urlpatterns = [
    # ── Public ────────────────────────────────────────────────────────
    path('', include(router.urls)),

    # ── Admin CRUD ────────────────────────────────────────────────────
    # GET all + POST create (with PDF)
    path('admin/create/', AdminCourseListCreateView.as_view(),               name='admin-course-list-create'),
    # GET one + PUT/PATCH update + DELETE
    path('admin/<slug:slug>/update/', AdminCourseRetrieveUpdateDestroyView.as_view(), name='admin-course-detail'),
    path('admin/<slug:slug>/delete/', AdminCourseRetrieveUpdateDestroyView.as_view(), name='admin-course-delete'),
]