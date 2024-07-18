# views.py

from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import TextContent
from .serializers import TextContentSerializer
from .process_grammar import correct_grammar


from django.http import JsonResponse
from celery.result import AsyncResult
from django.conf import settings


def task_status(request, task_id):
    result = AsyncResult(task_id)
    response_data = {
        'status': result.status,
    }
    if result.status == 'SUCCESS':
        response_data['result'] = result.result
    return JsonResponse(response_data)


class TextContentViewSet(viewsets.ViewSet):
    def create(self, request):
        serializer = TextContentSerializer(data=request.data)
        if serializer.is_valid():

            text_content = serializer.save()
            text = serializer.validated_data.get("content")

            task = correct_grammar.delay(text)

            return Response(
                {
                    "message": "TextContent created successfully and task started.",
                    "task_id": task.id,
                    "text_content_id": text_content.id,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
