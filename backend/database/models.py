from django.db import models

# Create your models here.


class Employee(models.Model):
    employee_id = models.CharField(max_length=25, primary_key=True)
    employee_password = models.CharField(max_length=25)


class MobileModels(models.Model):
    mobile_model_id = models.CharField(max_length=25, primary_key=True)
    mobile_name = models.CharField(max_length=100)
    mobile_screen = models.CharField(max_length=500)
    mobile_camera = models.CharField(max_length=500)
    mobile_battery = models.CharField(max_length=500)
    mobile_ram = models.CharField(max_length=500)
    mobile_rom = models.CharField(max_length=500)
    mobile_os = models.CharField(max_length=500)
    mobile_warranty = models.CharField(max_length=500)
    mobile_amount = models.IntegerField()


class MobileImages(models.Model):
    mobile_model_id = models.ForeignKey(
        MobileModels, on_delete=models.CASCADE, db_column='mobile_model_id')
    mobile_image = models.ImageField(upload_to='images')


class Customer(models.Model):
    customer_name = models.CharField(max_length=50)
    customer_password = models.CharField(max_length=25)
    customer_phone_number = models.IntegerField()
    customer_address = models.CharField(max_length=100)
    customer_email = models.CharField(max_length=50)


class Cart(models.Model):
    customer_id = models.ForeignKey(
        Customer, on_delete=models.CASCADE, db_column='customer_id')
    mobile_model_id = models.ForeignKey(
        MobileModels, on_delete=models.CASCADE, db_column='mobile_model_id')
    date = models.CharField(max_length=100)


class Transaction(models.Model):
    customer_id = models.CharField(max_length=10)
    mobile_model_id = models.CharField(max_length=10)
    date = models.CharField(max_length=100)
