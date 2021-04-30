from .models import *
from .forms import ImageForm

from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse,HttpResponseBadRequest
from django import forms
from django.conf import settings
from django.shortcuts import render, redirect
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib import messages as message
from django.contrib.messages import constants as messages


import os
import requests
from json import JSONEncoder
from persiantools import digits
import json
from suds.client import Client
from datetime import datetime


@csrf_exempt
def admin_login(request):
    return render(request, 'argon-dashboard-master/login.html')


@csrf_exempt
def admin_icons(request):
    context = {}

    users = User.objects.all().reverse()

    if 'submit' in request.POST:
        print(request.POST)
        User.objects.filter(username=request.POST['username']).delete()

    context['users'] = reversed(users)
    return render(request, 'argon-dashboard-master/icons.html', context)


@csrf_exempt
def admin_map(request):
    return render(request, 'argon-dashboard-master/map.html')

@csrf_exempt
def admin_maps(request):
    return render(request, 'argon-dashboard-master/maps.html')

@csrf_exempt
def admin_profile(request):
    return render(request, 'argon-dashboard-master/profile.html')

@csrf_exempt
def admin_register(request):
    return render(request, 'argon-dashboard-master/register.html')

@csrf_exempt
def admin_tables(request):
    return render(request, 'argon-dashboard-master/tables.html')

@csrf_exempt
def admin_index(request):
    users_list = User.objects.all()


    context = {}

    context['users'] = users_list
    context['users_length'] = len(users_list)
    context['tarikhche_length'] = len(Tarikhche_kharid.objects.all())

    all_kala = 0
    
    all_kala += len(Pooshak_mardane.objects.all())
    all_kala += len(Pishnahad_Vizhe.objects.all())
    all_kala += len(Zivar_Alat.objects.all())
    all_kala += len(Haraji.objects.all())
    all_kala += len(Pooshak_zanane.objects.all())
    all_kala += len(Pooshak_dokhtarane.objects.all())
    all_kala += len(Pooshak_nozadi.objects.all())
    all_kala += len(Pooshak_pesarane.objects.all())
    all_kala += len(Parcheh.objects.all())
    all_kala += len(Hejab_chador.objects.all())
    all_kala += len(Hejab_shal.objects.all())
    all_kala += len(Hejab_roosari.objects.all())
    all_kala += len(Hejab_saghedast_dastkesh.objects.all())
    all_kala += len(Hejab_mask_pooshie.objects.all())
    all_kala += len(Kharazi_abzarkhayati.objects.all())
    all_kala += len(Kharazi_lavazemtahrir.objects.all())
    all_kala += len(Sefaresh_sayer.objects.all())
    all_kala += len(Sefaresh_mardane.objects.all())
    all_kala += len(Sefaresh_zanane.objects.all())
    all_kala += len(Sefaresh_dokhtarane.objects.all())
    all_kala += len(Sefaresh_pesarane.objects.all())
    all_kala += len(Sefaresh_nozadi.objects.all())

    users_kalas_length = len(Users_kalas.objects.all())

    context['all_kala'] = all_kala
    context['users_kalas_length'] = users_kalas_length

    MESSAGE_TAGS = {
    messages.ERROR: 'danger'
    }

    all_tarikhche_kharid = Tarikhche_kharid.objects.all() # [:10]

    all = []
    all_amount = 0
    for i in all_tarikhche_kharid:
        for j in json.loads(str(i.kalas).replace("'",'"'))['result']:
            all_amount += int(j['amount'])
        if i.status == 'OK':
            status = 'موفق'
        else:
            status = 'ناموفق'
        test = {'username': i.username, 'all_amount': all_amount, 'status': status}
        all.append(test)

    context['all_tarikhche_kharid'] = all

    tarikhche_month_1 = Tarikhche_kharid.objects.filter(date__month="01", date__year="2021")
    tarikhche_month_2 = Tarikhche_kharid.objects.filter(date__month="02", date__year="2021")
    tarikhche_month_3 = Tarikhche_kharid.objects.filter(date__month="03", date__year="2021")
    tarikhche_month_4 = Tarikhche_kharid.objects.filter(date__month="04", date__year="2021")
    tarikhche_month_5 = Tarikhche_kharid.objects.filter(date__month="05", date__year="2021")
    tarikhche_month_6 = Tarikhche_kharid.objects.filter(date__month="06", date__year="2021")
    tarikhche_month_7 = Tarikhche_kharid.objects.filter(date__month="07", date__year="2021")
    tarikhche_month_8 = Tarikhche_kharid.objects.filter(date__month="08", date__year="2021")
    tarikhche_month_9 = Tarikhche_kharid.objects.filter(date__month="09", date__year="2021")
    tarikhche_month_10 = Tarikhche_kharid.objects.filter(date__month="10", date__year="2021")
    tarikhche_month_11 = Tarikhche_kharid.objects.filter(date__month="11", date__year="2021")
    tarikhche_month_12 = Tarikhche_kharid.objects.filter(date__month="12", date__year="2021")

    all_tarikhche = [len(tarikhche_month_1), len(tarikhche_month_2),len(tarikhche_month_3),len(tarikhche_month_4),len(tarikhche_month_5),len(tarikhche_month_6),len(tarikhche_month_7),len(tarikhche_month_8),len(tarikhche_month_9),len(tarikhche_month_10),len(tarikhche_month_11),len(tarikhche_month_12)]
    context['all_tarikhche'] = all_tarikhche

    test = {"data":{"datasets":[{"data":[len(tarikhche_month_1), len(tarikhche_month_2),len(tarikhche_month_3),len(tarikhche_month_4),len(tarikhche_month_5),len(tarikhche_month_6),len(tarikhche_month_7),len(tarikhche_month_8),len(tarikhche_month_9),]}]}}
    # messages.debug(request, 'The following SQL statements were executed: ') 
    # messages.info(request, 'All items on this page have free shipping.')
    # message.success(request, 'Email sent successfully.')
    # messages.warning(request, 'You will need to change your password in one week.')
    # messages.error(request, 'We could not process your request at this time.')

    return render(request, 'argon-dashboard-master/index.html', context)
    

# account views
@csrf_exempt
def send_verify_code(request):
    data = request.POST
    phone = data['phone']
    code = data['code']

    e_digits = "0123456789"
    f_digits = "۰۱۲۳۴۵۶۷۸۹"

    for i in range(len(e_digits)):
        phone = phone.replace(f_digits[i], e_digits[i])

    r = requests.get(f"https://login.niazpardaz.ir/SMSInOutBox/SendSms?username=c.09024324737&password=674579&from=10009611&to={phone}&text=کد تایید شما برای ورود به فروشگاه : {code}").text
    print(r)
    return JsonResponse({'status': 'ok'},encoder=JSONEncoder)


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
    
        try:
    
            if data['old_username']!=data['new_username']:
                new_username = User.objects.filter(username=data['new_username']).get()
                return JsonResponse({'status':'error','result':'repetitious user'},encoder=JSONEncoder)
            else:
                this_is_true_command_._this_command_for_error_to_run_except
    
        except:
            try:
    
                print(data['old_phonenumber'])
                if data['old_phonenumber']!=data['new_phonenumber']:
                    new_username = User.objects.filter(phone_number=data['new_phonenumber']).get()
                    return JsonResponse({'status':'error','result':'repetitious phonenumber'},encoder=JSONEncoder)
                else:
                    this_is_true_command_._this_command_for_error_to_run_except
    
            except:
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




# حراجی   haraji


