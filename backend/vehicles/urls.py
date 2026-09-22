from django.urls import path
from .views import (
    add_vehicle,
    get_vehicles,
    check_vehicle,
    vehicle_movement,
    dashboard_data
)

urlpatterns = [
    path('', get_vehicles, name='get_vehicles'),
    path('add/', add_vehicle, name='add_vehicle'),
    path('check/', check_vehicle, name='check_vehicle'),
    path('movement/', vehicle_movement, name='vehicle_movement'),
    path('dashboard/', dashboard_data, name='dashboard_data'),
]