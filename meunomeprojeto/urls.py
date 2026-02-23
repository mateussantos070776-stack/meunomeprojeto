from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import path
from django.conf import settings
from paginas.views import home, submit_inscricao, central, remover_inscricao, atualizar_conteudo_site

urlpatterns = [
    path(settings.ADMIN_URL, admin.site.urls),
    path('', home),
    path('inscricoes/', submit_inscricao, name='submit_inscricao'),
    path('inscricoes/remover/', remover_inscricao, name='remover_inscricao'),
    path('paineldecomando/editor/', atualizar_conteudo_site, name='atualizar_conteudo_site'),
    path('paineldecomando/', central, name='central'),
    path('paineldecomando/login/', auth_views.LoginView.as_view(template_name='login.html'), name='central_login'),
]