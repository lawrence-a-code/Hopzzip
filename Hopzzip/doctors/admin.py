from django.contrib import admin
from .models import Doctor

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'specialization',
        'start_time',
        'consultation_minutes',
        'delay_minutes',
    )
