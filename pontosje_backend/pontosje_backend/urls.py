from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api.views import GoogleLogin, SignUpView, GoogleSignUpView
from django.contrib.auth import views as auth_views

urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    path("api/auth/", include("allauth.urls")),
    path("api/auth/google/", GoogleLogin.as_view(), name="google_login"),
    path("api/signup/", SignUpView.as_view(), name="sign_up"),
    path("api/signup/google/", GoogleSignUpView.as_view(), name="google_sign_up"),

    path("api/login/", auth_views.LoginView.as_view(), name="login"),
    path("api/logout/", auth_views.LogoutView.as_view(), name="logout"),

]
