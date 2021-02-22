from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from . import views

urlpatterns = [
    
    url(r'^account/register$',views.register),
    url(r'^account/checkuserwithpassword$',views.check_user_with_password),
    url(r'^account/edit$',views.edit_account),
    url(r'^account/delete$',views.delete_account),
    
    url('send_message',views.send_message),
    
    url(r'^kala/pooshak/getall$',views.get_all_pooshak),
    url(r'^kala/pooshak/add$',views.add_new_pooshak),
    url(r'^kala/pooshak/delete$',views.delete_pooshak),
    url(r'^kala/pooshak/edit$',views.edit_pooshak),
    url(r'^kala/pooshak/add_num$',views.add_num_pooshak),
    url(r'^kala/pooshak/remove_num$',views.remove_num_pooshak),
    
    url(r'^kala/parcheh/getall$',views.get_all_parcheh),
    url(r'^kala/parcheh/add$',views.add_new_parcheh),
    url(r'^kala/parcheh/delete$',views.delete_parcheh),
    url(r'^kala/parcheh/edit$',views.edit_parcheh),
    url(r'^kala/parcheh/add_num$',views.add_new_parcheh),
    url(r'^kala/parcheh/remove_num$',views.remove_num_parcheh),
    
    url(r'^kala/hejab/getall$',views.get_all_hejab),
    url(r'^kala/hejab/edit$',views.edit_hejab),
    url(r'^kala/hejab/add$',views.add_new_hejab),
    url(r'^kala/hejab/delete$',views.delete_hejab),
    url(r'^kala/hejab/add_num$',views.add_num_hejab),
    url(r'^kala/hejab/remove_num$',views.remove_num_hejab),
    
    url(r'^kala/kharazi/getall$',views.get_all_kharazi),
    url(r'^kala/kharazi/edit$',views.edit_kharazi),
    url(r'^kala/kharazi/add$',views.add_new_kharazi),
    url(r'^kala/kharazi/delete$',views.delete_kharazi),
    url(r'^kala/kharazi/add_num$',views.add_new_kharazi),
    url(r'^kala/kharazi/remove_num$',views.remove_num_kharazi),
    
    url(r'^cart/add$',views.add_to_cart),
    url(r'^cart/delete$',views.delete_from_cart),
    url(r'^cart/getall$',views.get_all_cart),

    url(r'upload_img',views.maryam,name="maryam"),

]
app_name = "maryam"