from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import authenticate, login, logout
from tokens.models import Token
from pharmacy.models import Prescription
from datetime import date

def pharmacy_search(request):
    # Manually check if user is logged in, redirect to pharmacy login
    if not request.user.is_authenticated:
        return redirect('/pharmacy/login/')
    
    prescription = None
    token = None
    error = None

    if request.method == "POST":
        token_number = request.POST.get("token_number")

        try:
            token = Token.objects.filter(
             token_number=token_number,
             status="Done",
             visit_date=date.today()
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
    # Manually check if user is logged in
    if not request.user.is_authenticated:
        return redirect('/pharmacy/login/')
    
    token = get_object_or_404(Token, id=token_id)
    token.status = "Given"
    token.save()
    return redirect("pharmacy_search")

def pharmacy_login(request):
    error = None

    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect("/pharmacy/search/")
        else:
            error = "Invalid username or password"

    return render(request, "pharmacy/login.html", {"error": error})

def pharmacy_logout(request):
    logout(request)
    return redirect('/pharmacy/login/')