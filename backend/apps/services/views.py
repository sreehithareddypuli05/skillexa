from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Service, ServiceRequest
from .serializers import ServiceSerializer, ServiceRequestSerializer


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
        serializer = ServiceRequestSerializer(data={**request.data, 'service': service.id})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Service request submitted!'}, status=status.HTTP_201_CREATED)