@csrf_exempt
def get_all_haraji(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for kala in Haraji.objects.all():        
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def add_new_haraji(request):
    """
    try:
    """ 
    data = request.POST
    Haraji.objects.create(name=data['name'],text=data['text'],img=data['img'],img2=data['img2'],img3=data['img3'],img4=data['img4'],amount=data['amount'],num=data['num'],color_size=json.loads(str(data['color_size'])))
    return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    """
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
    """

@csrf_exempt
def delete_haraji(request):
    try:
        data = request.POST
        Haraji.objects.filter(id=int(data['id'])).delete()
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def edit_haraji(request):
    try:
        data = request.POST
        this_kala = Haraji.objects.filter(id=int(data['id']))
        this_name = data['name']
        this_text = data['text']
        this_img = data['img']
        this_img2 = data['img2']
        this_img3 = data['img3']
        this_img4 = data['img4']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,img2=this_img2,img3=this_img3,img4=this_img4,amount=this_amount,num=this_num,color_size=json.loads(str(data['color_size'])))
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
    for kala in Pooshak_mardane.objects.filter():
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))

    count = 0
    for kala in Pooshak_zanane.objects.filter():
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))
    count = 0
    for kala in Pooshak_pesarane.objects.filter():
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))
    count = 0
    for kala in Pooshak_dokhtarane.objects.filter():
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))
    count = 0
    for kala in Pooshak_nozadi.objects.filter():
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)
@csrf_exempt
def get_all_parcheh(request):
    """
        function for get all parcheh
    """
    all = []
    count = 0
    for kala in Parcheh.objects.all():
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)
@csrf_exempt
def get_all_hejab(request):
    """
        function for get all parcheh
    """
    all = []
    count = 0
    for kala in Hejab_chador.objects.all():
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))
    count = 0
    for kala in Hejab_mask_pooshie.objects.all():
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))
    count = 0
    for kala in Hejab_roosari.objects.all():
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))
    count = 0
    for kala in Hejab_saghedast_dastkesh.objects.all():
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))
    count = 0
    for kala in Hejab_shal.objects.all():
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)


@csrf_exempt
def get_all_kharazi(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for kala in Kharazi_abzarkhayati.objects.all():
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))
    count = 0
    for kala in Kharazi_lavazemtahrir.objects.all(): 
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)





@csrf_exempt
def get_all_pishnahad_vizhe(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for kala in Pishnahad_Vizhe.objects.all():        
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)










@csrf_exempt
def get_all_zivar_alat(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for kala in Zivar_Alat.objects.all():        
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)


