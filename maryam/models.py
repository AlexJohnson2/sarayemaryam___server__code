from django.db import models


class Update(models.Model):
    version = models.CharField(max_length=500000,default='', null=True)
    name = models.CharField(max_length=500000,default='', null=True)
    link = models.CharField(max_length=500000,default='', null=True)
    new = models.TextField(max_length=500000,default='', null=True)
    def __str__(self):
        return self.name


class User(models.Model):
    username = models.CharField(max_length=500000,default='', null=True,help_text="نام کاربری خود را وارد کنید. این نام کاربری برای ورود شما استفاده می شود")
    password = models.CharField(max_length=500000,default='', null=True,help_text="رمز خود را وارد کنید. این رمز برای ورود شما به سایت اسفاده می شود")
    tel_id = models.CharField(max_length=500000,default='', null=True,help_text="آی دی تلگرام خود را وارد کنید. این آی دی برای سفارشات شما استفاده می شود")
    phone_number = models.CharField(max_length=11,default='', null=True,help_text="تلفن خود را وارد کنید. شماره تلفن شما برای بازیابی رمز عبور استفاده می شود")
    address = models.CharField(max_length=500000,default='', null=True,help_text="از آدرس برای ارسال کالا به درب منزل استفاده می شود.")
    post_code = models.CharField(max_length=500000,default='',null=True,help_text="از کد پستی برای ارسال کالا به درب منزل استفاده می شود")
    def __str__(self):
        return self.username

class SignupClass(models.Model):
    username = models.CharField(max_length=500000,default='',null=True)
    tel_id = models.CharField(max_length=500000,default='',null=True)
    phone_number = models.CharField(max_length=500000,default='',null=True)
    address = models.CharField(max_length=500000,default='',null=True)
    group = models.CharField(max_length=500000,default='',null=True)

class Tarikhche_kharid(models.Model):
    this_id = models.CharField(max_length=500000,default="")
    username = models.CharField(max_length=500000,default='',null=True)
    password = models.CharField(max_length=500000,default='',null=True)
    tel_id = models.CharField(max_length=500000,default='',null=True)
    phone_number = models.CharField(max_length=500000,default='',null=True)
    address = models.CharField(max_length=500000,default='',null=True)
    post_code = models.CharField(max_length=500000,default='',null=True)
    kalas = models.CharField(max_length=500000, default='',null=True)
    name = models.CharField(max_length=500000,default='',null=True)
    text = models.CharField(max_length=500000,default='',null=True)
    img = models.CharField(max_length=500000,default='',null=True)
    amount = models.CharField(max_length=500000,default='',null=True)
    num = models.CharField(max_length=500000,default='',null=True)
    group = models.CharField(max_length=500000,default='',null=True)
    color = models.CharField(max_length=255,default="")
    size = models.CharField(max_length=255,default="")
    status = models.CharField(max_length=255,default="")
    authority = models.CharField(max_length=255, default="")
    pick_kala = models.CharField(max_length=255, default="")
    date = models.DateField(null=True)
    time = models.TimeField(null=True)
    level_sabt = models.CharField(max_length=255,default="")
    level_amadeh_sazi = models.CharField(max_length=255,default="")
    level_tahvil_post = models.CharField(max_length=255,default="")

    def __str__(self):
        return str(self.username)+"___"+str(self.name)

class Admin_user(models.Model):
    username = models.CharField(max_length=500000,default='', null=True,help_text="نام کاربری خود را وارد کنید. این نام کاربری برای ورود شما استفاده می شود")
    password = models.CharField(max_length=500000,default='', null=True,help_text="رمز خود را وارد کنید. این رمز برای ورود شما به سایت اسفاده می شود")
    def __str__(self):
        return self.username

class Pishnahad_Vizhe(models.Model):
    name = models.CharField(max_length=250,default='', null=True, help_text="نام نمایشی کالا را وارد کنید")
    text = models.TextField(max_length=10000000000,default='', null=True, help_text="توضیحات کالا را وارد کنید")
    img = models.FileField(upload_to='',null=True)
    img2 = models.FileField(upload_to='',null=True)
    img3 = models.FileField(upload_to='',null=True)
    img4 = models.FileField(upload_to='',null=True)
    amount = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    num = models.CharField(max_length=255,default="")
    group = models.CharField(max_length=500000,default='pishnahad_vizhe',null=True)
    color_size = models.JSONField(null=True)
    def __str__(self):
        return self.name


