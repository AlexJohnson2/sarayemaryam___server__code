from .models import *
from .forms import ImageForm

from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse,HttpResponseBadRequest
from django import forms
from django.conf import settings
from django.shortcuts import render, redirect
from django.shortcuts import render
from django.http import JsonResponse

import os
import requests
from json import JSONEncoder
from persiantools import digits


# account views
@csrf_exempt
def register(request):
    """
        function for register on the system 
    """
    print(request.POST)
    if 'username' in request.POST and 'password' in request.POST and 'phonenumber' in request.POST and 'tel_id' in request.POST:
        try:
            get_users = User.objects.filter(username=request.POST['username']).get()
            return JsonResponse({'status':'error','result':'repetitious user'},encoder=JSONEncoder)
        except:
            try:
                get_users = User.objects.filter(phone_number=request.POST['phonenumber']).get()
                return JsonResponse({'status':'error','result':'repetitious phonenumber'},encoder=JSONEncoder)
            except:
                User.objects.create(username=request.POST['username'],password=request.POST['password'],phone_number=request.POST['phonenumber'],tel_id=request.POST['tel_id'],address=request.POST['address'],post_code=request.POST['post_code'])
                return JsonResponse({'status':'ok','result':request.POST},encoder=JSONEncoder)

    else:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
    
@csrf_exempt
def check_user_with_password(request):
    """
        function for check user with passeord and return other user datas
    """
    try:
        this_tel_id = User.objects.filter(username=request.POST['username'],password=request.POST['password'])[0].tel_id
        this_phone = User.objects.filter(username=request.POST['username'],password=request.POST['password'])[0].phone_number
        this_address = User.objects.filter(username=request.POST['username'],password=request.POST['password'])[0].address
        this_post_code = User.objects.filter(username=request.POST['username'],password=request.POST['password'])[0].post_code
        return JsonResponse({'status':'ok','result':request.POST,'tel_id':this_tel_id,'this_phone':this_phone,'this_address':this_address,'post_code':this_post_code},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)


@csrf_exempt
def checkadmin(request):
    try:
        user = Admin_user.objects.filter(username=request.POST['username'],password=request.POST['password']).get()
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)


@csrf_exempt
def edit_account(request):
    """
        function for edit account on the system 
    """
    try:
        data = request.POST
        this_user = User.objects.filter(username=data['old_username'])
        new_username = data['new_username']
        new_password = data['new_password']
        new_phonenumber = data['new_phonenumber']
        new_tel_id = data['new_tel_id']
        new_address = data['new_address']
        new_post_code = data['new_post_code']
        this_user.update(username=new_username,password=new_password,phone_number=new_phonenumber,tel_id=new_tel_id,address=new_address,post_code=new_post_code)
        return JsonResponse({'status':'ok','result':data},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
    
@csrf_exempt
def delete_account(request):
    """
        function for account from system
    """
    try:
        data = request.POST
        this_user = User.objects.filter(username=data['username'],password=data['password']).delete()
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)



# get all kalas

