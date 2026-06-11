from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import ContactMessage
from .serializers import ContactMessageSerializer


class ContactMessageView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # Send email to admin
        data = serializer.validated_data
        try:
            send_mail(
                subject=f"New Contact Message from {data.get('name')}",
                message=f"""
New contact message received on Skillexa:

Name:    {data.get('name')}
Email:   {data.get('email')}
Phone:   {data.get('phone', 'Not provided')}
Message: {data.get('message')}
                """,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.ADMIN_EMAIL],
                fail_silently=False,
            )
        except Exception as e:
            print(f"Email error: {e}")  # Don't break the API if email fails

        return Response(
            {'message': 'Thank you! Your message has been sent.'},
            status=status.HTTP_201_CREATED
        )