class Users_kalas(models.Model):
    user = models.CharField(max_length=250,default='', null=True)
    phone = models.CharField(max_length=255,default='',null=True)
    city = models.CharField(max_length=255,default='',null=True)
    name = models.CharField(max_length=250,default='', null=True, help_text="نام نمایشی کالا را وارد کنید")
    text = models.TextField(max_length=10000000000,default='', null=True, help_text="توضیحات کالا را وارد کنید")
    img = models.FileField(upload_to='',null=True)
    img2 = models.FileField(upload_to='',null=True)
    img3 = models.FileField(upload_to='',null=True)
    img4 = models.FileField(upload_to='',null=True)
    amount = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    num = models.CharField(max_length=255,default="")
    group = models.CharField(max_length=500000,default='users_kalas',null=True)
    color_size = models.JSONField(null=True)
    def __str__(self):
        return self.user+"___"+self.name



class Zivar_Alat(models.Model):
    name = models.CharField(max_length=250,default='', null=True, help_text="نام نمایشی کالا را وارد کنید")
    text = models.TextField(max_length=10000000000,default='', null=True, help_text="توضیحات کالا را وارد کنید")
    img = models.FileField(upload_to='',null=True)
    img2 = models.FileField(upload_to='',null=True)
    img3 = models.FileField(upload_to='',null=True)
    img4 = models.FileField(upload_to='',null=True)
    amount = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    num = models.CharField(max_length=255,default="")
    group = models.CharField(max_length=500000,default='zivar_alat',null=True)
    color_size = models.JSONField(null=True)
    def __str__(self):
        return self.name


class Haraji(models.Model):
    name = models.CharField(max_length=500000,default='',null=True)
    text = models.TextField(max_length=500000,default='',null=True)
    img = models.FileField(upload_to='',null=True)
    img2 = models.FileField(upload_to='',null=True)
    img3 = models.FileField(upload_to='',null=True)
    img4 = models.FileField(upload_to='',null=True)
    amount = models.CharField(max_length=500000,default='',null=True)
    num = models.CharField(max_length=500000,default='',null=True)
    group = models.CharField(max_length=500000,default='haraji',null=True)
    color_size = models.JSONField(null=True)
    def __str__(self):
        return self.name

class Pooshak(models.Model):
    name = models.CharField(max_length=250,default='', null=True, help_text="نام نمایشی کالا را وارد کنید")
    text = models.TextField(max_length=10000000000,default='', null=True, help_text="توضیحات کالا را وارد کنید")
    img = models.FileField(upload_to='',null=True)
    amount = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    num = models.CharField(max_length=255,default="")
    def __str__(self):
        return self.name

class Pooshak_mardane(models.Model):
    name = models.CharField(max_length=250,default='', null=True, help_text="نام نمایشی کالا را وارد کنید")
    text = models.TextField(max_length=10000000000,default='', null=True, help_text="توضیحات کالا را وارد کنید")
    img = models.FileField(upload_to='',null=True)
    img2 = models.FileField(upload_to='',null=True)
    img3 = models.FileField(upload_to='',null=True)
    img4 = models.FileField(upload_to='',null=True)
    amount = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    num = models.CharField(max_length=255,default="")
    group = models.CharField(max_length=500000,default='pooshak_mardane',null=True)
    color_size = models.JSONField(null=True)
    def __str__(self):
        return self.name
class Pooshak_zanane(models.Model):
    name = models.CharField(max_length=250,default='', null=True, help_text="نام نمایشی کالا را وارد کنید")
    text = models.TextField(max_length=10000000000,default='', null=True, help_text="توضیحات کالا را وارد کنید")
    img = models.FileField(upload_to='',null=True)
    img2 = models.FileField(upload_to='',null=True)
    img3 = models.FileField(upload_to='',null=True)
    img4 = models.FileField(upload_to='',null=True)
    amount = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    num = models.CharField(max_length=255,default="")
    group = models.CharField(max_length=500000,default='pooshak_zanane',null=True)
    color_size = models.JSONField(null=True)
    def __str__(self):
        return self.name
class Pooshak_dokhtarane(models.Model):
    name = models.CharField(max_length=10000000000,default='', null=True, help_text="نام نمایشی کالا را وارد کنید")
    text = models.TextField(max_length=10000000000,default='', null=True, help_text="توضیحات کالا را وارد کنید")
    img = models.FileField(upload_to='',null=True)
    img2 = models.FileField(upload_to='',null=True)
    img3 = models.FileField(upload_to='',null=True)
    img4 = models.FileField(upload_to='',null=True)
    amount = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    num = models.CharField(max_length=255,default="")
    group = models.CharField(max_length=500000,default='pooshak_dokhtarane',null=True)
    color_size = models.JSONField(null=True)
    def __str__(self):
        return self.name
