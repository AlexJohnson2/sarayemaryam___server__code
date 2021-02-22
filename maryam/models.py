from django.db import models

class User(models.Model):
    username = models.CharField(max_length=500000,default='', null=True,help_text="نام کاربری خود را وارد کنید. این نام کاربری برای ورود شما استفاده می شود")
    password = models.CharField(max_length=500000,default='', null=True,help_text="رمز خود را وارد کنید. این رمز برای ورود شما به سایت اسفاده می شود")
    tel_id = models.CharField(max_length=500000,default='', null=True,help_text="آی دی تلگرام خود را وارد کنید. این آی دی برای سفارشات شما استفاده می شود")
    phone_number = models.CharField(max_length=11,default='', null=True,help_text="تلفن خود را وارد کنید. شماره تلفن شما برای بازیابی رمز عبور استفاده می شود")
    address = models.CharField(max_length=500000,default='', null=True,help_text="از آدرس برای ارسال کالا به درب منزل استفاده می شود.")
    post_code = models.CharField(max_length=500000,default='',null=True,help_text="از کد پستی برای ارسال کالا به درب منزل استفاده می شود")
    def __str__(self):
        return self.username

class Pooshak(models.Model):
    name = models.CharField(max_length=250,default='', null=True, help_text="نام نمایشی کالا را وارد کنید")
    text = models.TextField(max_length=250,default='', null=True, help_text="توضیحات کالا را وارد کنید")
    img = models.FileField(upload_to='',null=True)
    amount = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    num = models.CharField(max_length=255,default="")
    def __str__(self):
        return self.name

class Parcheh(models.Model):
    name = models.CharField(max_length=250,default='', null=True, help_text="نام نمایشی کالا را وارد کنید")
    text = models.TextField(max_length=250,default='', null=True, help_text="توضیحات کالا را وارد کنید")
    img = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    amount = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    num = models.CharField(max_length=255,default="")
    def __str__(self):
        return self.name
class Hejab(models.Model):
    name = models.CharField(max_length=250,default='', null=True, help_text="نام نمایشی کالا را وارد کنید")
    text = models.TextField(max_length=250,default='', null=True, help_text="توضیحات کالا را وارد کنید")
    img = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    amount = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    num = models.CharField(max_length=255,default="")
    def __str__(self):
        return self.name
class Kharazi(models.Model):
    name = models.CharField(max_length=250,default='', null=True, help_text="نام نمایشی کالا را وارد کنید")
    text = models.TextField(max_length=250,default='', null=True, help_text="توضیحات کالا را وارد کنید")
    img = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    amount = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    num = models.CharField(max_length=255,default="")
    def __str__(self):
        return self.name

class Cart(models.Model):
    this_id = models.CharField(max_length=255,default="")
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=255,default="")
    amount = models.CharField(max_length=255,default="")
    kala_address = models.CharField(max_length=255,default="")
    img = models.CharField(max_length=255,default="")
    num = models.CharField(max_length=255,default="")
    group = models.CharField(max_length=255,default="")
    def __str__(self):
        return str(self.user)+" ____ "+str(self.name)+" ____ "+str(self.amount)