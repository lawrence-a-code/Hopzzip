
from django.shortcuts import render, get_object_or_404
from tokens.models import Token
from datetime import date
from pharmacy.models import Prescription

def doctor_dashboard(request, doctor_id):
    tokens = Token.objects.filter(
        doctor_id=doctor_id,
        visit_date=date.today()
    ).order_by('token_number')
    return render(request, 'doctors/dashboard.html', {
        'tokens': tokens
    })
def token_detail(request, token_id):
    token = get_object_or_404(Token, id=token_id)

    if request.method == 'POST':
        diagnosis = request.POST.get('diagnosis')
        medicines = request.POST.get('medicines')

        Prescription.objects.create(
            token=token,
            diagnosis=diagnosis,
            medicines=medicines
        )

        token.status = 'Done'
        token.save()
    
    return render(request, 'doctors/token_detail.html', {
        'token':token
})


   
