from django.urls import path
from .views import CustomerListView

urlpatterns = [
    path('customer/', CustomerListView.as_view(),'customer')
]
