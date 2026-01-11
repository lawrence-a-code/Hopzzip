from django.db import models

class BloodDonor(models.Model):
    name = models.CharField(max_length=100)
    blood_group = models.CharField(max_length=5)
    phone = models.CharField(max_length=15)
    available = models.BooleanField(default=True)

# Create your models here.