@csrf_exempt
def get_all_users_kalas(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for kala in Users_kalas.objects.all():        
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']: 
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['user']='{12}';this_kala{0}['phone']='{13}';this_kala{0}['city']='{14}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4), kala.user, kala.phone, kala.city))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)


@csrf_exempt
def get_all_pooshak_mardane(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for kala in Pooshak_mardane.objects.all():        
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def get_all_pooshak_zanane(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for kala in Pooshak_zanane.objects.all():
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def get_all_pooshak_dokhtarane(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for kala in Pooshak_dokhtarane.objects.all():
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def get_all_pooshak_pesarane(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for kala in Pooshak_pesarane.objects.all():
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def get_all_pooshak_nozadi(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for kala in Pooshak_nozadi.objects.all():
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))

       
    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def get_all_hejab_chador(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for kala in Hejab_chador.objects.all():
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def get_all_hejab_shal(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for kala in Hejab_shal.objects.all():
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))


    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)


@csrf_exempt
def get_all_hejab_roosari(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for kala in Hejab_roosari.objects.all():
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def get_all_hejab_saghedast_dastkesh(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for kala in Hejab_saghedast_dastkesh.objects.all():
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)


@csrf_exempt
def get_all_hejab_mask_pooshie(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for kala in Hejab_mask_pooshie.objects.all():
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def get_all_kharazi_abzarkhayati(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for kala in Kharazi_abzarkhayati.objects.all():
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def get_all_kharazi_lavazemtahrir(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for kala in Kharazi_lavazemtahrir.objects.all():
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)




@csrf_exempt
def get_all_sefaresh_mardane(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for kala in Sefaresh_mardane.objects.all():
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def get_all_sefaresh_zanane(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for kala in Sefaresh_zanane.objects.all():
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def get_all_sefaresh_dokhtarane(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for kala in Sefaresh_dokhtarane.objects.all():
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def get_all_sefaresh_pesarane(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for kala in Sefaresh_pesarane.objects.all():
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def get_all_sefaresh_nozadi(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for kala in Sefaresh_nozadi.objects.all():
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def get_all_sefaresh_sayer(request):
    """
        function for get all kharazi
    """
    all = []
    count = 0
    for kala in Sefaresh_sayer.objects.all():
        all_num = 0
        for i in kala.color_size['result']:
            for j in i['size']:
                all_num+=int(j['num'])
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['group']='{7}';this_kala{0}['name']='{1}';this_kala{0}['text']='''{2}''';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{9}';this_kala{0}['img3']='{10}';this_kala{0}['img4']='{11}';this_kala{0}['num']='{6}';this_kala{0}['number']='{0}';this_kala{0}['color_size']={8};all.append(this_kala{0})".format(count,kala.name,kala.text,kala.amount,"http://193.176.243.61/media/"+str(kala.img),kala.id,all_num,kala.group,kala.color_size,"http://193.176.243.61/media/"+str(kala.img2),"http://193.176.243.61/media/"+str(kala.img3),"http://193.176.243.61/media/"+str(kala.img4)))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)




# add new kalas views


@csrf_exempt
def add_new_parcheh(request):
    """
    try:
        data = request.POST
        Parcheh.objects.create(name=data['name'],text=data['text'],img=data['img'],amount=data['amount'],num=data['num'],color_size=data["color_size"])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
    """
    if True:
        data = request.POST
        print(data["color_size"])
        print()
        Parcheh.objects.create(name=data['name'],text=data['text'],img=data['img'],img2=data['img2'],img3=data['img3'],img4=data['img4'],amount=data['amount'],num=data['num'],color_size=json.loads(str(data['color_size'])))
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
@csrf_exempt
def add_new_pooshak(request):
    try:
        data = request.POST
        Pooshak.objects.create(name=data['name'],text=data['text'],img=data['img'],img2=data['img2'],img3=data['img3'],img4=data['img4'],amount=data['amount'],num=data['num'],color_size=data["color_size"])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
    
@csrf_exempt
def add_new_hejab(request):
    try:
        data = request.POST
        Hejab.objects.create(name=data['name'],text=data['text'],img=data['img'],img2=data['img2'],img3=data['img3'],img4=data['img4'],amount=data['amount'],num=data['num'],color_size=data["color_size"])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
    
@csrf_exempt
def add_new_kharazi(request):
    try:
        data = request.POST
        Kharazi.objects.create(name=data['name'],text=data['text'],img=data['img'],img2=data['img2'],img3=data['img3'],img4=data['img4'],amount=data['amount'],num=data['num'],color_size=data["color_size"])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)


@csrf_exempt
def add_new_pishnahad_vizhe(request):
    """
    try:
    """
    if True:
        data = request.POST
        print(data["color_size"])
        print()
        Pishnahad_Vizhe.objects.create(name=data['name'],text=data['text'],img=data['img'],img2=data['img2'],img3=data['img3'],img4=data['img4'],amount=data['amount'],num=data['num'],color_size=json.loads(str(data['color_size'])))
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    """
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
"""

@csrf_exempt
def add_new_zivar_alat(request):
    """
    try:
    """
    if True:
        data = request.POST
        print(data["color_size"])
        print()
        Zivar_Alat.objects.create(name=data['name'],text=data['text'],img=data['img'],img2=data['img2'],img3=data['img3'],img4=data['img4'],amount=data['amount'],num=data['num'],color_size=json.loads(str(data['color_size'])))
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    """
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
"""


@csrf_exempt
def add_new_users_kalas(request):
    """
    try:
    """
    if True:
        data = request.POST
        print(data["color_size"])
        print()
        Users_kalas.objects.create(user=data['user'],phone=data['phone'],city=data['city'],name=data['name'],text=data['text'],img=data['img'],img2=data['img2'],img3=data['img3'],img4=data['img4'],amount=data['amount'],num=data['num'],color_size=json.loads(str(data['color_size'])))
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    """
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
"""


@csrf_exempt
def add_new_pooshak_mardane(request):
    """
    try:
    """
    if True:
        data = request.POST
        print(data["color_size"])
        print()
        Pooshak_mardane.objects.create(name=data['name'],text=data['text'],img=data['img'],img2=data['img2'],img3=data['img3'],img4=data['img4'],amount=data['amount'],num=data['num'],color_size=json.loads(str(data['color_size'])))
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    """
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
"""
@csrf_exempt
def add_new_pooshak_zanane(request):
    try:
        data = request.POST
        Pooshak_zanane.objects.create(name=data['name'],text=data['text'],img=data['img'],img2=data['img2'],img3=data['img3'],img4=data['img4'],amount=data['amount'],num=data['num'],color_size=json.loads(str(data['color_size'])))
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_pooshak_dokhtarane(request):
    try:
        data = request.POST
        Pooshak_dokhtarane.objects.create(name=data['name'],text=data['text'],img=data['img'],img2=data['img2'],img3=data['img3'],img4=data['img4'],amount=data['amount'],num=data['num'],color_size=json.loads(str(data['color_size'])))
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_pooshak_pesarane(request):
    try:
        data = request.POST
        Pooshak_pesarane.objects.create(name=data['name'],text=data['text'],img=data['img'],img2=data['img2'],img3=data['img3'],img4=data['img4'],amount=data['amount'],num=data['num'],color_size=json.loads(str(data['color_size'])))
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_pooshak_nozadi(request):
    try:
        data = request.POST
        Pooshak_nozadi.objects.create(name=data['name'],text=data['text'],img=data['img'],img2=data['img2'],img3=data['img3'],img4=data['img4'],amount=data['amount'],num=data['num'],color_size=json.loads(str(data['color_size'])))
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_hejab_chador(request):
    try:
        data = request.POST
        Hejab_chador.objects.create(name=data['name'],text=data['text'],img=data['img'],img2=data['img2'],img3=data['img3'],img4=data['img4'],amount=data['amount'],num=data['num'],color_size=json.loads(str(data['color_size'])))
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_hejab_shal(request):
    try:
        data = request.POST
        Hejab_shal.objects.create(name=data['name'],text=data['text'],img=data['img'],img2=data['img2'],img3=data['img3'],img4=data['img4'],amount=data['amount'],num=data['num'],color_size=json.loads(str(data['color_size'])))
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_hejab_roosari(request):
    try:
        data = request.POST
        Hejab_roosari.objects.create(name=data['name'],text=data['text'],img=data['img'],img2=data['img2'],img3=data['img3'],img4=data['img4'],amount=data['amount'],num=data['num'],color_size=json.loads(str(data['color_size'])))
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_hejab_saghedast_dastkesh(request):
    try:
        data = request.POST
        Hejab_saghedast_dastkesh.objects.create(name=data['name'],text=data['text'],img=data['img'],img2=data['img2'],img3=data['img3'],img4=data['img4'],amount=data['amount'],num=data['num'],color_size=json.loads(str(data['color_size'])))
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_hejab_mask_pooshie(request):
    try:
        data = request.POST
        Hejab_mask_pooshie.objects.create(name=data['name'],text=data['text'],img=data['img'],img2=data['img2'],img3=data['img3'],img4=data['img4'],amount=data['amount'],num=data['num'],color_size=json.loads(str(data['color_size'])))
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_kharazi_abzarkhayati(request):
    try:
        data = request.POST
        Kharazi_abzarkhayati.objects.create(name=data['name'],text=data['text'],img=data['img'],img2=data['img2'],img3=data['img3'],img4=data['img4'],amount=data['amount'],num=data['num'],color_size=json.loads(str(data['color_size'])))
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_kharazi_lavazemtahrir(request):
    try:
        data = request.POST
        Kharazi_lavazemtahrir.objects.create(name=data['name'],text=data['text'],img=data['img'],img2=data['img2'],img3=data['img3'],img4=data['img4'],amount=data['amount'],num=data['num'],color_size=json.loads(str(data['color_size'])))
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_sefaresh_mardane(request):
    try:
        data = request.POST
        Sefaresh_mardane.objects.create(name=data['name'],text=data['text'],img=data['img'],img2=data['img2'],img3=data['img3'],img4=data['img4'],amount=data['amount'],num=data['num'],color_size=json.loads(str(data['color_size'])))
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_sefaresh_zanane(request):
    try:
        data = request.POST
        Sefaresh_zanane.objects.create(name=data['name'],text=data['text'],img=data['img'],img2=data['img2'],img3=data['img3'],img4=data['img4'],amount=data['amount'],num=data['num'],color_size=json.loads(str(data['color_size'])))
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_sefaresh_dokhtarane(request):
    try:
        data = request.POST
        Sefaresh_dokhtarane.objects.create(name=data['name'],text=data['text'],img=data['img'],img2=data['img2'],img3=data['img3'],img4=data['img4'],amount=data['amount'],num=data['num'],color_size=json.loads(str(data['color_size'])))
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_sefaresh_pesarane(request):
    try:
        data = request.POST
        Sefaresh_pesarane.objects.create(name=data['name'],text=data['text'],img=data['img'],img2=data['img2'],img3=data['img3'],img4=data['img4'],amount=data['amount'],num=data['num'],color_size=json.loads(str(data['color_size'])))
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_sefaresh_nozadi(request):
    try:
        data = request.POST
        Sefaresh_nozadi.objects.create(name=data['name'],text=data['text'],img=data['img'],img2=data['img2'],img3=data['img3'],img4=data['img4'],amount=data['amount'],num=data['num'],color_size=json.loads(str(data['color_size'])))
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def add_new_sefaresh_sayer(request):
    try:
        data = request.POST
        Sefaresh_sayer.objects.create(name=data['name'],text=data['text'],img=data['img'],img2=data['img2'],img3=data['img3'],img4=data['img4'],amount=data['amount'],num=data['num'],color_size=json.loads(str(data['color_size'])))
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
def delete_pishnahad_vizhe(request):
    try:
        data = request.POST
        Pishnahad_Vizhe.objects.filter(id=int(data['id'])).delete()
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def delete_zivar_alat(request):
    try:
        data = request.POST
        Zivar_Alat.objects.filter(id=int(data['id'])).delete()
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)


@csrf_exempt
def delete_users_kalas(request):
    try:
        data = request.POST
        Users_kalas.objects.filter(id=int(data['id'])).delete()
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
        this_img2 = data['img2']
        this_img3 = data['img3']
        this_img4 = data['img4']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,img2=this_img2,img3=this_img3,img4=this_img4,amount=this_amount,num=this_num,color_size=json.loads(str(data['color_size'])))
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
    this_img2 = data['img2']
    this_img3 = data['img3']
    this_img4 = data['img4']
    this_amount = data['amount']
    this_num = data['num']
    this_kala.update(name=this_name,text=this_text,img=this_img,img2=this_img2,img3=this_img3,img4=this_img4,amount=this_amount,num=this_num,color_size=json.loads(str(data['color_size'])))
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
        this_img2 = data['img2']
        this_img3 = data['img3']
        this_img4 = data['img4']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,img2=this_img2,img3=this_img3,img4=this_img4,amount=this_amount,num=this_num,color_size=json.loads(str(data['color_size'])))
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
        this_img2 = data['img2']
        this_img3 = data['img3']
        this_img4 = data['img4']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,img2=this_img2,img3=this_img3,img4=this_img4,amount=this_amount,num=this_num,color_size=json.loads(str(data['color_size'])))
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)



@csrf_exempt
def edit_pishnahad_vizhe(request):
    try:
        data = request.POST
        this_kala = Pishnahad_Vizhe.objects.filter(id=int(data['id']))
        this_name = data['name']
        this_text = data['text']
        this_img = data['img']
        this_img2 = data['img2']
        this_img3 = data['img3']
        this_img4 = data['img4']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,img2=this_img2,img3=this_img3,img4=this_img4,amount=this_amount,num=this_num,color_size=json.loads(str(data['color_size'])))
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)


@csrf_exempt
def edit_zivar_alat(request):
    try:
        data = request.POST
        this_kala = Zivar_Alat.objects.filter(id=int(data['id']))
        this_name = data['name']
        this_text = data['text']
        this_img = data['img']
        this_img2 = data['img2']
        this_img3 = data['img3']
        this_img4 = data['img4']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,img2=this_img2,img3=this_img3,img4=this_img4,amount=this_amount,num=this_num,color_size=json.loads(str(data['color_size'])))
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
        this_img2 = data['img2']
        this_img3 = data['img3']
        this_img4 = data['img4']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,img2=this_img2,img3=this_img3,img4=this_img4,amount=this_amount,num=this_num,color_size=json.loads(str(data['color_size'])))
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)


