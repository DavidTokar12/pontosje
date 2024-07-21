from django.urls import re_path

from .grammar_consumer import GrammarConsumer

websocket_urlpatterns = [
    re_path(r"ws/grammar/$", GrammarConsumer.as_asgi()),
]
