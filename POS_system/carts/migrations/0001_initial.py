# Generated by Django 3.0.6 on 2020-06-12 23:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('goods', models.CharField(max_length=100)),
                ('quantity', models.DecimalField(decimal_places=1, max_digits=20)),
                ('cost', models.DecimalField(decimal_places=2, max_digits=20)),
                ('selling_price', models.DecimalField(decimal_places=2, max_digits=20)),
                ('revenue', models.DecimalField(decimal_places=2, max_digits=20)),
                ('date', models.DateField()),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='carts', to='orders.Order')),
            ],
            options={
                'ordering': ('date',),
            },
        ),
    ]
