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