class Pooshak_pesarane(models.Model):
    name = models.CharField(max_length=250,default='', null=True, help_text="نام نمایشی کالا را وارد کنید")
    text = models.TextField(max_length=10000000000,default='', null=True, help_text="توضیحات کالا را وارد کنید")
    img = models.FileField(upload_to='',null=True)
    img2 = models.FileField(upload_to='',null=True)
    img3 = models.FileField(upload_to='',null=True)
    img4 = models.FileField(upload_to='',null=True)
    amount = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    num = models.CharField(max_length=255,default="")
    group = models.CharField(max_length=500000,default='pooshak_pesarane',null=True)
    color_size = models.JSONField(null=True)
    def __str__(self):
        return self.name
class Pooshak_nozadi(models.Model):
    name = models.CharField(max_length=250,default='', null=True, help_text="نام نمایشی کالا را وارد کنید")
    text = models.TextField(max_length=10000000000,default='', null=True, help_text="توضیحات کالا را وارد کنید")
    img = models.FileField(upload_to='',null=True)
    img2 = models.FileField(upload_to='',null=True)
    img3 = models.FileField(upload_to='',null=True)
    img4 = models.FileField(upload_to='',null=True)
    amount = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    num = models.CharField(max_length=255,default="")
    group = models.CharField(max_length=500000,default='pooshak_nozadi',null=True)
    color_size = models.JSONField(null=True)
    #test = models.JSONField(null=True)
    def __str__(self):
        return self.name







class Parcheh(models.Model):
    name = models.CharField(max_length=250,default='', null=True, help_text="نام نمایشی کالا را وارد کنید")
    text = models.TextField(max_length=10000000000,default='', null=True, help_text="توضیحات کالا را وارد کنید")
    img = models.FileField(upload_to='',null=True)
    img2 = models.FileField(upload_to='',null=True)
    img3 = models.FileField(upload_to='',null=True)
    img4 = models.FileField(upload_to='',null=True)
    amount = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    num = models.CharField(max_length=255,default="")
    group = models.CharField(max_length=500000,default='parcheh',null=True)
    color_size = models.JSONField(null=True)
    def __str__(self):
        return self.name


class Hejab(models.Model):
    name = models.CharField(max_length=250,default='', null=True, help_text="نام نمایشی کالا را وارد کنید")
    text = models.TextField(max_length=10000000000,default='', null=True, help_text="توضیحات کالا را وارد کنید")
    img = models.FileField(upload_to='',null=True)
    img2 = models.FileField(upload_to='',null=True)
    img3 = models.FileField(upload_to='',null=True)
    img4 = models.FileField(upload_to='',null=True)
    amount = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    num = models.CharField(max_length=255,default="")
    group = models.CharField(max_length=500000,default='hejab',null=True)
    color_size = models.JSONField(null=True)
    def __str__(self):
        return self.name

class Hejab_chador(models.Model):
    name = models.CharField(max_length=250,default='', null=True, help_text="نام نمایشی کالا را وارد کنید")
    text = models.TextField(max_length=10000000000,default='', null=True, help_text="توضیحات کالا را وارد کنید")
    img = models.FileField(upload_to='',null=True)
    img2 = models.FileField(upload_to='',null=True)
    img3 = models.FileField(upload_to='',null=True)
    img4 = models.FileField(upload_to='',null=True)
    amount = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    num = models.CharField(max_length=255,default="")
    group = models.CharField(max_length=500000,default='hejab_chador',null=True)
    color_size = models.JSONField(null=True)
    def __str__(self):
        return self.name
class Hejab_shal(models.Model):
    name = models.CharField(max_length=250,default='', null=True, help_text="نام نمایشی کالا را وارد کنید")
    text = models.TextField(max_length=10000000000,default='', null=True, help_text="توضیحات کالا را وارد کنید")
    img = models.FileField(upload_to='',null=True)
    img2 = models.FileField(upload_to='',null=True)
    img3 = models.FileField(upload_to='',null=True)
    img4 = models.FileField(upload_to='',null=True)
    amount = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    num = models.CharField(max_length=255,default="")
    group = models.CharField(max_length=500000,default='hejab_shal',null=True)
    color_size = models.JSONField(null=True)
    def __str__(self):
        return self.name
class Hejab_roosari(models.Model):
    name = models.CharField(max_length=250,default='', null=True, help_text="نام نمایشی کالا را وارد کنید")
    text = models.TextField(max_length=10000000000,default='', null=True, help_text="توضیحات کالا را وارد کنید")
    img = models.FileField(upload_to='',null=True)
    img2 = models.FileField(upload_to='',null=True)
    img3 = models.FileField(upload_to='',null=True)
    img4 = models.FileField(upload_to='',null=True)
    amount = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    num = models.CharField(max_length=255,default="")
    group = models.CharField(max_length=500000,default='hejab_roosari',null=True)
    color_size = models.JSONField(null=True)
    def __str__(self):
        return self.name
