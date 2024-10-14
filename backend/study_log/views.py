from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse

def health_check(request):
    return JsonResponse({"status": "success", "message": "Django is running!"})