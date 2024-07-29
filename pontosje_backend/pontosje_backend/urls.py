from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenVerifyView, TokenRefreshView, TokenObtainPairView, TokenBlacklistView
from api.views import GoogleLogin, SignUpView, GoogleSignUpView
from django.contrib.auth import views as auth_views

urlpatterns = [
    path("admin/", admin.site.urls),
    # handle tokens and login
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # signup
    path("api/signup/", SignUpView.as_view(), name="sign_up"),
    path("api/signup/google/", GoogleSignUpView.as_view(), name="google_sign_up"),

    # logout
    path("api/token/logout/", TokenBlacklistView.as_view(), name="token_blacklist"),
]
