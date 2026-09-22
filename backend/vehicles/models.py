from django.db import models


class Vehicle(models.Model):
    vehicle_number = models.CharField(max_length=20)
    vehicle_type = models.CharField(max_length=20)
    owner_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    department = models.CharField(max_length=100)
    access_type = models.CharField(max_length=20)

    def __str__(self):
        return self.vehicle_number


class VehicleMovement(models.Model):
    vehicle = models.ForeignKey(
        Vehicle,
        on_delete=models.CASCADE,
        related_name="movements"
    )
    movement_type = models.CharField(max_length=10)
    movement_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.vehicle.vehicle_number} - {self.movement_type}"