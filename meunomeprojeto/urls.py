from django.contrib import admin
from django.urls import path
from django.conf import settings
from paginas.views import home 

urlpatterns = [
    path(settings.ADMIN_URL, admin.site.urls),
    path('', home), 
]