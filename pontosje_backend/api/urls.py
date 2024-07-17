from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TextContentViewSet

router = DefaultRouter()
router.register(r"text-content", TextContentViewSet, basename="text-content")

urlpatterns = [
    path("", include(router.urls)),
]
