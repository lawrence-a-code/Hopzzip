from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from datetime import date
from tokens.models import Token
from pharmacy.models import Prescription
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect


from django.http import JsonResponse
from django.template.loader import render_to_string

@login_required
def doctor_dashboard(request):
    try:
        # Check if this user is a doctor
        try:
            doctor = request.user.doctor
        except:
             # Not a doctor! Force logout
            logout(request)
            if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                 return JsonResponse({'error': 'Not authorized as doctor'}, status=403)
            return redirect('/doctors/login/')

        tokens = Token.objects.filter(
            doctor=doctor,
            visit_date=date.today()
        ).order_by("token_number")
        
        context = {"tokens": tokens}

        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            html = render_to_string('doctors/dashboard_content.html', context, request=request)
            return JsonResponse({'html': html})

        return render(request, "doctors/dashboard.html", context)
    except Exception as e:
        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            return JsonResponse({'error': str(e)}, status=500)
        raise

@login_required
def token_detail(request, token_id):
    token = get_object_or_404(Token, id=token_id)

    if request.method == "POST":
        diagnosis = request.POST.get("diagnosis")
        medicines = request.POST.get("medicines")

        Prescription.objects.create(
            token=token,
            diagnosis=diagnosis,
            medicines=medicines
        )

        token.status = "Done"
        token.save()

        return render(request, "doctors/token_detail.html", {
            "token": token,
            "success": True
        })

    return render(request, "doctors/token_detail.html", {
        "token": token
    })

def doctor_login(request):
    error = None

    if request.method == "POST":
        try:
            # Check if it is a JSON request (from fetch)
            import json
            is_ajax = request.headers.get('x-requested-with') == 'XMLHttpRequest'
            
            if request.headers.get('content-type') == 'application/json':
                 try:
                    data = json.loads(request.body)
                    username = data.get("username")
                    password = data.get("password")
                 except json.JSONDecodeError:
                    if is_ajax:
                        return JsonResponse({'success': False, 'error': 'Invalid JSON data'})
                    return render(request, "doctors/login.html", {"error": "Invalid data"})
            else:
                 username = request.POST.get("username")
                 password = request.POST.get("password")

            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                if is_ajax:
                     return JsonResponse({'success': True})
                return redirect("/doctors/dashboard/")
            else:
                error = "Invalid username or password"
                if is_ajax:
                     return JsonResponse({'success': False, 'error': error})
        except Exception as e:
             if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                 return JsonResponse({'success': False, 'error': f"Server error: {str(e)}"})
             raise

    return render(request, "doctors/login.html", {"error": error})

def doctor_logout(request):
    logout(request)
    return redirect('/doctors/login/')