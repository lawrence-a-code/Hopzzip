from django.shortcuts import render, redirect
from .models import Token
from patients.models import Patient
from doctors.models import Doctor
from datetime import datetime, timedelta

def create_token(request):
    if request.method == "POST":
        patient_name = request.POST.get("patient_name")
        age = request.POST.get("age")
        mobile = request.POST.get("mobile")
        gender = request.POST.get("gender")
        address = request.POST.get("address")
        doctor_id = request.POST.get("doctor")
        visit_date = request.POST.get("visit_date")


        patient, created = Patient.objects.get_or_create(
            name=patient_name,
            mobile=mobile,
            defaults={
                "age": age,
                "gender": gender,
                "address": address
            }
        )

        doctor = Doctor.objects.get(id=doctor_id)
        visit_date = datetime.strptime(visit_date, "%Y-%m-%d").date()

   
        today_count = Token.objects.filter(
            doctor=doctor,
            visit_date=visit_date
        ).count()

        doctor_start = datetime.combine(visit_date, doctor.start_time)
        doctor_start += timedelta(minutes=doctor.delay_minutes)

        expected_time = doctor_start + timedelta(
            minutes=today_count * doctor.consultation_minutes
        )

        current_token = Token.objects.filter(
            doctor=doctor,
            visit_date=visit_date,
            status='Serving'
        ).order_by('created_at').first()

        next_waiting_token = Token.objects.filter(
            doctor=doctor,
            visit_date=visit_date,
            status='Waiting'
        ).order_by('created_at').first()

       
        token = Token.objects.create(
            patient=patient,
            doctor=doctor,
            visit_date=visit_date,
            status="Waiting"
        )

        return render(request, "tokens/success.html", {
            "token": token,
            "expected_time": expected_time.strftime("%I:%M %p"),
            "current_token": current_token,
            "next_waiting_token": next_waiting_token,
        })

    doctors = Doctor.objects.all()
    return render(request, "tokens/create_token.html", {"doctors": doctors})