class Hejab_saghedast_dastkesh(models.Model):
    name = models.CharField(max_length=250,default='', null=True, help_text="نام نمایشی کالا را وارد کنید")
    text = models.TextField(max_length=10000000000,default='', null=True, help_text="توضیحات کالا را وارد کنید")
    img = models.FileField(upload_to='',null=True)
    img2 = models.FileField(upload_to='',null=True)
    img3 = models.FileField(upload_to='',null=True)
    img4 = models.FileField(upload_to='',null=True)
    amount = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    num = models.CharField(max_length=255,default="")
    group = models.CharField(max_length=500000,default='hejab_saghedast_dastkesh',null=True)
    color_size = models.JSONField(null=True)
    def __str__(self):
        return self.name
class Hejab_mask_pooshie(models.Model):
    name = models.CharField(max_length=250,default='', null=True, help_text="نام نمایشی کالا را وارد کنید")
    text = models.TextField(max_length=10000000000,default='', null=True, help_text="توضیحات کالا را وارد کنید")
    img = models.FileField(upload_to='',null=True)
    img2 = models.FileField(upload_to='',null=True)
    img3 = models.FileField(upload_to='',null=True)
    img4 = models.FileField(upload_to='',null=True)
    amount = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    num = models.CharField(max_length=255,default="")
    group = models.CharField(max_length=500000,default='hejab_mask_pooshie',null=True)
    color_size = models.JSONField(null=True)
    def __str__(self):
        return self.name


class Kharazi(models.Model):
    name = models.CharField(max_length=250,default='', null=True, help_text="نام نمایشی کالا را وارد کنید")
    text = models.TextField(max_length=10000000000,default='', null=True, help_text="توضیحات کالا را وارد کنید")
    img = models.FileField(upload_to='',null=True)
    img2 = models.FileField(upload_to='',null=True)
    img3 = models.FileField(upload_to='',null=True)
    img4 = models.FileField(upload_to='',null=True)
    amount = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    num = models.CharField(max_length=255,default="")
    group = models.CharField(max_length=500000,default='kharazi',null=True)
    color_size = models.JSONField(null=True)
    def __str__(self):
        return self.name
class Kharazi_abzarkhayati(models.Model):
    name = models.CharField(max_length=250,default='', null=True, help_text="نام نمایشی کالا را وارد کنید")
    text = models.TextField(max_length=10000000000,default='', null=True, help_text="توضیحات کالا را وارد کنید")
    img = models.FileField(upload_to='',null=True)
    img2 = models.FileField(upload_to='',null=True)
    img3 = models.FileField(upload_to='',null=True)
    img4 = models.FileField(upload_to='',null=True)
    amount = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    num = models.CharField(max_length=255,default="")
    group = models.CharField(max_length=500000,default='kharazi_abzarkhayati',null=True)
    color_size = models.JSONField(null=True)
    def __str__(self):
        return self.name
class Kharazi_lavazemtahrir(models.Model):
    name = models.CharField(max_length=250,default='', null=True, help_text="نام نمایشی کالا را وارد کنید")
    text = models.TextField(max_length=10000000000,default='', null=True, help_text="توضیحات کالا را وارد کنید")
    img = models.FileField(upload_to='',null=True)
    img2 = models.FileField(upload_to='',null=True)
    img3 = models.FileField(upload_to='',null=True)
    img4 = models.FileField(upload_to='',null=True)
    amount = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    num = models.CharField(max_length=255,default="")
    group = models.CharField(max_length=500000,default='kharazi_lavazemtahrir',null=True)
    color_size = models.JSONField(null=True)
    def __str__(self):
        return self.name


class Sefaresh_sayer(models.Model):
    name = models.CharField(max_length=250,default='', null=True, help_text="نام نمایشی کالا را وارد کنید")
    text = models.TextField(max_length=10000000000,default='', null=True, help_text="توضیحات کالا را وارد کنید")
    img = models.FileField(upload_to='',null=True)
    img2 = models.FileField(upload_to='',null=True)
    img3 = models.FileField(upload_to='',null=True)
    img4 = models.FileField(upload_to='',null=True)
    amount = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    num = models.CharField(max_length=255,default="")
    group = models.CharField(max_length=500000,default='sefaresh_sayer',null=True)
    color_size = models.JSONField(null=True)
    def __str__(self):
        return self.name

