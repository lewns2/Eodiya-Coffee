# Generated by Django 3.2.12 on 2022-04-06 15:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commercial_area', '0004_alter_commercialareaapartment_apartmentavgprice'),
    ]

    operations = [
        migrations.AlterField(
            model_name='commercialareaapartment',
            name='apartmentAvgPrice',
            field=models.BigIntegerField(default=0),
        ),
    ]
