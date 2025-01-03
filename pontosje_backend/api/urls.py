from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CorrectGrammarView, ProspectCreateView

router = DefaultRouter()

urlpatterns = [
    path("", include(router.urls)),
    path('prospects/', ProspectCreateView.as_view(), name='prospect-create'),
]
