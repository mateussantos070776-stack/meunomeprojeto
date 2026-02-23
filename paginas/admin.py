from django.contrib import admin

from .models import Inscricao


@admin.register(Inscricao)
class InscricaoAdmin(admin.ModelAdmin):
	list_display = ("nome", "sobrenome", "idade", "telefone", "ministerio", "criado_em")
	list_filter = ("ministerio", "criado_em")
	search_fields = ("nome", "sobrenome", "telefone")
