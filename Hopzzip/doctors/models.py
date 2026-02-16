from django.contrib.auth.models import User
from django.db import models

class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)

    start_time = models.TimeField()
    end_time = models.TimeField()

    consultation_minutes = models.IntegerField(default=10)
    delay_minutes = models.IntegerField(default=0)

    def __str__(self):
        return self.name
