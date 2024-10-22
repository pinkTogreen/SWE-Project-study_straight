from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

# this view is the default landing page for http://localhost:8000/study_log/
def home(request):
    return HttpResponse("<h1>study log (WIP)</h1>")

def say_hello(request):
    return render(request, 'hello.html')