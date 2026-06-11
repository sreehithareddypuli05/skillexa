from rest_framework import viewsets, generics, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, BasePermission
from django.core.mail import send_mail
from django.conf import settings
from .models import Service, ServiceRequest
from .serializers import ServiceSerializer, ServiceRequestSerializer

ADMIN_EMAIL = 'skillexalearnsmart@gmail.com'


class IsAdminEmail(BasePermission):
    message = 'Admin access only.'

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.email == ADMIN_EMAIL
        )


# ── Public read-only viewset ───────────────────────────────────────────────────
class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'

    @action(detail=False)
    def featured(self, request):
        featured = self.queryset.filter(is_featured=True)
        return Response(ServiceSerializer(featured, many=True).data)

    @action(detail=True, methods=['post'])
    def request_service(self, request, slug=None):
        service = self.get_object()
        serializer = ServiceRequestSerializer(
            data={**request.data, 'service': service.id}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        data = serializer.validated_data
        try:
            send_mail(
                subject=f"New Service Request: {service.title}",
                message=f"""
New service request received on Skillexa:

Service: {service.title}
Name:    {data.get('name')}
Email:   {data.get('email')}
Phone:   {data.get('phone', 'Not provided')}
Message: {data.get('message')}
                """,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.ADMIN_EMAIL],
                fail_silently=True,
            )
        except Exception as e:
            print(f"Email error: {e}")

        return Response({'message': 'Service request submitted!'}, status=status.HTTP_201_CREATED)


# ── Admin CRUD ─────────────────────────────────────────────────────────────────
class AdminServiceListCreateView(generics.ListCreateAPIView):
    """GET all services (incl. inactive) + POST create."""
    permission_classes = [IsAdminEmail]
    serializer_class = ServiceSerializer
    queryset = Service.objects.all().order_by('order', 'title')


class AdminServiceRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """GET / PUT / PATCH / DELETE a single service by slug."""
    permission_classes = [IsAdminEmail]
    serializer_class = ServiceSerializer
    queryset = Service.objects.all()
    lookup_field = 'slug'

    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({'message': 'Service deleted.'}, status=status.HTTP_204_NO_CONTENT)