import json
from datetime import date

from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods, require_POST
from django.http import HttpResponseRedirect
from django.utils import timezone

from .models import Inscricao, ScheduleItem, EventItem, SiteNotice


def home(request):
    _ensure_site_content()
    schedule_items = ScheduleItem.objects.all()
    events = EventItem.objects.all()
    notice = SiteNotice.objects.first()
    return render(
        request,
        'home.html',
        {
            'schedule_items': schedule_items,
            'events': events,
            'notice': notice,
        },
    )


def central(request):
    _ensure_site_content()
    inscricoes = Inscricao.objects.order_by('-criado_em')
    hoje = timezone.localdate()
    vencimento = date(hoje.year, 7, 1)
    if hoje > vencimento:
        vencimento = date(hoje.year + 1, 7, 1)
    dias_para_vencer = (vencimento - hoje).days
    perto_de_vencer = 0 <= dias_para_vencer <= 7

    for inscricao in inscricoes:
        inscricao.perto_de_vencer = (not inscricao.pago) and perto_de_vencer
        inscricao.vencimento = vencimento

    grupos = []
    grupos_map = {}

    for ministerio_key, ministerio_label in Inscricao.MINISTERIOS:
        grupos_map[ministerio_key] = {
            'key': ministerio_key,
            'label': ministerio_label,
            'itens': [],
        }
        grupos.append(grupos_map[ministerio_key])

    for inscricao in inscricoes:
        grupo = grupos_map.get(inscricao.ministerio)
        if grupo is None:
            grupo = {
                'key': inscricao.ministerio,
                'label': inscricao.get_ministerio_display(),
                'itens': [],
            }
            grupos_map[inscricao.ministerio] = grupo
            grupos.append(grupo)
        grupo['itens'].append(inscricao)

    schedule_items = ScheduleItem.objects.all()
    events = EventItem.objects.all()
    notice = SiteNotice.objects.first()

    return render(
        request,
        'central.html',
        {
            'inscricoes': inscricoes,
            'grupos': grupos,
            'schedule_items': schedule_items,
            'events': events,
            'notice': notice,
        },
    )


def _ensure_site_content():
    if not ScheduleItem.objects.exists():
        ScheduleItem.objects.bulk_create(
            [
                ScheduleItem(day='Segunda-feira', title='Dia Livre', details=''),
                ScheduleItem(day='Terça-feira', title='KL', details=''),
                ScheduleItem(day='Quarta-feira', title='18:30 - Oração', details='19:30 - Discipulado'),
                ScheduleItem(day='Quinta-feira', title='Culto da Família', details=''),
                ScheduleItem(day='Sexta-feira', title='Dia Livre', details=''),
                ScheduleItem(day='Sábado', title='18:00 - Encontro de Casais', details=''),
                ScheduleItem(day='Domingo', title='09:30 - Culto Manhã Agradável', details=''),
            ]
        )
    if not EventItem.objects.exists():
        EventItem.objects.bulk_create(
            [
                EventItem(title='Culto da Família', subtitle='Quinta • 19:30'),
                EventItem(title='Encontro de Casais', subtitle='Sábado • 18:00'),
                EventItem(title='Caminhada da Aventura', subtitle='Maio • Data a confirmar'),
                EventItem(title='Culto Manhã Agradável', subtitle='Domingo • 09:30'),
            ]
        )
    if not SiteNotice.objects.exists():
        SiteNotice.objects.create(text='Fique atento aos eventos desta semana!')


@require_POST
def atualizar_conteudo_site(request):
    notice_text = (request.POST.get('notice_text') or '').strip()
    if notice_text:
        notice, _ = SiteNotice.objects.get_or_create(id=1, defaults={'text': notice_text})
        notice.text = notice_text
        notice.save()

    for item in ScheduleItem.objects.all():
        day = (request.POST.get(f'schedule-{item.id}-day') or '').strip()
        title = (request.POST.get(f'schedule-{item.id}-title') or '').strip()
        details = (request.POST.get(f'schedule-{item.id}-details') or '').strip()
        if day:
            item.day = day
        if title:
            item.title = title
        item.details = details
        item.save()

    for item in EventItem.objects.all():
        title = (request.POST.get(f'event-{item.id}-title') or '').strip()
        subtitle = (request.POST.get(f'event-{item.id}-subtitle') or '').strip()
        if title:
            item.title = title
        if subtitle:
            item.subtitle = subtitle
        item.save()

    return HttpResponseRedirect('/paineldecomando/')


@require_POST
def remover_inscricao(request):
    ministerio = (request.POST.get('ministerio') or '').strip()
    ip_numero = (request.POST.get('ip_numero') or '').strip()

    try:
        indice = int(ip_numero)
    except ValueError:
        return HttpResponseRedirect('/paineldecomando/')

    if indice < 1:
        return HttpResponseRedirect('/paineldecomando/')

    qs = Inscricao.objects.filter(ministerio=ministerio).order_by('-criado_em')
    alvo = qs[indice - 1:indice].first()
    if alvo:
        alvo.delete()

    return HttpResponseRedirect('/paineldecomando/')


def _add_cors_headers(response):
    response['Access-Control-Allow-Origin'] = '*'
    response['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    response['Access-Control-Allow-Headers'] = 'Content-Type, X-CSRFToken'
    return response


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def submit_inscricao(request):
    if request.method == "OPTIONS":
        return _add_cors_headers(JsonResponse({"ok": True}))

    try:
        payload = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return _add_cors_headers(JsonResponse({"ok": False, "error": "JSON inválido."}, status=400))

    nome = (payload.get("nome") or "").strip()
    sobrenome = (payload.get("sobrenome") or "").strip()
    idade = payload.get("idade")
    telefone = (payload.get("telefone") or "").strip()
    ministerio = (payload.get("ministerio") or "").strip()

    if not nome or not sobrenome or not telefone or not ministerio:
        return _add_cors_headers(JsonResponse({"ok": False, "error": "Preencha todos os campos."}, status=400))

    try:
        idade_val = int(idade)
    except (TypeError, ValueError):
        return _add_cors_headers(JsonResponse({"ok": False, "error": "Idade inválida."}, status=400))

    if idade_val < 1 or idade_val > 120:
        return _add_cors_headers(JsonResponse({"ok": False, "error": "Idade inválida."}, status=400))

    if ministerio not in dict(Inscricao.MINISTERIOS):
        return _add_cors_headers(JsonResponse({"ok": False, "error": "Ministério inválido."}, status=400))

    inscricao = Inscricao.objects.create(
        nome=nome,
        sobrenome=sobrenome,
        idade=idade_val,
        telefone=telefone,
        ministerio=ministerio,
    )
    return _add_cors_headers(JsonResponse({"ok": True, "id": inscricao.id}))