@csrf_exempt
def edit_users_kalas(request):
    try:
        data = request.POST
        this_kala = Users_kalas.objects.filter(id=int(data['id']))
        this_user = data['user']
        this_phone = data['phone']
        this_city = data['city']
        this_name = data['name']
        this_text = data['text']
        this_img = data['img']
        this_img2 = data['img2']
        this_img3 = data['img3']
        this_img4 = data['img4']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(user=this_user,phone=this_phone,city=this_city,name=this_name,text=this_text,img=this_img,img2=this_img2,img3=this_img3,img4=this_img4,amount=this_amount,num=this_num,color_size=json.loads(str(data['color_size'])))
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
        this_img2 = data['img2']
        this_img3 = data['img3']
        this_img4 = data['img4']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,img2=this_img2,img3=this_img3,img4=this_img4,amount=this_amount,num=this_num,color_size=json.loads(str(data['color_size'])))
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
        this_img2 = data['img2']
        this_img3 = data['img3']
        this_img4 = data['img4']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,img2=this_img2,img3=this_img3,img4=this_img4,amount=this_amount,num=this_num,color_size=json.loads(str(data['color_size'])))
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
        this_img2 = data['img2']
        this_img3 = data['img3']
        this_img4 = data['img4']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,img2=this_img2,img3=this_img3,img4=this_img4,amount=this_amount,num=this_num,color_size=json.loads(str(data['color_size'])))
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
        this_img2 = data['img2']
        this_img3 = data['img3']
        this_img4 = data['img4']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,img2=this_img2,img3=this_img3,img4=this_img4,amount=this_amount,num=this_num,color_size=json.loads(str(data['color_size'])))
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
        this_img2 = data['img2']
        this_img3 = data['img3']
        this_img4 = data['img4']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,img2=this_img2,img3=this_img3,img4=this_img4,amount=this_amount,num=this_num,color_size=json.loads(str(data['color_size'])))
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
        this_img2 = data['img2']
        this_img3 = data['img3']
        this_img4 = data['img4']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,img2=this_img2,img3=this_img3,img4=this_img4,amount=this_amount,num=this_num,color_size=json.loads(str(data['color_size'])))
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
        this_img2 = data['img2']
        this_img3 = data['img3']
        this_img4 = data['img4']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,img2=this_img2,img3=this_img3,img4=this_img4,amount=this_amount,num=this_num,color_size=json.loads(str(data['color_size'])))
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
        this_img2 = data['img2']
        this_img3 = data['img3']
        this_img4 = data['img4']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,img2=this_img2,img3=this_img3,img4=this_img4,amount=this_amount,num=this_num,color_size=json.loads(str(data['color_size'])))
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
        this_img2 = data['img2']
        this_img3 = data['img3']
        this_img4 = data['img4']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,img2=this_img2,img3=this_img3,img4=this_img4,amount=this_amount,num=this_num,color_size=json.loads(str(data['color_size'])))
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
        this_img2 = data['img2']
        this_img3 = data['img3']
        this_img4 = data['img4']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,img2=this_img2,img3=this_img3,img4=this_img4,amount=this_amount,num=this_num,color_size=json.loads(str(data['color_size'])))
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
        this_img2 = data['img2']
        this_img3 = data['img3']
        this_img4 = data['img4']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,img2=this_img2,img3=this_img3,img4=this_img4,amount=this_amount,num=this_num,color_size=json.loads(str(data['color_size'])))
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
        this_img2 = data['img2']
        this_img3 = data['img3']
        this_img4 = data['img4']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,img2=this_img2,img3=this_img3,img4=this_img4,amount=this_amount,num=this_num,color_size=json.loads(str(data['color_size'])))
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
        this_img2 = data['img2']
        this_img3 = data['img3']
        this_img4 = data['img4']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,img2=this_img2,img3=this_img3,img4=this_img4,amount=this_amount,num=this_num,color_size=json.loads(str(data['color_size'])))
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
        this_img2 = data['img2']
        this_img3 = data['img3']
        this_img4 = data['img4']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,img2=this_img2,img3=this_img3,img4=this_img4,amount=this_amount,num=this_num,color_size=json.loads(str(data['color_size'])))
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
        this_img2 = data['img2']
        this_img3 = data['img3']
        this_img4 = data['img4']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,img2=this_img2,img3=this_img3,img4=this_img4,amount=this_amount,num=this_num,color_size=json.loads(str(data['color_size'])))
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
        this_img2 = data['img2']
        this_img3 = data['img3']
        this_img4 = data['img4']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,img2=this_img2,img3=this_img3,img4=this_img4,amount=this_amount,num=this_num,color_size=json.loads(str(data['color_size'])))
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
        this_img2 = data['img2']
        this_img3 = data['img3']
        this_img4 = data['img4']
        this_amount = data['amount']
        this_num = data['num']
        this_kala.update(name=this_name,text=this_text,img=this_img,img2=this_img2,img3=this_img3,img4=this_img4,amount=this_amount,num=this_num,color_size=json.loads(str(data['color_size'])))
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
        """
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        """
        new_num = int(old_num)-int(data['num'])
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
        """
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        """
        new_num = int(old_num)-int(data['num'])
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
        """
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        """
        new_num = int(old_num)-int(data['num'])

        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)











@csrf_exempt
def remove_num_pishnahad_vizhe(request):

    try:
        data = request.POST
        this_kala = Pishnahad_Vizhe.objects.filter(id=data['id'])
        old_num = this_kala[0].num
        count_color = -1
        count_size = -1
        for i in this_kala[0].color_size["result"]:
            count_color += 1
            if i["color"]==data["color"]:
                for j in i["size"]:
                    count_size += 1
                    if j["size"]==data["size"]:
                        print(j["num"])
                        old_num = int(j["num"])
                        new_num = int(old_num)-int(data["num"])
                        print(new_num)
                        new_color_size = this_kala[0].color_size
                        new_color_size["result"][count_color]["size"][count_size]["num"] = str(new_num)
                        this_kala.update(color_size=new_color_size)
                        print(this_kala[0].color_size["result"][count_color])
                        this_kala[0].save()
                        print(this_kala[0].color_size)

        """
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        """
        new_num = int(old_num)-int(data['num'])
        print(new_num)
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)

    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)







@csrf_exempt
def remove_num_zivar_alat(request):

    try:
        data = request.POST
        this_kala = Zivar_Alat.objects.filter(id=data['id'])
        old_num = this_kala[0].num
        count_color = -1
        count_size = -1
        for i in this_kala[0].color_size["result"]:
            count_color += 1
            if i["color"]==data["color"]:
                for j in i["size"]:
                    count_size += 1
                    if j["size"]==data["size"]:
                        print(j["num"])
                        old_num = int(j["num"])
                        new_num = int(old_num)-int(data["num"])
                        print(new_num)
                        new_color_size = this_kala[0].color_size
                        new_color_size["result"][count_color]["size"][count_size]["num"] = str(new_num)
                        this_kala.update(color_size=new_color_size)
                        print(this_kala[0].color_size["result"][count_color])
                        this_kala[0].save()
                        print(this_kala[0].color_size)

        """
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        """
        new_num = int(old_num)-int(data['num'])
        print(new_num)
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)

    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)




