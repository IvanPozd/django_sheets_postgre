# Generated by Django 4.0.5 on 2022-06-28 13:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data', '0002_alter_data_date_ship'),
    ]

    operations = [
        migrations.AlterField(
            model_name='data',
            name='order_number',
            field=models.IntegerField(unique=True),
        ),
    ]