@csrf_exempt
def get_all_pooshak(request):
    """
        function for get all pooshak
    """
    all = []
    count = 0
    for pooshak in Pooshak.objects.filter():
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['name']='{1}';this_kala{0}['text']='{2}';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['num']='{6}';all.append(this_kala{0})".format(count,pooshak.name,pooshak.text,pooshak.amount,"http://193.176.243.61:8080/media/"+str(pooshak.img),pooshak.id,pooshak.num))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)
@csrf_exempt
def get_all_parcheh(request):
    """
        function for get all parcheh
    """
    all = []
    count = 0
    for parcheh in Parcheh.objects.all():
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['name']='{1}';this_kala{0}['text']='{2}';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';all.append(this_kala{0})".format(count,parcheh.name,parcheh.text,parcheh.amount,"http://193.176.243.61:8080/media/"+str(parcheh.img),parcheh.id,parcheh.num))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)
@csrf_exempt
def get_all_hejab(request):
    """
        function for get all parcheh
    """
    all = []
    count = 0
    for hejab in Hejab.objects.all():
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['name']='{1}';this_kala{0}['text']='{2}';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';all.append(this_kala{0})".format(count,hejab.name,hejab.text,hejab.amount,"http://193.176.243.61:8080/media/"+str(hejab.img),hejab.id,hejab.num))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)
@csrf_exempt
def get_all_kharazi(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for kharazi in Kharazi.objects.all():
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['name']='{1}';this_kala{0}['text']='{2}';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';all.append(this_kala{0})".format(count,kharazi.name,kharazi.text,kharazi.amount,"http://193.176.243.61:8080/media/"+str(kharazi.img),kharazi.id,kharazi.num))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def get_all_pooshak_mardane(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for pooshak_mardane in Pooshak_mardane.objects.all():
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['name']='{1}';this_kala{0}['text']='{2}';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';all.append(this_kala{0})".format(count,pooshak_mardane.name,pooshak_mardane.text,pooshak_mardane.amount,"http://193.176.243.61:8080/media/"+str(pooshak_mardane.img),pooshak_mardane.id,pooshak_mardane.num))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def get_all_pooshak_zanane(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for pooshak_zanane in Pooshak_zanane.objects.all():
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['name']='{1}';this_kala{0}['text']='{2}';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';all.append(this_kala{0})".format(count,pooshak_zanane.name,pooshak_zanane.text,pooshak_zanane.amount,"http://193.176.243.61:8080/media/"+str(pooshak_zanane.img),pooshak_zanane.id,pooshak_zanane.num))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def get_all_pooshak_dokhtarane(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for pooshak_dokhtarane in Pooshak_dokhtarane.objects.all():
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['name']='{1}';this_kala{0}['text']='{2}';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';all.append(this_kala{0})".format(count,pooshak_dokhtarane.name,pooshak_dokhtarane.text,pooshak_dokhtarane.amount,"http://193.176.243.61:8080/media/"+str(pooshak_dokhtarane.img),pooshak_dokhtarane.id,pooshak_dokhtarane.num))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def get_all_pooshak_pesarane(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for pooshak_pesarane in Pooshak_pesarane.objects.all():
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['name']='{1}';this_kala{0}['text']='{2}';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';all.append(this_kala{0})".format(count,pooshak_pesarane.name,pooshak_pesarane.text,pooshak_pesarane.amount,"http://193.176.243.61:8080/media/"+str(pooshak_pesarane.img),pooshak_pesarane.id,pooshak_pesarane.num))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def get_all_pooshak_nozadi(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for pooshak_nozadi in Pooshak_nozadi.objects.all():
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['name']='{1}';this_kala{0}['text']='{2}';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';all.append(this_kala{0})".format(count,pooshak_nozadi.name,pooshak_nozadi.text,pooshak_nozadi.amount,"http://193.176.243.61:8080/media/"+str(pooshak_nozadi.img),pooshak_nozadi.id,pooshak_nozadi.num))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def get_all_hejab_chador(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for hejab_chador in Hejab_chador.objects.all():
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['name']='{1}';this_kala{0}['text']='{2}';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';all.append(this_kala{0})".format(count,hejab_chador.name,hejab_chador.text,hejab_chador.amount,"http://193.176.243.61:8080/media/"+str(hejab_chador.img),hejab_chador.id,hejab_chador.num))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def get_all_hejab_shal(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for hejab_shal in Hejab_shal.objects.all():
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['name']='{1}';this_kala{0}['text']='{2}';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';all.append(this_kala{0})".format(count,hejab_shal.name,hejab_shal.text,hejab_shal.amount,"http://193.176.243.61:8080/media/"+str(hejab_shal.img),hejab_shal.id,hejab_shal.num))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)


@csrf_exempt
def get_all_hejab_roosari(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for hejab_roosari in Hejab_roosari.objects.all():
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['name']='{1}';this_kala{0}['text']='{2}';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';all.append(this_kala{0})".format(count,hejab_roosari.name,hejab_roosari.text,hejab_roosari.amount,"http://193.176.243.61:8080/media/"+str(hejab_roosari.img),hejab_roosari.id,hejab_roosari.num))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def get_all_hejab_saghedast_dastkesh(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for hejab_saghedast_dastkesh in Hejab_saghedast_dastkesh.objects.all():
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['name']='{1}';this_kala{0}['text']='{2}';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';all.append(this_kala{0})".format(count,hejab_saghedast_dastkesh.name,hejab_saghedast_dastkesh.text,hejab_saghedast_dastkesh.amount,"http://193.176.243.61:8080/media/"+str(hejab_saghedast_dastkesh.img),hejab_saghedast_dastkesh.id,hejab_saghedast_dastkesh.num))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)


@csrf_exempt
def get_all_hejab_mask_pooshie(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for hejab_mask_pooshie in Hejab_mask_pooshie.objects.all():
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['name']='{1}';this_kala{0}['text']='{2}';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';all.append(this_kala{0})".format(count,hejab_mask_pooshie.name,hejab_mask_pooshie.text,hejab_mask_pooshie.amount,"http://193.176.243.61:8080/media/"+str(hejab_mask_pooshie.img),hejab_mask_pooshie.id,hejab_mask_pooshie.num))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def get_all_kharazi_abzarkhayati(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for kharazi_abzarkhayati in Kharazi_abzarkhayati.objects.all():
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['name']='{1}';this_kala{0}['text']='{2}';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';all.append(this_kala{0})".format(count,kharazi_abzarkhayati.name,kharazi_abzarkhayati.text,kharazi_abzarkhayati.amount,"http://193.176.243.61:8080/media/"+str(kharazi_abzarkhayati.img),kharazi_abzarkhayati.id,kharazi_abzarkhayati.num))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def get_all_kharazi_lavazemtahrir(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for kharazi_lavazemtahrir in Kharazi_lavazemtahrir.objects.all():
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['name']='{1}';this_kala{0}['text']='{2}';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';all.append(this_kala{0})".format(count,kharazi_lavazemtahrir.name,kharazi_lavazemtahrir.text,kharazi_lavazemtahrir.amount,"http://193.176.243.61:8080/media/"+str(kharazi_lavazemtahrir.img),kharazi_lavazemtahrir.id,kharazi_lavazemtahrir.num))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)




@csrf_exempt
def get_all_sefaresh_mardane(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for pooshak_mardane in Sefaresh_mardane.objects.all():
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['name']='{1}';this_kala{0}['text']='{2}';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';all.append(this_kala{0})".format(count,pooshak_mardane.name,pooshak_mardane.text,pooshak_mardane.amount,"http://193.176.243.61:8080/media/"+str(pooshak_mardane.img),pooshak_mardane.id,pooshak_mardane.num))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def get_all_sefaresh_zanane(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for pooshak_zanane in Sefaresh_zanane.objects.all():
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['name']='{1}';this_kala{0}['text']='{2}';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';all.append(this_kala{0})".format(count,pooshak_zanane.name,pooshak_zanane.text,pooshak_zanane.amount,"http://193.176.243.61:8080/media/"+str(pooshak_zanane.img),pooshak_zanane.id,pooshak_zanane.num))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def get_all_sefaresh_dokhtarane(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for pooshak_dokhtarane in Sefaresh_dokhtarane.objects.all():
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['name']='{1}';this_kala{0}['text']='{2}';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';all.append(this_kala{0})".format(count,pooshak_dokhtarane.name,pooshak_dokhtarane.text,pooshak_dokhtarane.amount,"http://193.176.243.61:8080/media/"+str(pooshak_dokhtarane.img),pooshak_dokhtarane.id,pooshak_dokhtarane.num))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def get_all_sefaresh_pesarane(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for pooshak_pesarane in Sefaresh_pesarane.objects.all():
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['name']='{1}';this_kala{0}['text']='{2}';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';all.append(this_kala{0})".format(count,pooshak_pesarane.name,pooshak_pesarane.text,pooshak_pesarane.amount,"http://193.176.243.61:8080/media/"+str(pooshak_pesarane.img),pooshak_pesarane.id,pooshak_pesarane.num))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def get_all_sefaresh_nozadi(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for pooshak_nozadi in Sefaresh_nozadi.objects.all():
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['name']='{1}';this_kala{0}['text']='{2}';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';all.append(this_kala{0})".format(count,pooshak_nozadi.name,pooshak_nozadi.text,pooshak_nozadi.amount,"http://193.176.243.61:8080/media/"+str(pooshak_nozadi.img),pooshak_nozadi.id,pooshak_nozadi.num))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def get_all_sefaresh_sayer(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for pooshak_nozadi in Sefaresh_sayer.objects.all():
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['name']='{1}';this_kala{0}['text']='{2}';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';all.append(this_kala{0})".format(count,pooshak_nozadi.name,pooshak_nozadi.text,pooshak_nozadi.amount,"http://193.176.243.61:8080/media/"+str(pooshak_nozadi.img),pooshak_nozadi.id,pooshak_nozadi.num))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)




# add new kalas views


@csrf_exempt
def add_new_parcheh(request):
    try:
        data = request.POST
        Parcheh.objects.create(name=data['name'],text=data['text'],img=data['img'],amount=data['amount'],num=data['num'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
    
@csrf_exempt
def add_new_pooshak(request):
    try:
        data = request.POST
        Pooshak.objects.create(name=data['name'],text=data['text'],img=data['img'],amount=data['amount'],num=data['num'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
    
@csrf_exempt
def add_new_hejab(request):
    try:
        data = request.POST
        Hejab.objects.create(name=data['name'],text=data['text'],img=data['img'],amount=data['amount'],num=data['num'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
    
@csrf_exempt
def add_new_kharazi(request):
    try:
        data = request.POST
        Kharazi.objects.create(name=data['name'],text=data['text'],img=data['img'],amount=data['amount'],num=data['num'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)


@csrf_exempt
def add_new_pooshak_mardane(request):
    try:
        data = request.POST
        Pooshak_mardane.objects.create(name=data['name'],text=data['text'],img=data['img'],amount=data['amount'],num=data['num'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_pooshak_zanane(request):
    try:
        data = request.POST
        Pooshak_zanane.objects.create(name=data['name'],text=data['text'],img=data['img'],amount=data['amount'],num=data['num'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_pooshak_dokhtarane(request):
    try:
        data = request.POST
        Pooshak_dokhtarane.objects.create(name=data['name'],text=data['text'],img=data['img'],amount=data['amount'],num=data['num'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_pooshak_pesarane(request):
    try:
        data = request.POST
        Pooshak_pesarane.objects.create(name=data['name'],text=data['text'],img=data['img'],amount=data['amount'],num=data['num'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_pooshak_nozadi(request):
    try:
        data = request.POST
        Pooshak_nozadi.objects.create(name=data['name'],text=data['text'],img=data['img'],amount=data['amount'],num=data['num'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_hejab_chador(request):
    try:
        data = request.POST
        Hejab_chador.objects.create(name=data['name'],text=data['text'],img=data['img'],amount=data['amount'],num=data['num'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_hejab_shal(request):
    try:
        data = request.POST
        Hejab_shal.objects.create(name=data['name'],text=data['text'],img=data['img'],amount=data['amount'],num=data['num'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_hejab_roosari(request):
    try:
        data = request.POST
        Hejab_roosari.objects.create(name=data['name'],text=data['text'],img=data['img'],amount=data['amount'],num=data['num'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_hejab_saghedast_dastkesh(request):
    try:
        data = request.POST
        Hejab_saghedast_dastkesh.objects.create(name=data['name'],text=data['text'],img=data['img'],amount=data['amount'],num=data['num'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_hejab_mask_pooshie(request):
    try:
        data = request.POST
        Hejab_mask_pooshie.objects.create(name=data['name'],text=data['text'],img=data['img'],amount=data['amount'],num=data['num'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_kharazi_abzarkhayati(request):
    try:
        data = request.POST
        Kharazi_abzarkhayati.objects.create(name=data['name'],text=data['text'],img=data['img'],amount=data['amount'],num=data['num'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_kharazi_lavazemtahrir(request):
    try:
        data = request.POST
        Kharazi_lavazemtahrir.objects.create(name=data['name'],text=data['text'],img=data['img'],amount=data['amount'],num=data['num'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)







@csrf_exempt
def add_new_sefaresh_mardane(request):
    try:
        data = request.POST
        Sefaresh_mardane.objects.create(name=data['name'],text=data['text'],img=data['img'],amount=data['amount'],num=data['num'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_sefaresh_zanane(request):
    try:
        data = request.POST
        Sefaresh_zanane.objects.create(name=data['name'],text=data['text'],img=data['img'],amount=data['amount'],num=data['num'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_sefaresh_dokhtarane(request):
    try:
        data = request.POST
        Sefaresh_dokhtarane.objects.create(name=data['name'],text=data['text'],img=data['img'],amount=data['amount'],num=data['num'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_sefaresh_pesarane(request):
    try:
        data = request.POST
        Sefaresh_pesarane.objects.create(name=data['name'],text=data['text'],img=data['img'],amount=data['amount'],num=data['num'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_sefaresh_nozadi(request):
    try:
        data = request.POST
        Sefaresh_nozadi.objects.create(name=data['name'],text=data['text'],img=data['img'],amount=data['amount'],num=data['num'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_sefaresh_sayer(request):
    try:
        data = request.POST
        Sefaresh_sayer.objects.create(name=data['name'],text=data['text'],img=data['img'],amount=data['amount'],num=data['num'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)



# delete models.object functions  

@csrf_exempt
def delete_parcheh(request):
    try:
        data = request.POST
        Parcheh.objects.filter(id=int(data['id'])).delete()
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
    
@csrf_exempt
def delete_pooshak(request):
    try:
        data = request.POST
        Pooshak.objects.filter(id=int(data['id'])).delete()
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
    
@csrf_exempt
def delete_hejab(request):
    try:
        data = request.POST
        Hejab.objects.filter(id=int(data['id'])).delete()
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
    
@csrf_exempt
def delete_kharazi(request):
    try:
        data = request.POST
        Kharazi.objects.filter(id=int(data['id'])).delete()
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
    
@csrf_exempt
def delete_pooshak_mardane(request):
    try:
        data = request.POST
        Pooshak_mardane.objects.filter(id=int(data['id'])).delete()
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
    
@csrf_exempt
def delete_pooshak_zanane(request):
    try:
        data = request.POST
        Pooshak_zanane.objects.filter(id=int(data['id'])).delete()
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
    
@csrf_exempt
def delete_pooshak_dokhtarane(request):
    try:
        data = request.POST
        Pooshak_dokhtarane.objects.filter(id=int(data['id'])).delete()
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def delete_pooshak_pesarane(request):
    try:
        data = request.POST
        Pooshak_pesarane.objects.filter(id=int(data['id'])).delete()
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def delete_pooshak_nozadi(request):
    try:
        data = request.POST
        Pooshak_nozadi.objects.filter(id=int(data['id'])).delete()
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def delete_hejab_chador(request):
    try:
        data = request.POST
        Hejab_chador.objects.filter(id=int(data['id'])).delete()
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def delete_hejab_shal(request):
    try:
        data = request.POST
        Hejab_shal.objects.filter(id=int(data['id'])).delete()
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)


@csrf_exempt
def delete_hejab_roosari(request):
    try:
        data = request.POST
        Hejab_roosari.objects.filter(id=int(data['id'])).delete()
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def delete_hejab_saghedast_dastkesh(request):
    try:
        data = request.POST
        Hejab_saghedast_dastkesh.objects.filter(id=int(data['id'])).delete()
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def delete_hejab_mask_pooshie(request):
    try:
        data = request.POST
        Hejab_mask_pooshie.objects.filter(id=int(data['id'])).delete()
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)


@csrf_exempt
def delete_kharazi_abzarkhayati(request):
    try:
        data = request.POST
        Kharazi_abzarkhayati.objects.filter(id=int(data['id'])).delete()
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def delete_kharazi_lavazemtahrir(request):
    try:
        data = request.POST
        Kharazi_lavazemtahrir.objects.filter(id=int(data['id'])).delete()
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
    
    



@csrf_exempt
def delete_sefaresh_mardane(request):
    try:
        data = request.POST
        Sefaresh_mardane.objects.filter(id=int(data['id'])).delete()
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
    
@csrf_exempt
def delete_sefaresh_zanane(request):
    try:
        data = request.POST
        Sefaresh_zanane.objects.filter(id=int(data['id'])).delete()
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
    
@csrf_exempt
def delete_sefaresh_dokhtarane(request):
    try:
        data = request.POST
        Sefaresh_dokhtarane.objects.filter(id=int(data['id'])).delete()
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def delete_sefaresh_pesarane(request):
    try:
        data = request.POST
        Sefaresh_pesarane.objects.filter(id=int(data['id'])).delete()
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def delete_sefaresh_nozadi(request):
    try:
        data = request.POST
        Sefaresh_nozadi.objects.filter(id=int(data['id'])).delete()
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def delete_sefaresh_sayer(request):
    try:
        data = request.POST
        Sefaresh_sayer.objects.filter(id=int(data['id'])).delete()
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)


# edit models.object functions  
    
@csrf_exempt
def edit_parcheh(request):
    try:
        data = request.POST
        this_kala = Parcheh.objects.filter(id=int(data['id']))
        this_name = data['name']
        this_text = data['text']
        this_img = data['img']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,amount=this_amount,num=this_num,tag=data['tag'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
    
@csrf_exempt
def edit_pooshak(request):
    # try:
    data = request.POST
    this_kala = Pooshak.objects.filter(id=int(data['id']))
    this_name = data['name']
    this_text = data['text']
    this_img = data['img']
    this_amount = data['amount']
    this_num = data['num']
    this_kala.update(name=this_name,text=this_text,img=this_img,amount=this_amount,num=this_num,tag=data['tag'])
    return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    # except:
    #     return JsonResponse({'status':'error'},encoder=JSONEncoder)
    
@csrf_exempt
def edit_hejab(request):
    try:
        data = request.POST
        this_kala = Hejab.objects.filter(id=int(data['id']))
        this_name = data['name']
        this_text = data['text']
        this_img = data['img']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,amount=this_amount,num=this_num,tag=data['tag'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
    
@csrf_exempt
def edit_kharazi(request):
    try:
        data = request.POST
        this_kala = Kharazi.objects.filter(id=int(data['id']))
        this_name = data['name']
        this_text = data['text']
        this_img = data['img']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,amount=this_amount,num=this_num,tag=data['tag'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
    
@csrf_exempt
def edit_pooshak_mardane(request):
    try:
        data = request.POST
        this_kala = Pooshak_mardane.objects.filter(id=int(data['id']))
        this_name = data['name']
        this_text = data['text']
        this_img = data['img']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,amount=this_amount,num=this_num,tag=data['tag'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)


@csrf_exempt
def edit_pooshak_zanane(request):
    try:
        data = request.POST
        this_kala = Pooshak_zanane.objects.filter(id=int(data['id']))
        this_name = data['name']
        this_text = data['text']
        this_img = data['img']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,amount=this_amount,num=this_num,tag=data['tag'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def edit_pooshak_dokhtarane(request):
    try:
        data = request.POST
        this_kala = Pooshak_dokhtarane.objects.filter(id=int(data['id']))
        this_name = data['name']
        this_text = data['text']
        this_img = data['img']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,amount=this_amount,num=this_num,tag=data['tag'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def edit_pooshak_pesarane(request):
    try:
        data = request.POST
        this_kala = Pooshak_pesarane.objects.filter(id=int(data['id']))
        this_name = data['name']
        this_text = data['text']
        this_img = data['img']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,amount=this_amount,num=this_num,tag=data['tag'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def edit_pooshak_nozadi(request):
    try:
        data = request.POST
        this_kala = Pooshak_nozadi.objects.filter(id=int(data['id']))
        this_name = data['name']
        this_text = data['text']
        this_img = data['img']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,amount=this_amount,num=this_num,tag=data['tag'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def edit_hejab_chador(request):
    try:
        data = request.POST
        this_kala = Hejab_chador.objects.filter(id=int(data['id']))
        this_name = data['name']
        this_text = data['text']
        this_img = data['img']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,amount=this_amount,num=this_num,tag=data['tag'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def edit_hejab_shal(request):
    try:
        data = request.POST
        this_kala = Hejab_shal.objects.filter(id=int(data['id']))
        this_name = data['name']
        this_text = data['text']
        this_img = data['img']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,amount=this_amount,num=this_num,tag=data['tag'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def edit_hejab_roosari(request):
    try:
        data = request.POST
        this_kala = Hejab_roosari.objects.filter(id=int(data['id']))
        this_name = data['name']
        this_text = data['text']
        this_img = data['img']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,amount=this_amount,num=this_num,tag=data['tag'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def edit_hejab_saghedast_dastkesh(request):
    try:
        data = request.POST
        this_kala = Hejab_saghedast_dastkesh.objects.filter(id=int(data['id']))
        this_name = data['name']
        this_text = data['text']
        this_img = data['img']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,amount=this_amount,num=this_num,tag=data['tag'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def edit_hejab_mask_pooshie(request):
    try:
        data = request.POST
        this_kala = Hejab_mask_pooshie.objects.filter(id=int(data['id']))
        this_name = data['name']
        this_text = data['text']
        this_img = data['img']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,amount=this_amount,num=this_num,tag=data['tag'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)


@csrf_exempt
def edit_kharazi_abzarkhayati(request):
    try:
        data = request.POST
        this_kala = Kharazi_abzarkhayati.objects.filter(id=int(data['id']))
        this_name = data['name']
        this_text = data['text']
        this_img = data['img']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,amount=this_amount,num=this_num,tag=data['tag'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def edit_kharazi_lavazemtahrir(request):
    try:
        data = request.POST
        this_kala = Kharazi_lavazemtahrir.objects.filter(id=int(data['id']))
        this_name = data['name']
        this_text = data['text']
        this_img = data['img']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,amount=this_amount,num=this_num,tag=data['tag'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)








@csrf_exempt
def edit_sefaresh_mardane(request):
    try:
        data = request.POST
        this_kala = Sefaresh_mardane.objects.filter(id=int(data['id']))
        this_name = data['name']
        this_text = data['text']
        this_img = data['img']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,amount=this_amount,num=this_num,tag=data['tag'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)


@csrf_exempt
def edit_sefaresh_zanane(request):
    try:
        data = request.POST
        this_kala = Sefaresh_zanane.objects.filter(id=int(data['id']))
        this_name = data['name']
        this_text = data['text']
        this_img = data['img']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,amount=this_amount,num=this_num,tag=data['tag'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def edit_sefaresh_dokhtarane(request):
    try:
        data = request.POST
        this_kala = Sefaresh_dokhtarane.objects.filter(id=int(data['id']))
        this_name = data['name']
        this_text = data['text']
        this_img = data['img']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,amount=this_amount,num=this_num,tag=data['tag'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def edit_sefaresh_pesarane(request):
    try:
        data = request.POST
        this_kala = Sefaresh_pesarane.objects.filter(id=int(data['id']))
        this_name = data['name']
        this_text = data['text']
        this_img = data['img']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,amount=this_amount,num=this_num,tag=data['tag'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def edit_sefaresh_nozadi(request):
    try:
        data = request.POST
        this_kala = Sefaresh_nozadi.objects.filter(id=int(data['id']))
        this_name = data['name']
        this_text = data['text']
        this_img = data['img']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,amount=this_amount,num=this_num,tag=data['tag'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def edit_sefaresh_sayer(request):
    try:
        data = request.POST
        this_kala = Sefaresh_sayer.objects.filter(id=int(data['id']))
        this_name = data['name']
        this_text = data['text']
        this_img = data['img']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,amount=this_amount,num=this_num,tag=data['tag'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)



    
# add to num's from models.objects
    
@csrf_exempt
def add_num_pooshak(request):
    try:
        data = request.POST
        this_kala = Pooshak.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if old_num=="ناموجود":
            old_num = 0
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        else:
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)


    
@csrf_exempt
def add_num_hejab(request):
    try:
        data = request.POST
        this_kala = Hejab.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if old_num=="ناموجود":
            old_num = 0
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        else:
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

 
@csrf_exempt
def add_num_parcheh(request):
    try:
        data = request.POST
        this_kala = Parcheh.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if old_num=="ناموجود":
            old_num = 0
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        else:
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)


@csrf_exempt
def add_num_kharazi(request):
    try:
        data = request.POST
        this_kala = Kharazi.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if old_num=="ناموجود":
            old_num = 0
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        else:
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_num_pooshak_mardane(request):
    try:
        data = request.POST
        this_kala = Pooshak_mardane.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if old_num=="ناموجود":
            old_num = 0
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        else:
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_num_pooshak_zanane(request):
    try:
        data = request.POST
        this_kala = Pooshak_zanane.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if old_num=="ناموجود":
            old_num = 0
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        else:
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_num_pooshak_dokhtarane(request):
    try:
        data = request.POST
        this_kala = Pooshak_dokhtarane.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if old_num=="ناموجود":
            old_num = 0
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        else:
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_num_pooshak_pesarane(request):
    try:
        data = request.POST
        this_kala = Pooshak_pesarane.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if old_num=="ناموجود":
            old_num = 0
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        else:
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_num_pooshak_nozadi(request):
    try:
        data = request.POST
        this_kala = Pooshak_nozadi.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if old_num=="ناموجود":
            old_num = 0
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        else:
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_num_hejab_chador(request):
    try:
        data = request.POST
        this_kala = Hejab_chador.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if old_num=="ناموجود":
            old_num = 0
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        else:
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_num_hejab_shal(request):
    try:
        data = request.POST
        this_kala = Hejab_shal.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if old_num=="ناموجود":
            old_num = 0
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        else:
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)


@csrf_exempt
def add_num_hejab_roosari(request):
    try:
        data = request.POST
        this_kala = Hejab_roosari.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if old_num=="ناموجود":
            old_num = 0
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        else:
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)


@csrf_exempt
def add_num_hejab_saghedast_dastkesh(request):
    try:
        data = request.POST
        this_kala = Hejab_saghedast_dastkesh.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if old_num=="ناموجود":
            old_num = 0
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        else:
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_num_hejab_mask_pooshie(request):
    try:
        data = request.POST
        this_kala = Hejab_mask_pooshie.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if old_num=="ناموجود":
            old_num = 0
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        else:
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_num_kharazi_abzarkhayati(request):
    try:
        data = request.POST
        this_kala = Kharazi_abzarkhayati.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if old_num=="ناموجود":
            old_num = 0
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        else:
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_num_kharazi_lavazemtahrir(request):
    try:
        data = request.POST
        this_kala = Kharazi_lavazemtahrir.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if old_num=="ناموجود":
            old_num = 0
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        else:
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)










@csrf_exempt
def add_num_sefaresh_mardane(request):
    try:
        data = request.POST
        this_kala = Sefaresh_mardane.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if old_num=="ناموجود":
            old_num = 0
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        else:
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_num_sefaresh_zanane(request):
    try:
        data = request.POST
        this_kala = Sefaresh_zanane.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if old_num=="ناموجود":
            old_num = 0
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        else:
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_num_sefaresh_dokhtarane(request):
    try:
        data = request.POST
        this_kala = Sefaresh_dokhtarane.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if old_num=="ناموجود":
            old_num = 0
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        else:
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_num_sefaresh_pesarane(request):
    try:
        data = request.POST
        this_kala = Sefaresh_pesarane.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if old_num=="ناموجود":
            old_num = 0
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        else:
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_num_sefaresh_nozadi(request):
    try:
        data = request.POST
        this_kala = Sefaresh_nozadi.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if old_num=="ناموجود":
            old_num = 0
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        else:
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_num_sefaresh_sayer(request):
    try:
        data = request.POST
        this_kala = Sefaresh_sayer.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if old_num=="ناموجود":
            old_num = 0
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        else:
            new_num = int(digits.en_to_fa(old_num))+digits.en_to_fa(int(data['num']))
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)




# remove num's from models.objects

@csrf_exempt
def remove_num_pooshak(request):
    try:
        data = request.POST
        this_kala = Pooshak.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
 

@csrf_exempt
def remove_num_parcheh(request):
    try:
        data = request.POST
        this_kala = Parcheh.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)


@csrf_exempt
def remove_num_kharazi(request):
    try:
        data = request.POST
        this_kala = Kharazi.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

    
@csrf_exempt
def remove_num_hejab(request):
    try:
        data = request.POST
        this_kala = Hejab.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def remove_num_pooshak_mardane(request):
    try:
        data = request.POST
        this_kala = Pooshak_mardane.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def remove_num_pooshak_zanane(request):
    try:
        data = request.POST
        this_kala = Pooshak_zanane.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def remove_num_pooshak_dokhtarane(request):
    try:
        data = request.POST
        this_kala = Pooshak_dokhtarane.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def remove_num_pooshak_pesarane(request):
    try:
        data = request.POST
        this_kala = Pooshak_pesarane.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)


@csrf_exempt
def remove_num_pooshak_nozadi(request):
    try:
        data = request.POST
        this_kala = Pooshak_nozadi.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def remove_num_hejab_chador(request):
    try:
        data = request.POST
        this_kala = Hejab_chador.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def remove_num_hejab_shal(request):
    try:
        data = request.POST
        this_kala = Hejab_shal.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)


@csrf_exempt
def remove_num_hejab_roosari(request):
    try:
        data = request.POST
        this_kala = Hejab_roosari.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def remove_num_hejab_saghedast_dastkesh(request):
    try:
        data = request.POST
        this_kala = Hejab_saghedast_dastkesh.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def remove_num_hejab_mask_pooshie(request):
    try:
        data = request.POST
        this_kala = Hejab_mask_pooshie.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)


@csrf_exempt
def remove_num_kharazi_abzarkhayati(request):
    try:
        data = request.POST
        this_kala = Kharazi_abzarkhayati.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)


@csrf_exempt
def remove_num_kharazi_lavazemtahrir(request):
    try:
        data = request.POST
        this_kala = Kharazi_lavazemtahrir.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)











@csrf_exempt
def remove_num_sefaresh_mardane(request):
    try:
        data = request.POST
        this_kala = Sefaresh_mardane.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def remove_num_sefaresh_zanane(request):
    try:
        data = request.POST
        this_kala = Sefaresh_zanane.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def remove_num_sefaresh_dokhtarane(request):
    try:
        data = request.POST
        this_kala = Sefaresh_dokhtarane.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def remove_num_sefaresh_pesarane(request):
    try:
        data = request.POST
        this_kala = Sefaresh_pesarane.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)


@csrf_exempt
def remove_num_sefaresh_nozadi(request):
    try:
        data = request.POST
        this_kala = Sefaresh_nozadi.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def remove_num_sefaresh_sayer(request):
    try:
        data = request.POST
        this_kala = Sefaresh_sayer.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)


# upload img to django function

@csrf_exempt
def maryam(request):
    infos = Pooshak.objects.all()
    if request.method == 'POST':
        form = ImageForm(request.POST, request.FILES)
        if form.is_valid():
            Pooshak(img=request.FILES['image']).save()
            # return redirect('maryam:maryam')
            # return JsonResponse({'status':'ok'},encoder=JSONEncoder)
            return render(request, 'upload_img.html', {'form':form, 'infos':infos,'status':f'{str(request.FILES["image"])}'})

    else:   
        form = ImageForm()
    return render(request, 'upload_img.html', {'form':form, 'infos':infos,'status':'هنوز فایلی آپلود نشده است'})



# send message to eitaa

@csrf_exempt
def send_message(request):
    data = {"chat_id":"7819430","text":request.POST['text']}
    requests.post("https://eitaayar.ir/api/bot20579:cdf451e2-577d-46bc-a768-59c764c41aeb/sendmessage",data=data)
    return JsonResponse({'status':'ok','result':request.POST},encoder=JSONEncoder)



@csrf_exempt
def send_comment(request):
    print(request.POST)
    data = {"chat_id":"7892910","text":request.POST['text']}
    requests.post("https://eitaayar.ir/api/bot20579:cdf451e2-577d-46bc-a768-59c764c41aeb/sendmessage",data=data)
    this_user = User.objects.filter(username=request.POST['user'])[0]
    Comment.objects.create(user=this_user,name=request.POST['text'][27:])
    return JsonResponse({'status':'ok','result':request.POST},encoder=JSONEncoder)


@csrf_exempt
def send_signup_class(request):
    print(request.POST)
    data = {"chat_id":"7893474","text":request.POST['text']}
    requests.post("https://eitaayar.ir/api/bot20579:cdf451e2-577d-46bc-a768-59c764c41aeb/sendmessage",data=data)
    return JsonResponse({'status':'ok','result':request.POST},encoder=JSONEncoder)

# cart views
    
@csrf_exempt
def add_to_cart(request):
    # try:
    data = request.POST
    this_user = User.objects.filter(username=data['user'])[0]
    this_kala = Cart.objects.create(user=this_user,name=data['name'],amount=data['amount'],kala_address=data['kala_address'],img=data['img'],num=data['num'],group=data['group'],this_id=data['this_id'])
    return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    # except:
    #     return JsonResponse({'status':'error'},encoder=JSONEncoder)
@csrf_exempt
def delete_from_cart(request):
    try:
        data = request.POST
        print(data)
        this_user = User.objects.filter(username=data['user'])[0]
        this_kala = Cart.objects.filter(user=this_user,name=data['name'],amount=data['amount'],kala_address=data['kala_address'],img=data['img']).delete()
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def get_all_cart(request):
    all = []
    count = 0
    data = request.POST
    this_user = User.objects.filter(username=data['user'])[0]
    this_user_cart = Cart.objects.filter(user=this_user)
    for kala in this_user_cart:
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']='{7}';this_kala{0}['name']='{1}';this_kala{0}['amount']='{2}';this_kala{0}['kala_address']='{3}';this_kala{0}['img']='{4}';this_kala{0}['num']='{5}';this_kala{0}['group']='{6}';all.append(this_kala{0})".format(count,kala.name,kala.amount,kala.kala_address,kala.img,kala.num,kala.group,kala.this_id))
    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)
@csrf_exempt
def edit_cart(request):
    # try:
    data = request.POST
    this_user = User.objects.filter(username=data['user'])[0]
    this_kala = Cart.objects.filter(user=this_user,name=data['name'])
    this_kala.update(num=data['num'])
    return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    # except:
    #     return JsonResponse({'status':'error'},encoder=JSONEncoder)


# comment views

@csrf_exempt
def get_comments(request):
    data = request.POST
    all = []
    count = 0
    this_user = User.objects.filter(username=data['user'])[0]
    this_user_comments = Comment.objects.filter(user=this_user)
    for comment in this_user_comments:
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['name']='{1}';all.append(this_kala{0})".format(count,comment.name))
    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)


@csrf_exempt
def delete_comments(request):
    data = request.POST
    for comment in Comment.objects.filter(name=data['name']):
        comment.delete()
    return JsonResponse({'status':'ok'},encoder=JSONEncoder)


@csrf_exempt
def get_update(request):
    new_update = {}
    count = 0
    try:
        updates = Update.objects.all()[0]
        new_update['version'] = updates.version
        new_update['name'] = updates.name
        new_update['link'] = updates.link
        new_update_list = updates.new
        new_update['new'] = new_update_list.split(";")
    except:
        new_update = "Not New Update"
    return JsonResponse({'status':'ok','result': new_update},encoder=JSONEncoder)