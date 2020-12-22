from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import HttpResponse, JsonResponse
from database.models import *
from django import db
# Create your views here.

username = ''


@csrf_exempt
def customer_login(request):
    customer_name = json.loads(request.body)['customer_name']
    customer_password = json.loads(request.body)['customer_password']
    try:
        customer = list(Customer.objects.filter(
            customer_name=customer_name).values())[0]
        if customer['customer_password'] == customer_password:
            global username
            username = customer_name
            return JsonResponse({"result": "success"})
        else:
            return JsonResponse({'result': 'customer password is wrong'})
    except Exception as e:
        print(e)
        return JsonResponse({"result": "customer id not found"})
    finally:
        db.connections.close_all()


@csrf_exempt
def customer_registration(request):
    try:
        customer_name = request.POST['customer_name']
        customer_password = request.POST['customer_password']
        customer_phone_number = request.POST['customer_phone_number']
        customer_address = request.POST['customer_address']
        customer_email = request.POST['customer_email']
        customer = Customer()
        customer.customer_name = customer_name
        customer.customer_password = customer_password
        customer.customer_phone_number = customer_phone_number
        customer.customer_address = customer_address
        customer.customer_email = customer_email
        customer.save()
        return HttpResponse("Success")
    except Exception as e:
        print(e)
        return HttpResponse("failed")
    finally:
        db.connections.close_all()


@csrf_exempt
def customer_details(request):
    try:
        return JsonResponse(list(Customer.objects.filter(customer_name=username).values())[0])
    except:
        return HttpResponse("failed")
    finally:
        db.connections.close_all()


@csrf_exempt
def customer_cart(request):
    try:
        customer_id = list(Customer.objects.filter(
            customer_name=username).values())[0]['id']

        # rows of customer_id
        cart = list(Cart.objects.filter(customer_id=customer_id).values())

        values = []
        # collecting model id ,mobile name and date
        for cart_row in cart:
            value = []
            value.append(cart_row['mobile_model_id_id'])
            value.append(list(MobileModels.objects.filter(
                mobile_model_id=cart_row['mobile_model_id_id']).values())[0]['mobile_name'])
            value.append(cart_row['date'])
            values.append(value)
        return JsonResponse({"values": values})
    except Exception as e:
        print(e)
        return HttpResponse("success")
    finally:
        db.connections.close_all()


@csrf_exempt
def customer_transaction(request):
    try:
        # same as cart
        customer_id = list(Customer.objects.filter(
            customer_name=username).values())[0]['id']
        transaction = list(Transaction.objects.filter(
            customer_id=str(customer_id)).values())

        values = []
        for transaction_row in transaction:
            value = []
            value.append(transaction_row['mobile_model_id'])
            value.append(list(MobileModels.objects.filter(
                mobile_model_id=transaction_row['mobile_model_id']).values())[0]['mobile_name'])
            value.append(transaction_row['date'])
            values.append(value)
        return JsonResponse({"values": values})
    except Exception as e:
        print(e)
        return HttpResponse("success")
    finally:
        db.connections.close_all()


@csrf_exempt
def customer_update_details(request):
    try:
        attribute = json.loads(request.body)['attribute']
        if attribute == 'customer_phone_number':
            new_value = int(json.loads(request.body)['new_value'])
        else:
            new_value = json.loads(request.body)['new_value']
        customer = Customer.objects.get(customer_name=username)
        if attribute == 'customer_password':
            customer.customer_password = new_value
        elif attribute == 'customer_phone_number':
            customer.customer_phone_number = new_value
        elif attribute == 'customer_address':
            customer.customer_address = new_value
        else:
            customer.customer_email = new_value
        customer.save()

        return HttpResponse("success")
    except Exception as e:
        print(e)
        return HttpResponse("failed")
    finally:
        db.connections.close_all()


@csrf_exempt
def model_count(request):
    try:
        count = MobileModels.objects.all().count()
        return HttpResponse(count)
    except Exception as e:
        print(e)
        return HttpResponse("failed")
    finally:
        db.connections.close_all()


@csrf_exempt
def images(request):
    try:
        mobile_model_id = json.loads(request.body)['mobile_model_id']
        image = MobileImages.objects.filter(mobile_model_id=mobile_model_id)[
            0].mobile_image
        return HttpResponse(image)
    except Exception as e:
        print(e)
        return HttpResponse("failed")
    finally:
        db.connections.close_all()


@csrf_exempt
def image_count(request):
    try:
        mobile_model_id = json.loads(request.body)['model_id']
        count = MobileImages.objects.filter(
            mobile_model_id=mobile_model_id).count()
        return JsonResponse({'count': count})

    except Exception as e:
        print(e)
        return HttpResponse("failed")
    finally:
        db.connections.close_all()


@csrf_exempt
def model_image(request):
    try:
        mobile_model_id = json.loads(request.body)['model_id']
        row_num = json.loads(request.body)['row_num']
        image = MobileImages.objects.filter(
            mobile_model_id=mobile_model_id)[row_num].mobile_image
        return HttpResponse(image)

    except Exception as e:
        print(e)
        return HttpResponse("failed")
    finally:
        db.connections.close_all()


@csrf_exempt
def model_details(request):
    try:
        mobile_model_id = json.loads(request.body)['model_id']
        model = list(MobileModels.objects.filter(
            mobile_model_id=mobile_model_id).values())[0]
        return JsonResponse(model)

    except Exception as e:
        print(e)
        return HttpResponse("failed")
    finally:
        db.connections.close_all()


@csrf_exempt
def insert_cart(request):
    try:
        mobile_model_id = json.loads(request.body)['model_id']
        date = json.loads(request.body)['date']
        # if model is already in cart then again it should not get insert
        if(Cart.objects.filter(mobile_model_id_id=mobile_model_id).count() == 0):
            cart = Cart()
            cart.customer_id = Customer.objects.get(customer_name=username)
            # mapping mobile model table to model image table
            cart.mobile_model_id = MobileModels.objects.get(
                mobile_model_id=mobile_model_id)
            cart.date = date
            cart.save()
        return HttpResponse("success")

    except Exception as e:
        print(e)
        return HttpResponse("failed")
    finally:
        db.connections.close_all()


@csrf_exempt
def insert_transaction(request):
    try:
        mobile_model_id = json.loads(request.body)['model_id']
        date = json.loads(request.body)['date']
        transaction = Transaction()
        transaction.customer_id = list(Customer.objects.filter(
            customer_name=username).values())[0]['id']
        transaction.mobile_model_id = mobile_model_id
        transaction.date = date
        transaction.save()
        return HttpResponse("success")

    except Exception as e:
        print(e)
        return HttpResponse("failed")
    finally:
        db.connections.close_all()


@csrf_exempt
def delete_cart(request):
    try:
        mobile_model_id = json.loads(request.body)['model_id']
        Cart.objects.get(mobile_model_id=mobile_model_id).delete()
        return HttpResponse("success")

    except Exception as e:
        print(e)
        return HttpResponse("failed")
    finally:
        db.connections.close_all()


@csrf_exempt
def modelid_list(request):
    try:
        model = list(MobileModels.objects.all().values())
        l = []
        for i in model:
            l.append(i['mobile_model_id'])

        return JsonResponse({"model_id": l})

    except Exception as e:
        print(e)
        return HttpResponse("failed")
    finally:
        db.connections.close_all()
