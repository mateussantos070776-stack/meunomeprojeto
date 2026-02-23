from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("paginas", "0003_split_correntes_bom_conselho"),
    ]

    operations = [
        migrations.CreateModel(
            name="ScheduleItem",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("day", models.CharField(max_length=30)),
                ("title", models.CharField(max_length=80)),
                ("details", models.CharField(max_length=160)),
                ("order", models.PositiveSmallIntegerField(default=0)),
            ],
            options={
                "ordering": ["order", "id"],
            },
        ),
        migrations.CreateModel(
            name="EventItem",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=80)),
                ("subtitle", models.CharField(max_length=80)),
                ("order", models.PositiveSmallIntegerField(default=0)),
            ],
            options={
                "ordering": ["order", "id"],
            },
        ),
        migrations.CreateModel(
            name="SiteNotice",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("text", models.CharField(max_length=200)),
            ],
        ),
    ]
