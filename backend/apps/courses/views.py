from rest_framework import viewsets, filters, generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated, BasePermission
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django_filters.rest_framework import DjangoFilterBackend
from .models import Course, Category
from .serializers import CourseSerializer, CategorySerializer

ADMIN_EMAIL = 'skillexalearnsmart@gmail.com'


class IsAdminEmail(BasePermission):
    message = 'Admin access only.'

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.email == ADMIN_EMAIL
        )


# ── Public read-only viewsets ──────────────────────────────────────────────────
class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]


class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.filter(is_active=True)
    serializer_class = CourseSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['level', 'is_free', 'is_featured', 'category']
    search_fields = ['title', 'short_description']
    ordering_fields = ['order', 'enrollment_count', 'created_at']
    lookup_field = 'slug'

    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured = self.queryset.filter(is_featured=True)[:6]
        return Response(self.get_serializer(featured, many=True).data)


# ── Admin CRUD ─────────────────────────────────────────────────────────────────
class AdminCourseListCreateView(generics.ListCreateAPIView):
    """GET all courses (incl. inactive) + POST create with PDF upload."""
    permission_classes = [IsAdminEmail]
    serializer_class = CourseSerializer
    queryset = Course.objects.all().order_by('order', 'title')
    parser_classes = [MultiPartParser, FormParser, JSONParser]


class AdminCourseRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """GET / PUT / PATCH / DELETE a single course by slug."""
    permission_classes = [IsAdminEmail]
    serializer_class = CourseSerializer
    queryset = Course.objects.all()
    lookup_field = 'slug'
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True          # always allow partial updates
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # delete PDF file from disk if it exists
        if instance.pdf_file:
            instance.pdf_file.delete(save=False)
        instance.delete()
        return Response({'message': 'Course deleted.'}, status=status.HTTP_204_NO_CONTENT)