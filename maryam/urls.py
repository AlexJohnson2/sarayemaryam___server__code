from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from . import views

urlpatterns = [
    
    url(r'^account/register$',views.register),
    url(r'^account/checkuserwithpassword$',views.check_user_with_password),
    url(r'^account/edit$',views.edit_account),
    url(r'^account/delete$',views.delete_account),
    url(r'^account/checkadmin$',views.checkadmin),
    
    url('send_message',views.send_message),
    url('send_comment',views.send_comment),
    url('send_signup_class',views.send_signup_class),
    url('send_verify_code', views.send_verify_code),
    
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
    url(r'^kala/parcheh/add_num$',views.add_num_parcheh),
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
    url(r'^kala/kharazi/add_num$',views.add_num_kharazi),
    url(r'^kala/kharazi/remove_num$',views.remove_num_kharazi),


    url(r'^kala/pishnahad_vizhe/getall$',views.get_all_pishnahad_vizhe),
    url(r'^kala/pishnahad_vizhe/edit$',views.edit_pishnahad_vizhe),
    url(r'^kala/pishnahad_vizhe/add$',views.add_new_pishnahad_vizhe),
    url(r'^kala/pishnahad_vizhe/delete$',views.delete_pishnahad_vizhe),
    #url(r'^kala/pishnahad_vizhe/add_num$',views.add_num_pishnahad_vizhe),
    url(r'^kala/pishnahad_vizhe/remove_num$',views.remove_num_pishnahad_vizhe),

    url(r'^kala/users_kalas/getall$',views.get_all_users_kalas),
    url(r'^kala/users_kalas/edit$',views.edit_users_kalas),
    url(r'^kala/users_kalas/add$',views.add_new_users_kalas),
    url(r'^kala/users_kalas/delete$',views.delete_users_kalas),
    #url(r'^kala/users_kalas/add_num$',views.add_num_pishnahad_vizhe),
    url(r'^kala/users_kalas/remove_num$',views.remove_num_users_kalas),


    url(r'^kala/zivar_alat/getall$',views.get_all_zivar_alat),
    url(r'^kala/zivar_alat/edit$',views.edit_zivar_alat),
    url(r'^kala/zivar_alat/add$',views.add_new_zivar_alat),
    url(r'^kala/zivar_alat/delete$',views.delete_zivar_alat),
    #url(r'^kala/zivar_alat/add_num$',views.add_num_zivar_alat),
    url(r'^kala/zivar_alat/remove_num$',views.remove_num_zivar_alat),


    url(r'^kala/pooshak_mardane/getall$',views.get_all_pooshak_mardane),
    url(r'^kala/pooshak_mardane/edit$',views.edit_pooshak_mardane),
    url(r'^kala/pooshak_mardane/add$',views.add_new_pooshak_mardane),
    url(r'^kala/pooshak_mardane/delete$',views.delete_pooshak_mardane),
    url(r'^kala/pooshak_mardane/add_num$',views.add_num_pooshak_mardane),
    url(r'^kala/pooshak_mardane/remove_num$',views.remove_num_pooshak_mardane),

    url(r'^kala/pooshak_zanane/getall$',views.get_all_pooshak_zanane),
    url(r'^kala/pooshak_zanane/edit$',views.edit_pooshak_zanane),
    url(r'^kala/pooshak_zanane/add$',views.add_new_pooshak_zanane),
    url(r'^kala/pooshak_zanane/delete$',views.delete_pooshak_zanane),
    url(r'^kala/pooshak_zanane/add_num$',views.add_num_pooshak_zanane),
    url(r'^kala/pooshak_zanane/remove_num$',views.remove_num_pooshak_zanane),

    url(r'^kala/pooshak_dokhtarane/getall$',views.get_all_pooshak_dokhtarane),
    url(r'^kala/pooshak_dokhtarane/edit$',views.edit_pooshak_dokhtarane),
    url(r'^kala/pooshak_dokhtarane/add$',views.add_new_pooshak_dokhtarane),
    url(r'^kala/pooshak_dokhtarane/delete$',views.delete_pooshak_dokhtarane),
    url(r'^kala/pooshak_dokhtarane/add_num$',views.add_num_pooshak_dokhtarane),
    url(r'^kala/pooshak_dokhtarane/remove_num$',views.remove_num_pooshak_dokhtarane),

    url(r'^kala/pooshak_pesarane/getall$',views.get_all_pooshak_pesarane),
    url(r'^kala/pooshak_pesarane/edit$',views.edit_pooshak_pesarane),
    url(r'^kala/pooshak_pesarane/add$',views.add_new_pooshak_pesarane),
    url(r'^kala/pooshak_pesarane/delete$',views.delete_pooshak_pesarane),
    url(r'^kala/pooshak_pesarane/add_num$',views.add_num_pooshak_pesarane),
    url(r'^kala/pooshak_pesarane/remove_num$',views.remove_num_pooshak_pesarane),

    url(r'^kala/pooshak_nozadi/getall$',views.get_all_pooshak_nozadi),
    url(r'^kala/pooshak_nozadi/edit$',views.edit_pooshak_nozadi),
    url(r'^kala/pooshak_nozadi/add$',views.add_new_pooshak_nozadi),
    url(r'^kala/pooshak_nozadi/delete$',views.delete_pooshak_nozadi),
    url(r'^kala/pooshak_nozadi/add_num$',views.add_num_pooshak_nozadi),
    url(r'^kala/pooshak_nozadi/remove_num$',views.remove_num_pooshak_nozadi),

    url(r'^kala/hejab_chador/getall$',views.get_all_hejab_chador),
    url(r'^kala/hejab_chador/edit$',views.edit_hejab_chador),
    url(r'^kala/hejab_chador/add$',views.add_new_hejab_chador),
    url(r'^kala/hejab_chador/delete$',views.delete_hejab_chador),
    url(r'^kala/hejab_chador/add_num$',views.add_num_hejab_chador),
    url(r'^kala/hejab_chador/remove_num$',views.remove_num_hejab_chador),

    url(r'^kala/hejab_shal/getall$',views.get_all_hejab_shal),
    url(r'^kala/hejab_shal/edit$',views.edit_hejab_shal),
    url(r'^kala/hejab_shal/add$',views.add_new_hejab_shal),
    url(r'^kala/hejab_shal/delete$',views.delete_hejab_shal),
    url(r'^kala/hejab_shal/add_num$',views.add_num_hejab_shal),
    url(r'^kala/hejab_shal/remove_num$',views.remove_num_hejab_shal),

    url(r'^kala/hejab_roosari/getall$',views.get_all_hejab_roosari),
    url(r'^kala/hejab_roosari/edit$',views.edit_hejab_roosari),
    url(r'^kala/hejab_roosari/add$',views.add_new_hejab_roosari),
    url(r'^kala/hejab_roosari/delete$',views.delete_hejab_roosari),
    url(r'^kala/hejab_roosari/add_num$',views.add_num_hejab_roosari),
    url(r'^kala/hejab_roosari/remove_num$',views.remove_num_hejab_roosari),

    url(r'^kala/hejab_saghedast_dastkesh/getall$',views.get_all_hejab_saghedast_dastkesh),
    url(r'^kala/hejab_saghedast_dastkesh/edit$',views.edit_hejab_saghedast_dastkesh),
    url(r'^kala/hejab_saghedast_dastkesh/add$',views.add_new_hejab_saghedast_dastkesh),
    url(r'^kala/hejab_saghedast_dastkesh/delete$',views.delete_hejab_saghedast_dastkesh),
    url(r'^kala/hejab_saghedast_dastkesh/add_num$',views.add_num_hejab_saghedast_dastkesh),
    url(r'^kala/hejab_saghedast_dastkesh/remove_num$',views.remove_num_hejab_saghedast_dastkesh),

    url(r'^kala/hejab_mask_pooshie/getall$',views.get_all_hejab_mask_pooshie),
    url(r'^kala/hejab_mask_pooshie/edit$',views.edit_hejab_mask_pooshie),
    url(r'^kala/hejab_mask_pooshie/add$',views.add_new_hejab_mask_pooshie),
    url(r'^kala/hejab_mask_pooshie/delete$',views.delete_hejab_mask_pooshie),
    url(r'^kala/hejab_mask_pooshie/add_num$',views.add_num_hejab_mask_pooshie),
    url(r'^kala/hejab_mask_pooshie/remove_num$',views.remove_num_hejab_mask_pooshie),

    url(r'^kala/kharazi_abzarkhayati/getall$',views.get_all_kharazi_abzarkhayati),
    url(r'^kala/kharazi_abzarkhayati/edit$',views.edit_kharazi_abzarkhayati),
    url(r'^kala/kharazi_abzarkhayati/add$',views.add_new_kharazi_abzarkhayati),
    url(r'^kala/kharazi_abzarkhayati/delete$',views.delete_kharazi_abzarkhayati),
    url(r'^kala/kharazi_abzarkhayati/add_num$',views.add_num_kharazi_abzarkhayati),
    url(r'^kala/kharazi_abzarkhayati/remove_num$',views.remove_num_kharazi_abzarkhayati),

    url(r'^kala/kharazi_lavazemtahrir/getall$',views.get_all_kharazi_lavazemtahrir),
    url(r'^kala/kharazi_lavazemtahrir/edit$',views.edit_kharazi_lavazemtahrir),
    url(r'^kala/kharazi_lavazemtahrir/add$',views.add_new_kharazi_lavazemtahrir),
    url(r'^kala/kharazi_lavazemtahrir/delete$',views.delete_kharazi_lavazemtahrir),
    url(r'^kala/kharazi_lavazemtahrir/add_num$',views.add_num_kharazi_lavazemtahrir),
    url(r'^kala/kharazi_lavazemtahrir/remove_num$',views.remove_num_kharazi_lavazemtahrir),
    
    url(r'^kala/sefaresh_mardane/getall$',views.get_all_sefaresh_mardane),
    url(r'^kala/sefaresh_mardane/edit$',views.edit_sefaresh_mardane),
    url(r'^kala/sefaresh_mardane/add$',views.add_new_sefaresh_mardane),
    url(r'^kala/sefaresh_mardane/delete$',views.delete_sefaresh_mardane),
    url(r'^kala/sefaresh_mardane/add_num$',views.add_num_sefaresh_mardane),
    url(r'^kala/sefaresh_mardane/remove_num$',views.remove_num_sefaresh_mardane),

    url(r'^kala/sefaresh_zanane/getall$',views.get_all_sefaresh_zanane),
    url(r'^kala/sefaresh_zanane/edit$',views.edit_sefaresh_zanane),
    url(r'^kala/sefaresh_zanane/add$',views.add_new_sefaresh_zanane),
    url(r'^kala/sefaresh_zanane/delete$',views.delete_sefaresh_zanane),
    url(r'^kala/sefaresh_zanane/add_num$',views.add_num_sefaresh_zanane),
    url(r'^kala/sefaresh_zanane/remove_num$',views.remove_num_sefaresh_zanane),

    url(r'^kala/sefaresh_dokhtarane/getall$',views.get_all_sefaresh_dokhtarane),
    url(r'^kala/sefaresh_dokhtarane/edit$',views.edit_sefaresh_dokhtarane),
    url(r'^kala/sefaresh_dokhtarane/add$',views.add_new_sefaresh_dokhtarane),
    url(r'^kala/sefaresh_dokhtarane/delete$',views.delete_sefaresh_dokhtarane),
    url(r'^kala/sefaresh_dokhtarane/add_num$',views.add_num_sefaresh_dokhtarane),
    url(r'^kala/sefaresh_dokhtarane/remove_num$',views.remove_num_sefaresh_dokhtarane),

    url(r'^kala/sefaresh_pesarane/getall$',views.get_all_sefaresh_pesarane),
    url(r'^kala/sefaresh_pesarane/edit$',views.edit_sefaresh_pesarane),
    url(r'^kala/sefaresh_pesarane/add$',views.add_new_sefaresh_pesarane),
    url(r'^kala/sefaresh_pesarane/delete$',views.delete_sefaresh_pesarane),
    url(r'^kala/sefaresh_pesarane/add_num$',views.add_num_sefaresh_pesarane),
    url(r'^kala/sefaresh_pesarane/remove_num$',views.remove_num_sefaresh_pesarane),

    url(r'^kala/sefaresh_nozadi/getall$',views.get_all_sefaresh_nozadi),
    url(r'^kala/sefaresh_nozadi/edit$',views.edit_sefaresh_nozadi),
    url(r'^kala/sefaresh_nozadi/add$',views.add_new_sefaresh_nozadi),
    url(r'^kala/sefaresh_nozadi/delete$',views.delete_sefaresh_nozadi),
    url(r'^kala/sefaresh_nozadi/add_num$',views.add_num_sefaresh_nozadi),
    url(r'^kala/sefaresh_nozadi/remove_num$',views.remove_num_sefaresh_nozadi),

    url(r'^kala/sefaresh_sayer/getall$',views.get_all_sefaresh_sayer),
    url(r'^kala/sefaresh_sayer/edit$',views.edit_sefaresh_sayer),
    url(r'^kala/sefaresh_sayer/add$',views.add_new_sefaresh_sayer),
    url(r'^kala/sefaresh_sayer/delete$',views.delete_sefaresh_sayer),
    url(r'^kala/sefaresh_sayer/add_num$',views.add_num_sefaresh_sayer),
    url(r'^kala/sefaresh_sayer/remove_num$',views.remove_num_sefaresh_sayer),

    url(r'^kala/haraji/getall$',views.get_all_haraji),
    url(r'^kala/haraji/add$',views.add_new_haraji),
    url(r'^kala/haraji/edit$',views.edit_haraji),
    url(r'^kala/haraji/delete$',views.delete_haraji),
    # url(r'^kala/haraji/add_num$'),
    # url(r'^kala/haraji/remove_num$')

    url(r'^cart/add$',views.add_to_cart),
    url(r'^cart/delete$',views.delete_from_cart),
    url(r'^cart/getall$',views.get_all_cart),
    url(r'^cart/edit$',views.edit_cart),

    url(r'upload_img',views.maryam,name="maryam"),

    url(r'^comments$',views.get_comments),
    url(r'^delete_comments$',views.delete_comments),

    url(r'^get_update$',views.get_update),
    
    url(r'^tarikhche_kharid/getall$',views.get_all_tarikhche_kharid),
    url(r'^tarikhche_kharid/add$',views.add_new_tarikhche_kharid),
    url(r'^tarikhche_kharid/ok_level_amadeh_sazi$',views.ok_level_amadeh_sazi),
    url(r'^tarikhche_kharid/ok_level_tahvil_post$',views.ok_level_tahvil_post),
    url(r'^tarikhche_kharid/getall_admin$', views.get_all_tarikhche_kharid_admin),
    
    url(r'^signupclass/add$',views.add_signup_class),
    url(r'^signupclass/getall$',views.get_all_signup_class),

    url(r'payment/get_authority', views.get_authority),

    url(r'^pay/verify$',views.verify_pay),

    url('^this_admin$', views.admin_index),
    url('^this_admin/icons.html$', views.admin_icons),
    url('^this_admin/dashboard.html$', views.admin_index),
    url('^this_admin/login.html$', views.admin_login),
    url('^this_admin/map.html$', views.admin_map),
    url('^this_admin/maps.html$', views.admin_maps),
    url('^this_admin/profile.html$', views.admin_profile),
    url('^this_admin/register.html$', views.admin_register),
    url('^this_admin/tables.html$', views.admin_tables),

]
app_name = "maryam"
