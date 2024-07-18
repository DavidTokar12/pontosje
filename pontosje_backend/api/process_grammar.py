import time
from celery import shared_task


@shared_task
def correct_grammar(text):
    return text
