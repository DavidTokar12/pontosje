# views.py

from rest_framework.views import APIView
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


class CorrectGrammarView(APIView):
    def post(self, request, *args, **kwargs):
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
   
    def get(self, request, *args, **kwargs):
        task_id = request.query_params.get('task_id')
        if not task_id:
            return Response({"error": "Task ID is required"},
                            status=status.HTTP_400_BAD_REQUEST)
      
        result = correct_grammar.AsyncResult(task_id)
        if result.state == 'PENDING':
            response = {
                'state': result.state,
                'status': 'Pending...'
            }
        elif result.state != 'FAILURE':
            response = {
                'state': result.state,
                'result': result.result
            }
        else:
            response = {
                'state': result.state,
                'status': str(result.info),  # exception raised
            }
        return Response(response)


# class TextContentViewSet(viewsets.ViewSet):
#     def create(self, request):
#         serializer = TextContentSerializer(data=request.data)
#         if serializer.is_valid():

#             text_content = serializer.save()
#             text = serializer.validated_data.get("content")

#             task = correct_grammar.delay(text)

#             return Response(
#                 {
#                     "message": "TextContent created successfully and task started.",
#                     "task_id": task.id,
#                     "text_content_id": text_content.id,
#                 },
#                 status=status.HTTP_201_CREATED,
#             )
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
