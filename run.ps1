Start-Process powershell -ArgumentList "cd backend; python manage.py runserver" 
Start-Process powershell -ArgumentList "cd frontend; npm run dev"