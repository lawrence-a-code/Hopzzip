from django.db import models

class Doctor(models.Model):
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    start_time = models.TimeField()
    consultation_minutes = models.IntegerField(default=5)
    delay_minutes = models.IntegerField(default=0)
    end_time = models.TimeField()

    def __str__(self):
        return f"{self.name} ({self.specialization})"