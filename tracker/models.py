from django.db import models

# Create your models here.

class Game(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    release_date = models.DateField()
    genre = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name} - {self.genre}"
