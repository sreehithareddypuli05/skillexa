from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, BasePermission
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import CustomTokenObtainPairSerializer, RegisterSerializer, UserProfileSerializer
from .models import User
from rest_framework.permissions import BasePermission

ADMIN_EMAIL = 'skillexalearnsmart@gmail.com'


# ── Custom permission ──────────────────────────────────────────────────────────
class IsAdminEmail(BasePermission):
    """Only allows access to the designated admin email."""
    message = 'Admin access only.'

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.email == ADMIN_EMAIL
        )


# ── Existing views (unchanged) ─────────────────────────────────────────────────
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'message': 'Account created successfully!',
            'user': {
                'id': user.id,
                'email': user.email,
                'name': user.get_full_name(),
                'role': user.role,
            },
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }, status=status.HTTP_201_CREATED)


class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception:
            pass
        return Response({'message': 'Logged out successfully.'})


# ── NEW: Admin — List All Users ────────────────────────────────────────────────
class AdminListUsersView(APIView):
    permission_classes = [IsAdminEmail]

    def get(self, request):
        users = User.objects.all().order_by('-date_joined')
        data = [
            {
                'id':         u.id,
                'username':   u.username,
                'first_name': u.first_name,
                'last_name':  u.last_name,
                'email':      u.email,
                'role':       u.role,
                'phone':      u.phone,
                'is_active':  u.is_active,
                'is_staff':   u.is_staff,
                'created_at': u.created_at.isoformat() if u.created_at else None,
            }
            for u in users
        ]
        return Response(data)