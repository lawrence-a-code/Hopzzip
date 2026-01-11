from django.db import models
from doctors.models import Doctor
from patients.models import Patient

class Token(models.Model):
    STATUS_CHOICES = [
        ('Waiting', 'Waiting'),
        ('Serving', 'Serving'),
        ('Done', 'Done'),
        ('Given', 'Given'),
    ]

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    visit_date = models.DateField()

    # IMPORTANT – string format
    token_number = models.CharField(max_length=10, blank=True, null=True)

    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='Waiting'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.token_number:
            today_tokens = Token.objects.filter(
                doctor=self.doctor,
                visit_date=self.visit_date
            ).count()

            # doctor_id.token_count
            next_count = today_tokens + 1
            self.token_number = f"{self.doctor.id}.{next_count}"

        super().save(*args, **kwargs)

    def _str_(self):
        return f"Token {self.token_number} - {self.patient.name} ({self.doctor.name})"