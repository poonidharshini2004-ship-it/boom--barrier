from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt

import json

from .models import Vehicle, VehicleMovement


# =========================================================
# GET ALL VEHICLES
# GET /api/vehicles/
# =========================================================

def get_vehicles(request):

    if request.method != "GET":
        return JsonResponse(
            {"error": "Only GET method is allowed"},
            status=405
        )

    vehicles = Vehicle.objects.all().order_by("-id")

    data = []

    for vehicle in vehicles:
        data.append({
            "id": vehicle.id,
            "vehicle_number": vehicle.vehicle_number,
            "vehicle_type": vehicle.vehicle_type,
            "owner_name": vehicle.owner_name,
            "phone_number": vehicle.phone_number,
            "department": vehicle.department,
            "access_type": vehicle.access_type,
        })

    return JsonResponse(data, safe=False)


# =========================================================
# ADD / REGISTER VEHICLE
# POST /api/vehicles/add/
# =========================================================

@csrf_exempt
def add_vehicle(request):

    if request.method != "POST":
        return JsonResponse(
            {"error": "Only POST method is allowed"},
            status=405
        )

    try:
        data = json.loads(request.body)

        vehicle_number = data.get("vehicle_number")
        vehicle_type = data.get("vehicle_type")
        owner_name = data.get("owner_name")
        phone_number = data.get("phone_number")
        department = data.get("department")
        access_type = data.get("access_type")

        # Required fields
        if not vehicle_number:
            return JsonResponse(
                {"error": "Vehicle number is required"},
                status=400
            )

        if not vehicle_type:
            return JsonResponse(
                {"error": "Vehicle type is required"},
                status=400
            )

        if not owner_name:
            return JsonResponse(
                {"error": "Owner name is required"},
                status=400
            )

        if not phone_number:
            return JsonResponse(
                {"error": "Phone number is required"},
                status=400
            )

        if not department:
            return JsonResponse(
                {"error": "Department is required"},
                status=400
            )

        if not access_type:
            return JsonResponse(
                {"error": "Access type is required"},
                status=400
            )

        # Remove extra spaces
        vehicle_number = vehicle_number.strip()

        # Check duplicate
        if Vehicle.objects.filter(
            vehicle_number=vehicle_number
        ).exists():

            return JsonResponse(
                {
                    "error": "Vehicle already registered"
                },
                status=400
            )

        # Save vehicle
        vehicle = Vehicle.objects.create(
            vehicle_number=vehicle_number,
            vehicle_type=vehicle_type,
            owner_name=owner_name,
            phone_number=phone_number,
            department=department,
            access_type=access_type
        )

        return JsonResponse(
            {
                "message": "Vehicle registered successfully",
                "vehicle": {
                    "id": vehicle.id,
                    "vehicle_number": vehicle.vehicle_number,
                    "vehicle_type": vehicle.vehicle_type,
                    "owner_name": vehicle.owner_name,
                    "phone_number": vehicle.phone_number,
                    "department": vehicle.department,
                    "access_type": vehicle.access_type
                }
            },
            status=201
        )

    except json.JSONDecodeError:

        return JsonResponse(
            {"error": "Invalid JSON data"},
            status=400
        )

    except Exception as e:

        return JsonResponse(
            {"error": str(e)},
            status=500
        )


# =========================================================
# CHECK VEHICLE
# POST /api/vehicles/check/
# =========================================================

@csrf_exempt
def check_vehicle(request):

    if request.method != "POST":
        return JsonResponse(
            {"error": "Only POST method is allowed"},
            status=405
        )

    try:
        data = json.loads(request.body)

        vehicle_number = data.get("vehicle_number")

        if not vehicle_number:
            return JsonResponse(
                {"error": "Vehicle number is required"},
                status=400
            )

        vehicle_number = vehicle_number.strip()

        try:
            vehicle = Vehicle.objects.get(
                vehicle_number=vehicle_number
            )

        except Vehicle.DoesNotExist:

            return JsonResponse(
                {
                    "found": False,
                    "message": "Vehicle not registered"
                },
                status=404
            )

        return JsonResponse(
            {
                "found": True,
                "vehicle": {
                    "id": vehicle.id,
                    "vehicle_number": vehicle.vehicle_number,
                    "vehicle_type": vehicle.vehicle_type,
                    "owner_name": vehicle.owner_name,
                    "phone_number": vehicle.phone_number,
                    "department": vehicle.department,
                    "access_type": vehicle.access_type
                }
            }
        )

    except json.JSONDecodeError:

        return JsonResponse(
            {"error": "Invalid JSON data"},
            status=400
        )

    except Exception as e:

        return JsonResponse(
            {"error": str(e)},
            status=500
        )


# =========================================================
# ENTRY / EXIT
# POST /api/entry-exit/
# GET  /api/entry-exit/
# =========================================================