@csrf_exempt
def remove_num_users_kalas(request):

    try:
        data = request.POST
        this_kala = Users_kalas.objects.filter(id=data['id'])
        old_num = this_kala[0].num
        count_color = -1
        count_size = -1
        for i in this_kala[0].color_size["result"]:
            count_color += 1
            if i["color"]==data["color"]:
                for j in i["size"]:
                    count_size += 1
                    if j["size"]==data["size"]:
                        print(j["num"])
                        old_num = int(j["num"])
                        new_num = int(old_num)-int(data["num"])
                        print(new_num)
                        new_color_size = this_kala[0].color_size
                        new_color_size["result"][count_color]["size"][count_size]["num"] = str(new_num)
                        this_kala.update(color_size=new_color_size)
                        print(this_kala[0].color_size["result"][count_color])
                        this_kala[0].save()
                        print(this_kala[0].color_size)

        """
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        """
        new_num = int(old_num)-int(data['num'])
        print(new_num)
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)

    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)





@csrf_exempt
def remove_num_pooshak_mardane(request):

    try:
        data = request.POST
        this_kala = Pooshak_mardane.objects.filter(id=data['id'])
        old_num = this_kala[0].num
        count_color = -1
        count_size = -1
        for i in this_kala[0].color_size["result"]:
            count_color += 1
            if i["color"]==data["color"]:
                for j in i["size"]:
                    count_size += 1
                    if j["size"]==data["size"]:
                        print(j["num"])
                        old_num = int(j["num"])
                        new_num = int(old_num)-int(data["num"])
                        print(new_num)
                        new_color_size = this_kala[0].color_size
                        new_color_size["result"][count_color]["size"][count_size]["num"] = str(new_num)
                        this_kala.update(color_size=new_color_size)
                        print(this_kala[0].color_size["result"][count_color])
                        this_kala[0].save()
                        print(this_kala[0].color_size)

        """
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        """
        new_num = int(old_num)-int(data['num'])
        print(new_num)
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)

    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def remove_num_pooshak_zanane(request):
    if True:
        data = request.POST
        this_kala = Pooshak_zanane.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        count_color = -1
        count_size = -1
        for i in this_kala[0].color_size["result"]:
            count_color += 1
            if i["color"]==data["color"]:
                for j in i["size"]:
                    count_size += 1
                    if j["size"]==data["size"]:
                        print(j["num"])
                        old_num = int(j["num"])
                        new_num = int(old_num)-int(data["num"])
                        print(new_num)
                        new_color_size = this_kala[0].color_size
                        new_color_size["result"][count_color]["size"][count_size]["num"] = str(new_num)
                        this_kala.update(color_size=new_color_size)
                        print(this_kala[0].color_size["result"][count_color])
                        this_kala[0].save()
                        print(this_kala[0].color_size)
        """
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        """
        new_num = int(old_num)-int(data['num'])
        this_kala.update(num=new_num)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    """
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
"""
@csrf_exempt
def remove_num_pooshak_dokhtarane(request):
    try:
        data = request.POST
        this_kala = Pooshak_dokhtarane.objects.filter(id=data['id'])
        # this_num = data['num']
        old_num = this_kala[0].num
        count_color = -1
        count_size = -1
        for i in this_kala[0].color_size["result"]:
            count_color += 1
            if i["color"]==data["color"]:
                for j in i["size"]:
                    count_size += 1
                    if j["size"]==data["size"]:
                        print(j["num"])
                        old_num = int(j["num"])
                        new_num = int(old_num)-int(data["num"])
                        print(new_num)
                        new_color_size = this_kala[0].color_size
                        new_color_size["result"][count_color]["size"][count_size]["num"] = str(new_num)
                        this_kala.update(color_size=new_color_size)
                        print(this_kala[0].color_size["result"][count_color])
                        this_kala[0].save()
                        print(this_kala[0].color_size)
        
        """
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        """
        new_num = int(old_num)-int(data['num'])
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
        count_color = -1
        count_size = -1
        for i in this_kala[0].color_size["result"]:
            count_color += 1
            if i["color"]==data["color"]:
                for j in i["size"]:
                    count_size += 1
                    if j["size"]==data["size"]:
                        print(j["num"])
                        old_num = int(j["num"])
                        new_num = int(old_num)-int(data["num"])
                        print(new_num)
                        new_color_size = this_kala[0].color_size
                        new_color_size["result"][count_color]["size"][count_size]["num"] = str(new_num)
                        this_kala.update(color_size=new_color_size)
                        print(this_kala[0].color_size["result"][count_color])
                        this_kala[0].save()
                        print(this_kala[0].color_size)
        """
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        """
        new_num = int(old_num)-int(data['num'])
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
        count_color = -1
        count_size = -1
        for i in this_kala[0].color_size["result"]:
            count_color += 1
            if i["color"]==data["color"]:
                for j in i["size"]:
                    count_size += 1
                    if j["size"]==data["size"]:
                        print(j["num"])
                        old_num = int(j["num"])
                        new_num = int(old_num)-int(data["num"])
                        print(new_num)
                        new_color_size = this_kala[0].color_size
                        new_color_size["result"][count_color]["size"][count_size]["num"] = str(new_num)
                        this_kala.update(color_size=new_color_size)
                        print(this_kala[0].color_size["result"][count_color])
                        this_kala[0].save()
                        print(this_kala[0].color_size)
        """
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        """
        new_num = int(old_num)-int(data['num'])
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
        count_color = -1
        count_size = -1
        for i in this_kala[0].color_size["result"]:
            count_color += 1
            if i["color"]==data["color"]:
                for j in i["size"]:
                    count_size += 1
                    if j["size"]==data["size"]:
                        print(j["num"])
                        old_num = int(j["num"])
                        new_num = int(old_num)-int(data["num"])
                        print(new_num)
                        new_color_size = this_kala[0].color_size
                        new_color_size["result"][count_color]["size"][count_size]["num"] = str(new_num)
                        this_kala.update(color_size=new_color_size)
                        print(this_kala[0].color_size["result"][count_color])
                        this_kala[0].save()
                        print(this_kala[0].color_size)
        """
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        """
        new_num = int(old_num)-int(data['num'])
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
        count_color = -1
        count_size = -1
        for i in this_kala[0].color_size["result"]:
            count_color += 1
            if i["color"]==data["color"]:
                for j in i["size"]:
                    count_size += 1
                    if j["size"]==data["size"]:
                        print(j["num"])
                        old_num = int(j["num"])
                        new_num = int(old_num)-int(data["num"])
                        print(new_num)
                        new_color_size = this_kala[0].color_size
                        new_color_size["result"][count_color]["size"][count_size]["num"] = str(new_num)
                        this_kala.update(color_size=new_color_size)
                        print(this_kala[0].color_size["result"][count_color])
                        this_kala[0].save()
                        print(this_kala[0].color_size)
        """
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        """
        new_num = int(old_num)-int(data['num'])
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
        count_color = -1
        count_size = -1
        for i in this_kala[0].color_size["result"]:
            count_color += 1
            if i["color"]==data["color"]:
                for j in i["size"]:
                    count_size += 1
                    if j["size"]==data["size"]:
                        print(j["num"])
                        old_num = int(j["num"])
                        new_num = int(old_num)-int(data["num"])
                        print(new_num)
                        new_color_size = this_kala[0].color_size
                        new_color_size["result"][count_color]["size"][count_size]["num"] = str(new_num)
                        this_kala.update(color_size=new_color_size)
                        print(this_kala[0].color_size["result"][count_color])
                        this_kala[0].save()
                        print(this_kala[0].color_size)
        """
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        """
        new_num = int(old_num)-int(data['num'])
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
        count_color = -1
        count_size = -1
        for i in this_kala[0].color_size["result"]:
            count_color += 1
            if i["color"]==data["color"]:
                for j in i["size"]:
                    count_size += 1
                    if j["size"]==data["size"]:
                        print(j["num"])
                        old_num = int(j["num"])
                        new_num = int(old_num)-int(data["num"])
                        print(new_num)
                        new_color_size = this_kala[0].color_size
                        new_color_size["result"][count_color]["size"][count_size]["num"] = str(new_num)
                        this_kala.update(color_size=new_color_size)
                        print(this_kala[0].color_size["result"][count_color])
                        this_kala[0].save()
                        print(this_kala[0].color_size)
        """
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        """
        new_num = int(old_num)-int(data['num'])
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
        count_color = -1
        count_size = -1
        for i in this_kala[0].color_size["result"]:
            count_color += 1
            if i["color"]==data["color"]:
                for j in i["size"]:
                    count_size += 1
                    if j["size"]==data["size"]:
                        print(j["num"])
                        old_num = int(j["num"])
                        new_num = int(old_num)-int(data["num"])
                        print(new_num)
                        new_color_size = this_kala[0].color_size
                        new_color_size["result"][count_color]["size"][count_size]["num"] = str(new_num)
                        this_kala.update(color_size=new_color_size)
                        print(this_kala[0].color_size["result"][count_color])
                        this_kala[0].save()
                        print(this_kala[0].color_size)
        """
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        """
        new_num = int(old_num)-int(data['num'])
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
        count_color = -1
        count_size = -1
        for i in this_kala[0].color_size["result"]:
            count_color += 1
            if i["color"]==data["color"]:
                for j in i["size"]:
                    count_size += 1
                    if j["size"]==data["size"]:
                        print(j["num"])
                        old_num = int(j["num"])
                        new_num = int(old_num)-int(data["num"])
                        print(new_num)
                        new_color_size = this_kala[0].color_size
                        new_color_size["result"][count_color]["size"][count_size]["num"] = str(new_num)
                        this_kala.update(color_size=new_color_size)
                        print(this_kala[0].color_size["result"][count_color])
                        this_kala[0].save()
                        print(this_kala[0].color_size) 
        """
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        """
        new_num = int(old_num)-int(data['num'])
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
        count_color = -1
        count_size = -1
        for i in this_kala[0].color_size["result"]:
            count_color += 1
            if i["color"]==data["color"]:
                for j in i["size"]:
                    count_size += 1
                    if j["size"]==data["size"]:
                        print(j["num"])
                        old_num = int(j["num"])
                        new_num = int(old_num)-int(data["num"])
                        print(new_num)
                        new_color_size = this_kala[0].color_size
                        new_color_size["result"][count_color]["size"][count_size]["num"] = str(new_num)
                        this_kala.update(color_size=new_color_size)
                        print(this_kala[0].color_size["result"][count_color])
                        this_kala[0].save()
                        print(this_kala[0].color_size)
        """
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        """
        new_num = int(old_num)-int(data['num'])
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
        count_color = -1
        count_size = -1
        for i in this_kala[0].color_size["result"]:
            count_color += 1
            if i["color"]==data["color"]:
                for j in i["size"]:
                    count_size += 1
                    if j["size"]==data["size"]:
                        print(j["num"])
                        old_num = int(j["num"])
                        new_num = int(old_num)-int(data["num"])
                        print(new_num)
                        new_color_size = this_kala[0].color_size
                        new_color_size["result"][count_color]["size"][count_size]["num"] = str(new_num)
                        this_kala.update(color_size=new_color_size)
                        print(this_kala[0].color_size["result"][count_color])
                        this_kala[0].save()
                        print(this_kala[0].color_size)
        """
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        """
        new_num = int(old_num)-int(data['num'])
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
        count_color = -1
        count_size = -1
        for i in this_kala[0].color_size["result"]:
            count_color += 1
            if i["color"]==data["color"]:
                for j in i["size"]:
                    count_size += 1
                    if j["size"]==data["size"]:
                        print(j["num"])
                        old_num = int(j["num"])
                        new_num = int(old_num)-int(data["num"])
                        print(new_num)
                        new_color_size = this_kala[0].color_size
                        new_color_size["result"][count_color]["size"][count_size]["num"] = str(new_num)
                        this_kala.update(color_size=new_color_size)
                        print(this_kala[0].color_size["result"][count_color])
                        this_kala[0].save()
                        print(this_kala[0].color_size)
        """
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        """
        new_num = int(old_num)-int(data['num'])
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
        count_color = -1
        count_size = -1
        for i in this_kala[0].color_size["result"]:
            count_color += 1
            if i["color"]==data["color"]:
                for j in i["size"]:
                    count_size += 1
                    if j["size"]==data["size"]:
                        print(j["num"])
                        old_num = int(j["num"])
                        new_num = int(old_num)-int(data["num"])
                        print(new_num)
                        new_color_size = this_kala[0].color_size
                        new_color_size["result"][count_color]["size"][count_size]["num"] = str(new_num)
                        this_kala.update(color_size=new_color_size)
                        print(this_kala[0].color_size["result"][count_color])
                        this_kala[0].save()
                        print(this_kala[0].color_size)
        """
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        """
        new_num = int(old_num)-int(data['num'])
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
        count_color = -1
        count_size = -1
        for i in this_kala[0].color_size["result"]:
            count_color += 1
            if i["color"]==data["color"]:
                for j in i["size"]:
                    count_size += 1
                    if j["size"]==data["size"]:
                        print(j["num"])
                        old_num = int(j["num"])
                        new_num = int(old_num)-int(data["num"])
                        print(new_num)
                        new_color_size = this_kala[0].color_size
                        new_color_size["result"][count_color]["size"][count_size]["num"] = str(new_num)
                        this_kala.update(color_size=new_color_size)
                        print(this_kala[0].color_size["result"][count_color])
                        this_kala[0].save()
                        print(this_kala[0].color_size)
        """
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        """
        new_num = int(old_num)-int(data['num'])
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
        count_color = -1
        count_size = -1
        for i in this_kala[0].color_size["result"]:
            count_color += 1
            if i["color"]==data["color"]:
                for j in i["size"]:
                    count_size += 1
                    if j["size"]==data["size"]:
                        print(j["num"])
                        old_num = int(j["num"])
                        new_num = int(old_num)-int(data["num"])
                        print(new_num)
                        new_color_size = this_kala[0].color_size
                        new_color_size["result"][count_color]["size"][count_size]["num"] = str(new_num)
                        this_kala.update(color_size=new_color_size)
                        print(this_kala[0].color_size["result"][count_color])
                        this_kala[0].save()
                        print(this_kala[0].color_size)
        """
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        """
        new_num = int(old_num)-int(data['num'])
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
        count_color = -1
        count_size = -1
        for i in this_kala[0].color_size["result"]:
            count_color += 1
            if i["color"]==data["color"]:
                for j in i["size"]:
                    count_size += 1
                    if j["size"]==data["size"]:
                        print(j["num"])
                        old_num = int(j["num"])
                        new_num = int(old_num)-int(data["num"])
                        print(new_num)
                        new_color_size = this_kala[0].color_size
                        new_color_size["result"][count_color]["size"][count_size]["num"] = str(new_num)
                        this_kala.update(color_size=new_color_size)
                        print(this_kala[0].color_size["result"][count_color])
                        this_kala[0].save()
                        print(this_kala[0].color_size)
        """
        if int(old_num)==0:
            new_num = "ناموجود"
        else:
            new_num = int(old_num)-int(data['num'])
            if int(new_num)==0:
                new_num = "ناموجود"
        """
        new_num = int(old_num)-int(data['num'])
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
    this_kala = Cart.objects.create(user=this_user,name=data['name'],amount=data['amount'],text=data['text'],img=data['img'],img2=data['img2'],img3=data['img3'],img4=data['img4'],num=data['num'],this_id=data['this_id'],old_num=data['old_num'],group=data['group'],color=data["color"],size=data["size"])
    return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    # except:
    #     return JsonResponse({'status':'error'},encoder=JSONEncoder)
