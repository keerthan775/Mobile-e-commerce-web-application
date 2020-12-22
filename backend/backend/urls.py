"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from employee import views as employee_views
from customer import views as customer_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('EmployeeLogin', employee_views.employee_login),
    path('EmployeeHome', employee_views.employee_home),
    path('CustomerLogin', customer_views.customer_login),
    path('CustomerRegistration', customer_views.customer_registration),
    path('CustomerDetails', customer_views.customer_details),
    path('CustomerCart', customer_views.customer_cart),
    path('CustomerTransaction', customer_views.customer_transaction),
    path('CustomerUpdateDetails', customer_views.customer_update_details),
    path('Image', customer_views.images),
    path('ModuleCount', customer_views.model_count),
    path('image_count', customer_views.image_count),
    path('model_image', customer_views.model_image),
    path('model_details', customer_views.model_details),
    path('insert_cart', customer_views.insert_cart),
    path('insert_transaction', customer_views.insert_transaction),
    path('delete_cart', customer_views.delete_cart),
    path('delete_model', employee_views.delete_model),
    path('modelid_list', customer_views.modelid_list)
]
