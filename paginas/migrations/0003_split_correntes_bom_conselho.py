from django.db import migrations


def migrate_correntes_bom_conselho(apps, schema_editor):
    Inscricao = apps.get_model("paginas", "Inscricao")
    Inscricao.objects.filter(ministerio="correntes_bom_conselho").update(
        ministerio="correntes"
    )


class Migration(migrations.Migration):

    dependencies = [
        ("paginas", "0002_inscricao_pago"),
    ]

    operations = [
        migrations.RunPython(migrate_correntes_bom_conselho, migrations.RunPython.noop),
    ]
