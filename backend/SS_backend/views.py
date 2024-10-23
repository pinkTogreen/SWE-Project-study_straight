#these views are for the landing page, what shows up when you put http://localhost:8000/ in your browser
from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def home(request):
    return render(request, 'home.html')
