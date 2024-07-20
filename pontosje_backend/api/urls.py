from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CorrectGrammarView

router = DefaultRouter()

urlpatterns = [
    path("", include(router.urls)),
    # path("task_status/<str:task_id>/", task_status, name="task-status"),
    path("correct_grammar/", CorrectGrammarView.as_view(), name="correct_grammar"),
]
