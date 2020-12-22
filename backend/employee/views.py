from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import HttpResponse, JsonResponse
from database.models import *
from django import db
# Create your views here.


@csrf_exempt
def employee_login(request):
    employee_id = json.loads(request.body)['employee_id']
    employee_password = json.loads(request.body)['employee_password']

    try:
        employee = list(Employee.objects.filter(
            employee_id=employee_id).values())[0]
        if employee['employee_password'] == employee_password:
            return JsonResponse({"result": "success"})
        else:
            return JsonResponse({'result': 'employee password is wrong'})
    except Exception as e:
        print(e)
        return JsonResponse({"result": "employee id not found"})
    finally:
        db.connections.close_all()


@csrf_exempt
def employee_home(request):
    try:
        mobile_model_id = request.POST['mobile_model_id']
        mobile_name = request.POST['mobile_name']
        mobile_screen = request.POST['mobile_screen']
        mobile_camera = request.POST['mobile_camera']
        mobile_battery = request.POST['mobile_battery']
        mobile_ram = request.POST['mobile_ram']
        mobile_rom = request.POST['mobile_rom']
        mobile_os = request.POST['mobile_os']
        mobile_warranty = request.POST['mobile_warranty']
        mobile_amount = request.POST['mobile_amount']
        mobile_models = MobileModels(mobile_model_id, mobile_name, mobile_screen,
                                     mobile_camera, mobile_battery, mobile_ram, mobile_rom, mobile_os, mobile_warranty, mobile_amount)
        mobile_models.save()
        for i in request.FILES:

            mobile_images = MobileImages(
                MobileImages.objects.count()+1, mobile_model_id, request.FILES[i])
            mobile_images.save()
        return HttpResponse("success")
    except Exception as e:
        print(e)
        return HttpResponse("failed")
    finally:
        db.connections.close_all()


@csrf_exempt
def delete_model(request):
    try:
        model_id = json.loads(request.body)['model_id']
        MobileImages.objects.filter(mobile_model_id=model_id).delete()
        MobileModels.objects.get(mobile_model_id=model_id).delete()

        return HttpResponse("success")
    except Exception as e:
        print(e)
        return HttpResponse("failed")
    finally:
        db.connections.close_all()
