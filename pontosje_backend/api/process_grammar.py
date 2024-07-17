import time
from celery import shared_task


@shared_task
def correct_grammar(text):
    time.sleep(1)
    return text
