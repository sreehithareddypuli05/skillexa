from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    CustomTokenObtainPairView, RegisterView,
    ProfileView, LogoutView, AdminListUsersView,# ← add this
)

urlpatterns = [
    path('login/',          CustomTokenObtainPairView.as_view(), name='login'),
    path('register/',       RegisterView.as_view(),              name='register'),
    path('token/refresh/',  TokenRefreshView.as_view(),          name='token_refresh'),
    path('profile/',        ProfileView.as_view(),               name='profile'),
    path('logout/',         LogoutView.as_view(),                name='logout'),
    path('admin/users/',    AdminListUsersView.as_view(),        name='admin-users'),  # ← NEW
]
