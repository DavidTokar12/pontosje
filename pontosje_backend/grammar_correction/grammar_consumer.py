import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from .process_grammar import correct_grammar


class GrammarConsumer(AsyncWebsocketConsumer):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.message_cache = []

    async def connect(self):
        self.session_key = self.scope.get("session", {}).get("session_key", None)
        # TODO whats the issue here
        # if self.session_key is None:
        #     await self.close()
        #     return
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            text = data.get("text", "")

            self.message_cache.append({"text": text})

            corrected_text, text_correction = correct_grammar(text, self.message_cache)

            response = {
                "corrected_text": corrected_text,
                "text_correction": text_correction,
                "message_cache": self.message_cache,
            }

            await self.send(text_data=json.dumps(response))
        except Exception as e:
            response = {
                "error": str(e),
            }
            await self.send(text_data=json.dumps(response))
