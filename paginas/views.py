import json

from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

def home(request):
    return render(request, 'home.html')


@csrf_exempt
def admin_login(request):
    if request.method != 'POST':
        return JsonResponse({'ok': False, 'message': 'Método não permitido'}, status=405)

    try:
        payload = json.loads(request.body.decode('utf-8'))
    except json.JSONDecodeError:
        payload = request.POST

    username = (payload.get('username') or '').strip()
    password = (payload.get('password') or '').strip()

    user = authenticate(request, username=username, password=password)
    if user is not None and user.is_staff:
        login(request, user)
        return JsonResponse({'ok': True, 'redirect': '/acesso-admin/'})

    return JsonResponse({'ok': False, 'message': 'Credenciais inválidas'}, status=401)