@csrf_exempt
def delete_from_cart(request):
    try:
        data = request.POST
        print(data)
        this_user = User.objects.filter(username=data['user'])[0]
        this_kala = Cart.objects.filter(user=this_user,name=data['name'],amount=data['amount'],img=data['img']).delete()
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
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']='{7}';this_kala{0}['name']='{1}';this_kala{0}['amount']='{2}';this_kala{0}['img']='{4}';this_kala{0}['img2']='{12}';this_kala{0}['img3']='{13}';this_kala{0}['img4']='{14}';this_kala{0}['num']='{5}';this_kala{0}['old_num']='{8}';this_kala{0}['text']='''{9}''';this_kala{0}['group']='{6}';this_kala{0}['color']='{10}';this_kala{0}['size']='{11}';all.append(this_kala{0})".format(count,kala.name,kala.amount,kala.kala_address,kala.img,kala.num,kala.group,kala.this_id,kala.old_num,kala.text,kala.color,kala.size,kala.img2,kala.img3,kala.img4))
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


@csrf_exempt
def ok_level_amadeh_sazi(request):
    data = request.POST
    this_user = User.objects.filter(username=data['username'])
    this_kharid = Tarikhche_kharid.objects.filter(username=data['username'], id=data['name'], date=data['date'], time=data['time'])
    print(this_kharid)
    this_kharid.update(level_amadeh_sazi='OK')
    return JsonResponse({'status':'ok'},encoder=JSONEncoder)

@csrf_exempt
def ok_level_tahvil_post(request):
    data = request.POST
    this_user = User.objects.filter(username=data['username'])
    this_kharid = Tarikhche_kharid.objects.filter(username=data['username'], id=data['name'], date=data['date'], time=data['time'])
    this_kharid.update(level_tahvil_post='OK')

    phone = this_user[0].phone_number

    e_digits = "0123456789"
    f_digits = "۰۱۲۳۴۵۶۷۸۹"

    for i in range(len(e_digits)):
        phone = phone.replace(f_digits[i], e_digits[i])
        
    text = f"""مشتری عزیز سلام
سفارش شما آماده و به مسئول پست تحویل شد.
شماره سفارش : {this_kharid[0].id}
شماره پیگیری : {int(str(this_kharid[0].authority)[1:])}
سرای مریم"""
    r = requests.get(f"https://login.niazpardaz.ir/SMSInOutBox/SendSms?username=c.09024324737&password=674579&from=10009611&to={phone}&text={text}").text

    return JsonResponse({'status':'ok'},encoder=JSONEncoder)


@csrf_exempt
def get_all_tarikhche_kharid(request):
    data = request.POST
    all = []
    count = 0
    this_user = User.objects.filter(username=data['user'])[0]
    this_user_tarikhche = Tarikhche_kharid.objects.filter(username=this_user)
    for tarikhche in this_user_tarikhche:
        count+=1
        # exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['tel_id']='{9}';this_kala{0}['username']='{14}';this_kala{0}['address']='{10}';this_kala{0}['post_code']='{11}';this_kala{0}['id']='{7}';this_kala{0}['name']='{1}';this_kala{0}['amount']='{2}';this_kala{0}['img']='{4}';this_kala{0}['num']='{5}';this_kala{0}['text']='''{8}''';this_kala{0}['group']='{6}';this_kala{0}['color']='{12}';this_kala{0}['size']='{13}';this_kala{0}['authority']='{15}';this_kala{0}['status']='{16}';this_kala{0}['date']='{17}';this_kala{0}['time']='{18}';this_kala{0}['level_sabt']='{19}';this_kala{0}['level_amadeh_sazi']='{20}';this_kala{0}['level_tahvil_post']='{21}';all.append(this_kala{0})".format(count,tarikhche.name,tarikhche.amount,tarikhche.text,tarikhche.img,tarikhche.num,tarikhche.group,tarikhche.id,tarikhche.text,tarikhche.tel_id,tarikhche.address,tarikhche.post_code,tarikhche.color,tarikhche.size,tarikhche.username,tarikhche.authority,tarikhche.status,tarikhche.date, tarikhche.time, tarikhche.level_sabt, tarikhche.level_amadeh_sazi, tarikhche.level_tahvil_post))
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['tel_id']='{9}';this_kala{0}['username']='{14}';this_kala{0}['address']='{10}';this_kala{0}['post_code']='{11}';this_kala{0}['id']='{7}';this_kala{0}['kalas']={22};this_kala{0}['authority']='{15}';this_kala{0}['status']='{16}';this_kala{0}['date']='{17}';this_kala{0}['time']='{18}';this_kala{0}['level_sabt']='{19}';this_kala{0}['level_amadeh_sazi']='{20}';this_kala{0}['level_tahvil_post']='{21}';all.append(this_kala{0})".format(count,tarikhche.post_code,tarikhche.post_code,tarikhche.post_code,tarikhche.post_code,tarikhche.post_code,tarikhche.post_code,tarikhche.id,tarikhche.post_code,tarikhche.tel_id,tarikhche.address,tarikhche.post_code,tarikhche.post_code,tarikhche.post_code,tarikhche.username,tarikhche.authority,tarikhche.status,tarikhche.date, tarikhche.time, tarikhche.level_sabt, tarikhche.level_amadeh_sazi, tarikhche.level_tahvil_post,json.loads(tarikhche.kalas.replace("'","\""))))
    return JsonResponse({'status':'ok','result':all},encoder=JSONEncoder)

@csrf_exempt
def get_all_tarikhche_kharid_admin(request):
    data = request.POST
    all = []
    count = 0
    this_user_tarikhche = Tarikhche_kharid.objects.all().reverse()
    for tarikhche in this_user_tarikhche:
        count+=1
        print(tarikhche.kalas.replace("'","\""))
        # exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['tel_id']='{9}';this_kala{0}['username']='{14}';this_kala{0}['address']='{10}';this_kala{0}['post_code']='{11}';this_kala{0}['id']='{7}';this_kala{0}['name']='{1}';this_kala{0}['amount']='{2}';this_kala{0}['img']='{4}';this_kala{0}['num']='{5}';this_kala{0}['text']='''{8}''';this_kala{0}['group']='{6}';this_kala{0}['color']='{12}';this_kala{0}['size']='{13}';this_kala{0}['authority']='{15}';this_kala{0}['status']='{16}';this_kala{0}['date']='{17}';this_kala{0}['time']='{18}';this_kala{0}['level_sabt']='{19}';this_kala{0}['level_amadeh_sazi']='{20}';this_kala{0}['level_tahvil_post']='{21}';all.append(this_kala{0})".format(count,tarikhche.name,tarikhche.amount,tarikhche.text,tarikhche.img,tarikhche.num,tarikhche.group,tarikhche.id,tarikhche.text,tarikhche.tel_id,tarikhche.address,tarikhche.post_code,tarikhche.color,tarikhche.size,tarikhche.username,tarikhche.authority,tarikhche.status,tarikhche.date, tarikhche.time, tarikhche.level_sabt, tarikhche.level_amadeh_sazi, tarikhche.level_tahvil_post))
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['tel_id']='{9}';this_kala{0}['username']='{14}';this_kala{0}['address']='{10}';this_kala{0}['post_code']='{11}';this_kala{0}['id']='{7}';this_kala{0}['kalas']={22};this_kala{0}['authority']='{15}';this_kala{0}['status']='{16}';this_kala{0}['date']='{17}';this_kala{0}['time']='{18}';this_kala{0}['level_sabt']='{19}';this_kala{0}['level_amadeh_sazi']='{20}';this_kala{0}['level_tahvil_post']='{21}';all.append(this_kala{0})".format(count,tarikhche.post_code,tarikhche.post_code,tarikhche.post_code,tarikhche.post_code,tarikhche.post_code,tarikhche.post_code,tarikhche.id,tarikhche.post_code,tarikhche.tel_id,tarikhche.address,tarikhche.post_code,tarikhche.post_code,tarikhche.post_code,tarikhche.username,tarikhche.authority,tarikhche.status,tarikhche.date, tarikhche.time, tarikhche.level_sabt, tarikhche.level_amadeh_sazi, tarikhche.level_tahvil_post,json.loads(tarikhche.kalas.replace("'","\""))))
 
    return JsonResponse({'status':'ok','result':all},encoder=JSONEncoder)



@csrf_exempt
def add_new_tarikhche_kharid(request):
    data = request.POST

    now = datetime.now()
    
    this_user =  User.objects.filter(username=data['username']).get()
    # this_tarikhche = Tarikhche_kharid.objects.create(username=str(this_user.username),password=str(this_user.password),phone_number=str(this_user.phone_number),tel_id=str(this_user.tel_id),address=str(this_user.address),post_code=str(this_user.post_code),name=data['name'],text=data['text'],img=data['img'],amount=data['amount'],num=data['num'],group=data['group'],color=data['color'],size=data['size'],authority=data['authority'],pick_kala=data["pick_kala"],this_id=data['this_id'],status=data['status'],date=f"{now.year}-{now.month}-{now.day}", time=f"{now.hour}:{now.minute}:{now.second}")
    this_tarikhche = Tarikhche_kharid.objects.create(username=str(this_user.username),password=str(this_user.password),phone_number=str(this_user.phone_number),tel_id=str(this_user.tel_id),address=str(this_user.address),post_code=str(this_user.post_code),kalas=json.loads(str(data['kalas'])),authority=data['authority'],pick_kala=data["pick_kala"],status=data['status'],date=f"{now.year}-{now.month}-{now.day}", time=f"{now.hour}:{now.minute}:{now.second}")

    return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    """
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
"""


@csrf_exempt
def add_signup_class(request):
    data = request.POST

    this_user = User.objects.filter(username=data["username"])[0]
    this_signup_class = SignupClass.objects.create(username=str(this_user.username),phone_number=data["phonenumber"],tel_id=data["tel_id"],address=data["address"],group=data["group"])
    return JsonResponse({"status":"ok"},encoder=JSONEncoder)

@csrf_exempt
def get_all_signup_class(request):
    data = request.POST

    all = []

    count = 0
    
    all_signup = SignupClass.objects.all()

    for i in all_signup:
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['tel_id']='{1}';this_kala{0}['username']='{2}';this_kala{0}['address']='{3}';this_kala{0}['phonenumber']='{4}';this_kala{0}['group']='{5}';all.append(this_kala{0})".format(count,i.tel_id,i.username,i.address,i.phone_number,i.group))

    return JsonResponse({'status':'ok','result':all})



@csrf_exempt
def get_authority(request):
    data = request.POST
    MMERCHANT_ID = '259bac17-b49a-45c1-8d5d-429ec20b2fbb'
    ZARINPAL_WEBSERVICE = 'https://www.zarinpal.com/pg/services/WebGate/wsdl'
    amount = data['amount']
    description = data['description']
    mobile = data['mobile']

    client = Client(ZARINPAL_WEBSERVICE)
    result = client.service.PaymentRequest(MMERCHANT_ID, amount, description, '', mobile, 'http://sarayemaryam.ir/test/')
    print(result)
    if result.Status == 100:
        return JsonResponse({'status':'ok', 'authority': result.Authority},encoder=JSONEncoder)
    else:
        return JsonResponse({'status':'error'}, encoder=JSONEncoder)


@csrf_exempt
def verify_pay(request):
    print(request.GET)
    data = request.GET
    context = {}
    all_amount = 0
    if data['Status']=="OK":
        context['status'] = 'پرداخت شما با موفقیت انجام شد.'
        kalas = Tarikhche_kharid.objects.filter(authority=data['Authority'])
        this_user = User.objects.filter(username=kalas[0].username).get()
        text = "سبد خرید : " + "\n\n آیدی : " + this_user.tel_id + "\n\nشماره : " + this_user.phone_number + "\n\nآدرس : " + this_user.address + "\n\nکد پستی : " + this_user.post_code + "\n\nنحوه دریافت کالا :" + kalas[0].pick_kala + "\n\n\nوضعیت پرداخت : موفق"
        print(text)
        kalas = Tarikhche_kharid.objects.filter(authority=data['Authority'])
        list  = []
        for j in json.loads(str(kalas[0].kalas).replace("'","\""))['result']:
            all_amount += int(j['amount']) * int(j['num']);
            text = text + "\n\n---------------------" + "\n\n" + "\n\nنام محصول : " + j['name'] + "\n\n  قیمت آن : " + j['amount'] + "\n\n و تعداد آن:  " + j['num'] + "\n\n و رنگ آن : " + j['color'] + "\n\n و سایز آن : " + j['size']
            list.append(j['name'])

            print("\n\n\n"+str(j['this_id'])+"\n\n\n")
            r_2 = requests.post("http://193.176.243.61:8080/kala/"+j['group']+"/remove_num", data={'name': j['name'],'id': str(j['this_id']),'num': j['num'],'color': j['color'],'size': j['size']})
            print(r_2.text[0:250])
            context['list'] = list
            #j.objects.update(status="OK")
            Tarikhche_kharid.objects.filter(pk=kalas[0].pk).update(status="OK", level_sabt="OK")
        
        text += "\n\n---------------------\n"+"مبلغ کل : "+str(all_amount)
        r = requests.post("http://193.176.243.61:8080/send_message",data={'text':text})
        
        phone = str(this_user.phone_number)

        e_digits = "0123456789"
        f_digits = "۰۱۲۳۴۵۶۷۸۹"

        for i in range(len(e_digits)):
            phone = phone.replace(f_digits[i], e_digits[i])

        text = f"""مشتری عزیز سلام
سفارش شما ثبت و درصف پردازش و اقدام قرار گرفت.
شماره سفارش : {kalas[0].id}
شماره پیگیری : {str(int(data['Authority'][1:]))}
سرای مریم"""

        

        r = requests.get(f"https://login.niazpardaz.ir/SMSInOutBox/SendSms?username=c.09024324737&password=674579&from=10009611&to={phone}&text={text}").text
        context['status_sms'] = r
        #r_3 = request.post("http://193.176.243.61:8200/pay/verify",data={'authority':data['Authority'],'amount':})

    elif data['Status']=="NOK":
        context['status'] = 'پرداخت شما دچار مشکل شد.'
        kalas = Tarikhche_kharid.objects.filter(authority=data['Authority'])
        this_user = User.objects.filter(username=kalas[0].username).get()
        text = "سبد خرید : " + "\n\n آیدی : " + this_user.tel_id + "\n\nشماره : " + this_user.phone_number + "\n\nآدرس : " + this_user.address + "\n\nکد پستی : " + this_user.post_code + "\n\nنحوه دریافت کالا :" + kalas[0].pick_kala + "\n\n\nوضعیت پرداخت : ناموفق"
        print(text)
        kalas = Tarikhche_kharid.objects.filter(authority=data['Authority'])
        list  = []
        for j in json.loads(str(kalas[0].kalas).replace("'","\""))['result']:
            all_amount += int(j['amount']) * int(j['num']);
            text = text + "\n\n---------------------" + "\n\n" + "\n\nنام محصول : " + j['name'] + "\n\n  قیمت آن : " + j['amount'] + "\n\n و تعداد آن:  " + j['num'] + "\n\n و رنگ آن : " + j['color'] + "\n\n و سایز آن : " + j['size']
            list.append(j['name'])

            # print("\n\n\n"+str(j.this_id)+"\n\n\n")
            # r_2 = requests.post("http://193.176.243.61:8080/kala/"+j.group+"/remove_num", data={'name': j.name,'id': str(j.this_id),'num': j.num,'color': j.color,'size': j.size})
            # print(r_2.text[0:250])
            context['list'] = list
        text += "\n\n---------------------\n"+"مبلغ کل : "+str(all_amount)
        r = requests.post("http://193.176.243.61:8080/send_message",data={'text':text}) 
    # context = {"context":data['authority']}
    return render(request,'verify_pay.html', context)
