from django.db import models


class Inscricao(models.Model):
	MINISTERIOS = [
		("canhotinho", "Canhotinho"),
		("sao_joao", "São João"),
		("logradouro", "Logradouro"),
		("jurema", "Jurema"),
		("jupi", "Jupi"),
		("correntes", "Correntes"),
		("bom_conselho", "Bom Conselho"),
		("garanhuns", "Garanhuns"),
	]

	nome = models.CharField(max_length=80)
	sobrenome = models.CharField(max_length=120)
	idade = models.PositiveSmallIntegerField()
	telefone = models.CharField(max_length=30)
	ministerio = models.CharField(max_length=30, choices=MINISTERIOS)
	pago = models.BooleanField(default=False)
	criado_em = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return f"{self.nome} {self.sobrenome} - {self.get_ministerio_display()}"


class ScheduleItem(models.Model):
	day = models.CharField(max_length=30)
	title = models.CharField(max_length=80)
	details = models.CharField(max_length=160)
	order = models.PositiveSmallIntegerField(default=0)

	class Meta:
		ordering = ["order", "id"]

	def __str__(self):
		return f"{self.day} - {self.title}"


class EventItem(models.Model):
	title = models.CharField(max_length=80)
	subtitle = models.CharField(max_length=80)
	order = models.PositiveSmallIntegerField(default=0)

	class Meta:
		ordering = ["order", "id"]

	def __str__(self):
		return self.title


class SiteNotice(models.Model):
	text = models.CharField(max_length=200)

	def __str__(self):
		return self.text
