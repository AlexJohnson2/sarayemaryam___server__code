from django.contrib import admin
from .models import *
from import_export.admin import ImportExportModelAdmin

@admin.register(User)
class user(ImportExportModelAdmin):
    pass
@admin.register(Pooshak)
class pooshak(ImportExportModelAdmin):
    pass
@admin.register(Parcheh)
class parcheh(ImportExportModelAdmin):
    pass
@admin.register(Kharazi)
class kharazi(ImportExportModelAdmin):
    pass
@admin.register(Hejab)
class hejab(ImportExportModelAdmin):
    pass
@admin.register(Cart)
class cart(ImportExportModelAdmin):
    pass


@admin.register(Admin_user)
class user(ImportExportModelAdmin):
    pass


@admin.register(Pooshak_mardane)
class user(ImportExportModelAdmin):
    pass
@admin.register(Pooshak_zanane)
class pooshak(ImportExportModelAdmin):
    pass
@admin.register(Pooshak_dokhtarane)
class parcheh(ImportExportModelAdmin):
    pass
@admin.register(Pooshak_pesarane)
class kharazi(ImportExportModelAdmin):
    pass
@admin.register(Pooshak_nozadi)
class hejab(ImportExportModelAdmin):
    pass
@admin.register(Hejab_chador)
class cart(ImportExportModelAdmin):
    pass
@admin.register(Hejab_shal)
class cart(ImportExportModelAdmin):
    pass
@admin.register(Hejab_roosari)
class cart(ImportExportModelAdmin):
    pass
@admin.register(Hejab_saghedast_dastkesh)
class cart(ImportExportModelAdmin):
    pass
@admin.register(Hejab_mask_pooshie)
class cart(ImportExportModelAdmin):
    pass
@admin.register(Kharazi_abzarkhayati)
class cart(ImportExportModelAdmin):
    pass
@admin.register(Kharazi_lavazemtahrir)
class cart(ImportExportModelAdmin):
    pass

@admin.register(Comment)
class cart(ImportExportModelAdmin):
    pass


@admin.register(Sefaresh_mardane)
class cart(ImportExportModelAdmin):
    pass

@admin.register(Sefaresh_zanane)
class cart(ImportExportModelAdmin):
    pass

@admin.register(Sefaresh_dokhtarane)
class cart(ImportExportModelAdmin):
    pass


@admin.register(Sefaresh_pesarane)
class cart(ImportExportModelAdmin):
    pass

@admin.register(Sefaresh_nozadi)
class cart(ImportExportModelAdmin):
    pass


@admin.register(Sefaresh_sayer)
class cart(ImportExportModelAdmin):
    pass