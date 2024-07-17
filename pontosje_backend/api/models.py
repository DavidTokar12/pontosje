from django.db import models


class TextContent(models.Model):
    content = models.TextField()

    def __str__(self):
        return self.content