class Sefaresh_mardane(models.Model):
    name = models.CharField(max_length=250,default='', null=True, help_text="نام نمایشی کالا را وارد کنید")
    text = models.TextField(max_length=10000000000,default='', null=True, help_text="توضیحات کالا را وارد کنید")
    img = models.FileField(upload_to='',null=True)
    img2 = models.FileField(upload_to='',null=True)
    img3 = models.FileField(upload_to='',null=True)
    img4 = models.FileField(upload_to='',null=True)
    amount = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    num = models.CharField(max_length=255,default="")
    group = models.CharField(max_length=500000,default='sefaresh_mardane',null=True)
    color_size = models.JSONField(null=True)
    def __str__(self):
        return self.name
class Sefaresh_zanane(models.Model):
    name = models.CharField(max_length=250,default='', null=True, help_text="نام نمایشی کالا را وارد کنید")
    text = models.TextField(max_length=10000000000,default='', null=True, help_text="توضیحات کالا را وارد کنید")
    img = models.FileField(upload_to='',null=True)
    img2 = models.FileField(upload_to='',null=True)
    img3 = models.FileField(upload_to='',null=True)
    img4 = models.FileField(upload_to='',null=True)
    amount = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    num = models.CharField(max_length=255,default="")
    group = models.CharField(max_length=500000,default='sefaresh_zanane',null=True)
    color_size = models.JSONField(null=True)
    def __str__(self):
        return self.name
class Sefaresh_dokhtarane(models.Model):
    name = models.CharField(max_length=250,default='', null=True, help_text="نام نمایشی کالا را وارد کنید")
    text = models.TextField(max_length=10000000000,default='', null=True, help_text="توضیحات کالا را وارد کنید")
    img = models.FileField(upload_to='',null=True)
    img2 = models.FileField(upload_to='',null=True)
    img3 = models.FileField(upload_to='',null=True)
    img4 = models.FileField(upload_to='',null=True)
    amount = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    num = models.CharField(max_length=255,default="")
    group = models.CharField(max_length=500000,default='sefaresh_dokhtarane',null=True)
    color_size = models.JSONField(null=True)
    def __str__(self):
        return self.name
class Sefaresh_pesarane(models.Model):
    name = models.CharField(max_length=250,default='', null=True, help_text="نام نمایشی کالا را وارد کنید")
    text = models.TextField(max_length=10000000000,default='', null=True, help_text="توضیحات کالا را وارد کنید")
    img = models.FileField(upload_to='',null=True)
    img2 = models.FileField(upload_to='',null=True)
    img3 = models.FileField(upload_to='',null=True)
    img4 = models.FileField(upload_to='',null=True)
    amount = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    num = models.CharField(max_length=255,default="")
    group = models.CharField(max_length=500000,default='sefaresh_pesarane',null=True)
    color_size = models.JSONField(null=True)
    def __str__(self):
        return self.name
class Sefaresh_nozadi(models.Model):
    name = models.CharField(max_length=250,default='', null=True, help_text="نام نمایشی کالا را وارد کنید")
    text = models.TextField(max_length=10000000000,default='', null=True, help_text="توضیحات کالا را وارد کنید")
    img = models.FileField(upload_to='',null=True)
    img2 = models.FileField(upload_to='',null=True)
    img3 = models.FileField(upload_to='',null=True)
    img4 = models.FileField(upload_to='',null=True)
    amount = models.CharField(max_length=250,default='', null=True, help_text="آدرس فایل آپلود شده در پیکوفایل را وارد کنید")
    num = models.CharField(max_length=255,default="")
    group = models.CharField(max_length=500000,default='sefaresh_nozadi',null=True)
    color_size = models.JSONField(null=True)
    def __str__(self):
        return self.name



class Cart(models.Model):
    this_id = models.CharField(max_length=255,default="")
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=255,default="")
    amount = models.CharField(max_length=255,default="")
    text = models.CharField(max_length=10000000000,default="")
    kala_address = models.CharField(max_length=255,default="")
    img = models.CharField(max_length=255,default="")
    img2 = models.CharField(max_length=255,default="")
    img3 = models.CharField(max_length=255,default="")
    img4 = models.CharField(max_length=255,default="")
    num = models.CharField(max_length=255,default="")
    group = models.CharField(max_length=255,default="")
    old_num = models.CharField(max_length=255,default="")
    text = models.CharField(max_length=255,default="")
    color = models.CharField(max_length=255,default="")
    size = models.CharField(max_length=255,default="")
    def __str__(self):
        return str(self.user)+" ____ "+str(self.name)+" ____ "+str(self.amount)

class Comment(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=255,default="")
    def __str__(self):
        return self.name
