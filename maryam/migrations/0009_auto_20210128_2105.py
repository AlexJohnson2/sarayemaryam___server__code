# Generated by Django 2.2.13 on 2021-01-28 21:05

from django.db import migrations, models
import phone_field.models


class Migration(migrations.Migration):

    dependencies = [
        ('maryam', '0008_auto_20210127_2110'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='phone_number',
            field=phone_field.models.PhoneField(blank=True, default='', help_text='تلفن خود را وارد کنید. شماره تلفن شما برای بازیابی رمز عبور استفاده می شودد', max_length=11, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(default='', help_text='رمز خود را وارد کنید. این رمز برای ورود شما به سایت اسفاده می شود', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='tel_id',
            field=models.CharField(default='', help_text='آی دی تلگرام خود را وارد کنید. این آی دی برای سفارشات شما استفاده می شود', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(default='', help_text='نام کاربری خود را وارد کنید. این نام کاربری برای ورود شما استفاده می شود', max_length=255, null=True),
        ),
    ]
