from django.shortcuts import render
from django.http import JsonResponse
from json import JSONEncoder
import os
import requests
from .models import User,Pooshak , Parcheh , Kharazi , Hejab,Cart
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse,HttpResponseBadRequest
import csv
from django import forms


@csrf_exempt
def register(request):
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
    try:
        this_tel_id = User.objects.filter(username=request.POST['username'],password=request.POST['password'])[0].tel_id
        this_phone = User.objects.filter(username=request.POST['username'],password=request.POST['password'])[0].phone_number
        this_address = User.objects.filter(username=request.POST['username'],password=request.POST['password'])[0].address
        this_post_code = User.objects.filter(username=request.POST['username'],password=request.POST['password'])[0].post_code
        return JsonResponse({'status':'ok','result':request.POST,'tel_id':this_tel_id,'this_phone':this_phone,'this_address':this_address,'post_code':this_post_code},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def get_all_pooshak(request):
    all = []
    count = 0
    for pooshak in Pooshak.objects.all():
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['name']='{1}';this_kala{0}['text']='{2}';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';all.append(this_kala{0})".format(count,pooshak.name,pooshak.text,pooshak.amount,pooshak.img,pooshak.id))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)
@csrf_exempt
def get_all_parcheh(request):
    all = []
    count = 0
    for parcheh in Parcheh.objects.all():
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['name']='{1}';this_kala{0}['text']='{2}';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';all.append(this_kala{0})".format(count,parcheh.name,parcheh.text,parcheh.amount,parcheh.img,parcheh.id))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)
@csrf_exempt
def get_all_hejab(request):
    all = []
    count = 0
    for hejab in Hejab.objects.all():
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['name']='{1}';this_kala{0}['text']='{2}';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';all.append(this_kala{0})".format(count,hejab.name,hejab.text,hejab.amount,hejab.img,hejab.id))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)
@csrf_exempt
def get_all_kharazi(request):
    all = []
    count = 0
    for kharazi in Kharazi.objects.all():
        count += 1
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['id']={5};this_kala{0}['name']='{1}';this_kala{0}['text']='{2}';this_kala{0}['amount']='{3}';this_kala{0}['img']='{4}';all.append(this_kala{0})".format(count,kharazi.name,kharazi.text,kharazi.amount,kharazi.img,kharazi.id))

    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)

@csrf_exempt
def add_new_parcheh(request):
    try:
        data = request.POST
        Parcheh.objects.create(name=data['name'],text=data['text'],img=data['img'],amount=data['amount'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
    
@csrf_exempt
def add_new_pooshak(request):
    try:
        data = request.POST
        Pooshak.objects.create(name=data['name'],text=data['text'],img=data['img'],amount=data['amount'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
    
@csrf_exempt
def add_new_hejab(request):
    try:
        data = request.POST
        Hejab.objects.create(name=data['name'],text=data['text'],img=data['img'],amount=data['amount'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
    
@csrf_exempt
def add_new_kharazi(request):
    try:
        data = request.POST
        Kharazi.objects.create(name=data['name'],text=data['text'],img=data['img'],amount=data['amount'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)

@csrf_exempt
def send_message(request):
    data = {"chat_id":"7819430","text":request.POST['text']}
    requests.post("https://eitaayar.ir/api/bot20579:cdf451e2-577d-46bc-a768-59c764c41aeb/sendmessage",data=data)
    return JsonResponse({'status':'ok','result':request.POST},encoder=JSONEncoder)


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
def edit_parcheh(request):
    try:
        data = request.POST
        this_kala = Parcheh.objects.filter(id=int(data['id']))
        this_name = data['name']
        this_text = data['text']
        this_img = data['img']
        this_amount = data['amount']
        this_kala.update(name=this_name,text=this_text,img=this_img,amount=this_amount)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
    
@csrf_exempt
def edit_pooshak(request):
    try:
        data = request.POST
        this_kala = Pooshak.objects.filter(id=int(data['id']))
        this_name = data['name']
        this_text = data['text']
        this_img = data['img']
        this_amount = data['amount']
        this_kala.update(name=this_name,text=this_text,img=this_img,amount=this_amount)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
    
@csrf_exempt
def edit_hejab(request):
    try:
        data = request.POST
        this_kala = Hejab.objects.filter(id=int(data['id']))
        this_name = data['name']
        this_text = data['text']
        this_img = data['img']
        this_amount = data['amount']
        this_kala.update(name=this_name,text=this_text,img=this_img,amount=this_amount)
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
        this_kala.update(name=this_name,text=this_text,img=this_img,amount=this_amount)
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
    
@csrf_exempt
def add_to_cart(request):
    try:
        data = request.POST
        this_user = User.objects.filter(username=data['user'])[0]
        this_kala = Cart.objects.create(user=this_user,name=data['name'],amount=data['amount'],kala_address=data['kala_address'],img=data['img'],num=data['num'])
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)
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
        exec("this_kala{0}=".format(count)+"{}"+";this_kala{0}['name']='{1}';this_kala{0}['amount']='{2}';this_kala{0}['kala_address']='{3}';this_kala{0}['img']='{4}';this_kala{0}['num']='{5}';all.append(this_kala{0})".format(count,kala.name,kala.amount,kala.kala_address,kala.img,kala.num))
    return JsonResponse({'status':'ok','result': all},encoder=JSONEncoder)


@csrf_exempt
def edit_account(request):
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
    try:
        data = request.POST
        this_user = User.objects.filter(username=data['username'],password=data['password']).delete()
        return JsonResponse({'status':'ok'},encoder=JSONEncoder)
    except:
        return JsonResponse({'status':'error'},encoder=JSONEncoder)