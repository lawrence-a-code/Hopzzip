from django.shortcuts import render

def home(request):
    return render(request, 'frontend/index.html')

def about(request):
    return render(request, 'frontend/about.html')

def pharmacy(request):
    return render(request, 'frontend/pharmacy.html')