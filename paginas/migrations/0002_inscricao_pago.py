from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("paginas", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="inscricao",
            name="pago",
            field=models.BooleanField(default=False),
        ),
    ]