@csrf_exempt
def vehicle_movement(request):

    # -----------------------------------------------------
    # GET MOVEMENT RECORDS
    # -----------------------------------------------------

    if request.method == "GET":

        movements = VehicleMovement.objects.select_related(
            "vehicle"
        ).order_by("-movement_time")

        data = []

        for movement in movements:

            data.append({
                "id": movement.id,
                "vehicle_number":
                    movement.vehicle.vehicle_number,

                "vehicle_type":
                    movement.vehicle.vehicle_type,

                "owner_name":
                    movement.vehicle.owner_name,

                "movement":
                    movement.movement_type,

                "time":
                    movement.movement_time.strftime(
                        "%d-%m-%Y %I:%M %p"
                    )
            })

        return JsonResponse(data, safe=False)

    # -----------------------------------------------------
    # POST ENTRY / EXIT
    # -----------------------------------------------------

    if request.method == "POST":

        try:
            data = json.loads(request.body)

            vehicle_number = data.get("vehicle_number")
            movement_type = data.get("movement_type")

            if not vehicle_number:
                return JsonResponse(
                    {"error": "Vehicle number is required"},
                    status=400
                )

            if not movement_type:
                return JsonResponse(
                    {"error": "Movement type is required"},
                    status=400
                )

            vehicle_number = vehicle_number.strip()

            # Convert:
            # ENTRY -> Entry
            # EXIT  -> Exit
            # entry -> Entry
            # exit  -> Exit

            movement_type = str(
                movement_type
            ).strip().capitalize()

            if movement_type not in ["Entry", "Exit"]:

                return JsonResponse(
                    {
                        "error":
                        "Movement type must be Entry or Exit"
                    },
                    status=400
                )

            # Find vehicle
            try:

                vehicle = Vehicle.objects.get(
                    vehicle_number=vehicle_number
                )

            except Vehicle.DoesNotExist:

                return JsonResponse(
                    {
                        "error":
                        "Vehicle not registered"
                    },
                    status=404
                )

            # Save movement
            movement = VehicleMovement.objects.create(
                vehicle=vehicle,
                movement_type=movement_type
            )

            return JsonResponse(
                {
                    "message":
                        "Movement saved successfully",

                    "movement": {
                        "id":
                            movement.id,

                        "vehicle_number":
                            vehicle.vehicle_number,

                        "vehicle_type":
                            vehicle.vehicle_type,

                        "movement":
                            movement.movement_type,

                        "time":
                            movement.movement_time.strftime(
                                "%d-%m-%Y %I:%M %p"
                            )
                    }
                },
                status=201
            )

        except json.JSONDecodeError:

            return JsonResponse(
                {"error": "Invalid JSON data"},
                status=400
            )

        except Exception as e:

            return JsonResponse(
                {"error": str(e)},
                status=500
            )

    return JsonResponse(
        {"error": "Method not allowed"},
        status=405
    )


# =========================================================
# DASHBOARD
# GET /api/vehicles/dashboard/
# =========================================================

def dashboard_data(request):

    if request.method != "GET":
        return JsonResponse(
            {"error": "Only GET method is allowed"},
            status=405
        )

    try:

        # -------------------------------------------------
        # TOTAL VEHICLES
        # -------------------------------------------------

        total_vehicles = Vehicle.objects.count()

        # -------------------------------------------------
        # TODAY
        # -------------------------------------------------

        today = timezone.localdate()

        # -------------------------------------------------
        # TODAY'S ENTRIES
        # IMPORTANT:
        # movement_time, NOT timestamp
        # -------------------------------------------------

        entries = VehicleMovement.objects.filter(
            movement_type="Entry",
            movement_time__date=today
        ).count()

        # -------------------------------------------------
        # TODAY'S EXITS
        # -------------------------------------------------

        exits = VehicleMovement.objects.filter(
            movement_type="Exit",
            movement_time__date=today
        ).count()

        # -------------------------------------------------
        # VEHICLES CURRENTLY INSIDE
        # -------------------------------------------------

        inside = 0

        vehicles = Vehicle.objects.all()

        for vehicle in vehicles:

            last_movement = VehicleMovement.objects.filter(
                vehicle=vehicle
            ).order_by("-movement_time").first()

            if last_movement:

                if last_movement.movement_type == "Entry":
                    inside += 1

        # -------------------------------------------------
        # RECENT ACTIVITY
        # -------------------------------------------------

        recent_movements = VehicleMovement.objects.select_related(
            "vehicle"
        ).order_by("-movement_time")[:20]

        records = []

        for movement in recent_movements:

            if movement.movement_type == "Entry":
                status = "Inside"
            else:
                status = "Exited"

            records.append({

                "vehicle_number":
                    movement.vehicle.vehicle_number,

                "vehicle_type":
                    movement.vehicle.vehicle_type,

                "movement":
                    movement.movement_type,

                "time":
                    movement.movement_time.strftime(
                        "%d-%m-%Y %I:%M %p"
                    ),

                "status":
                    status
            })

        # -------------------------------------------------
        # SEND DATA TO REACT
        # -------------------------------------------------

        return JsonResponse(
            {
                "total_vehicles":
                    total_vehicles,

                "entries":
                    entries,

                "exits":
                    exits,

                "inside":
                    inside,

                "records":
                    records
            }
        )

    except Exception as e:

        return JsonResponse(
            {
                "error": str(e)
            },
            status=500
        )