from django.db import models

class Prescription(models.Model):
    token = models.OneToOneField(
        "tokens.Token",   
        on_delete=models.CASCADE,
        related_name="prescription"
    )
    diagnosis = models.TextField()
    medicines = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return f"Prescription for Token {self.token.token_number}"