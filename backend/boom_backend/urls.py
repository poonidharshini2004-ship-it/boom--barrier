from django.contrib import admin
from django.urls import path, include

from vehicles.views import vehicle_movement

urlpatterns = [
    path("admin/", admin.site.urls),

    # Vehicle APIs
    path(
        "api/vehicles/",
        include("vehicles.urls")
    ),

    # Entry / Exit API
    path(
        "api/entry-exit/",
        vehicle_movement,
        name="vehicle_movement"
    ),
]