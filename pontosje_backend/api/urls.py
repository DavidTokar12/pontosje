from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TextContentViewSet, task_status

router = DefaultRouter()
router.register(r"text-content", TextContentViewSet, basename="text-content")

urlpatterns = [
    path("", include(router.urls)),
    path("task_status/<str:task_id>/", task_status, name="task-status"),
]
