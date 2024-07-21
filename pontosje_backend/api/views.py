# views.py

from rest_framework.views import APIView
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import TextContent
from .serializers import TextContentSerializer 
from .process_grammar import correct_grammar, create_corrected_dict, remove_corrected_words_by_id


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

            xml_text = serializer.validated_data.get("content")
            print("POST SESSION KEY:", request.session.session_key)
            corrected_ids = request.session.get('corrected', {})
            print("CACHED CORRECTIONS", corrected_ids)
            filtered_xml = remove_corrected_words_by_id(xml_text, corrected_ids)

            print('GONNA PROCESS', filtered_xml)

            task = correct_grammar.delay(filtered_xml)

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

        # cache corrected words
        if result.state == "SUCCESS":
            request.session['corrected'] = create_corrected_dict(result.result)
            print("GET SESSION KEY:", request.session.session_key)

        return Response(response)

