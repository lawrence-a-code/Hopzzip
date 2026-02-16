from django.shortcuts import render, get_object_or_404, redirect
from tokens.models import Token
from pharmacy.models import Prescription

def pharmacy_search(request):
    prescription = None
    token = None
    error = None

    if request.method == "POST":
        token_number = request.POST.get("token_number") 

        try:
            token = Token.objects.filter(
                token_number=token_number,
                status="Done"  
            ).first()

            if not token:
                error = "Token not ready or invalid"
            else:
                prescription = Prescription.objects.filter(
                    token=token
                ).first()

                if not prescription:
                    error = "Prescription not found"

        except Exception as e:
            error = "Something went wrong"

    return render(request, "pharmacy/search.html", {
        "token": token,
        "prescription": prescription,
        "error": error
    })
def mark_given(request, token_id):
    token = get_object_or_404(Token, id=token_id)
    token.status = "Given"
    token.save()
    return redirect("pharmacy_search")