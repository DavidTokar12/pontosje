from django.db import models


class TextContent(models.Model):
    content = models.TextField()

    def __str__(self):
        return self.content


class Prospect(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"
