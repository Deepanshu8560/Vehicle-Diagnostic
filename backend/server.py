from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Dict, Any
import uuid
from datetime import datetime, timezone
import random


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Vehicle Models
class Vehicle(BaseModel):
    id: str
    name: str
    model: str
    year: int
    vin: str
    color: str

class DiagnosticsData(BaseModel):
    vehicle_id: str
    timestamp: str
    battery: Dict[str, Any]
    motor: Dict[str, Any]
    tires: Dict[str, Any]
    gps: Dict[str, Any]
    speed: float
    range: float


# Mock data for vehicles
vehicles_data = [
    {
        "id": "tesla-model-s-001",
        "name": "Model S Plaid",
        "model": "Model S",
        "year": 2024,
        "vin": "5YJSA1E26MF123456",
        "color": "Midnight Silver"
    },
    {
        "id": "tesla-model-3-001",
        "name": "Model 3 Performance",
        "model": "Model 3",
        "year": 2024,
        "vin": "5YJ3E1EB1MF234567",
        "color": "Pearl White"
    },
    {
        "id": "tesla-model-x-001",
        "name": "Model X Long Range",
        "model": "Model X",
        "year": 2024,
        "vin": "5YJXCBE20MF345678",
        "color": "Deep Blue"
    },
    {
        "id": "tesla-model-y-001",
        "name": "Model Y Dual Motor",
        "model": "Model Y",
        "year": 2024,
        "vin": "7SAYGDEE1MF456789",
        "color": "Red Multi-Coat"
    }
]


def generate_diagnostics(vehicle_id: str) -> Dict[str, Any]:
    """Generate random diagnostic data for a vehicle"""
    battery_level = random.uniform(20, 100)
    battery_health = random.uniform(85, 100)
    
    return {
        "vehicle_id": vehicle_id,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "battery": {
            "level": round(battery_level, 1),
            "health": round(battery_health, 1),
            "voltage": round(random.uniform(350, 410), 1),
            "temperature": round(random.uniform(20, 45), 1),
            "charging": battery_level < 30 or random.choice([True, False])
        },
        "motor": {
            "temperature": round(random.uniform(40, 95), 1),
            "rpm": random.randint(0, 18000),
            "power_output": round(random.uniform(0, 1020), 1),
            "efficiency": round(random.uniform(88, 97), 1)
        },
        "tires": {
            "front_left": round(random.uniform(32, 38), 1),
            "front_right": round(random.uniform(32, 38), 1),
            "rear_left": round(random.uniform(32, 38), 1),
            "rear_right": round(random.uniform(32, 38), 1),
            "temperature_avg": round(random.uniform(25, 45), 1)
        },
        "gps": {
            "latitude": round(random.uniform(37.0, 38.0), 6),
            "longitude": round(random.uniform(-122.5, -121.5), 6),
            "altitude": round(random.uniform(0, 500), 1),
            "speed": round(random.uniform(0, 120), 1),
            "satellites": random.randint(8, 15),
            "signal_strength": random.choice(["excellent", "good", "fair"])
        },
        "speed": round(random.uniform(0, 120), 1),
        "range": round(battery_level * 3.5, 1)
    }


# API Routes
@api_router.get("/")
async def root():
    return {"message": "Tesla Vehicle Diagnostics API", "version": "1.0.0"}


@api_router.get("/vehicles", response_model=List[Vehicle])
async def get_vehicles():
    """Get list of all available vehicles"""
    return vehicles_data


@api_router.get("/vehicles/{vehicle_id}", response_model=Vehicle)
async def get_vehicle(vehicle_id: str):
    """Get specific vehicle details"""
    vehicle = next((v for v in vehicles_data if v["id"] == vehicle_id), None)
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return vehicle


@api_router.get("/diagnostics/{vehicle_id}")
async def get_diagnostics(vehicle_id: str):
    """Get real-time diagnostics for a specific vehicle"""
    vehicle = next((v for v in vehicles_data if v["id"] == vehicle_id), None)
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    return generate_diagnostics(vehicle_id)


@api_router.get("/status/{vehicle_id}")
async def get_status(vehicle_id: str):
    """Get overall status summary for a vehicle"""
    vehicle = next((v for v in vehicles_data if v["id"] == vehicle_id), None)
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    diagnostics = generate_diagnostics(vehicle_id)
    
    # Calculate overall status
    battery_ok = diagnostics["battery"]["level"] > 20 and diagnostics["battery"]["health"] > 80
    motor_ok = diagnostics["motor"]["temperature"] < 90
    tires_ok = all(30 <= p <= 40 for p in [
        diagnostics["tires"]["front_left"],
        diagnostics["tires"]["front_right"],
        diagnostics["tires"]["rear_left"],
        diagnostics["tires"]["rear_right"]
    ])
    gps_ok = diagnostics["gps"]["satellites"] >= 4
    
    overall_status = "excellent" if all([battery_ok, motor_ok, tires_ok, gps_ok]) else \
                    "good" if sum([battery_ok, motor_ok, tires_ok, gps_ok]) >= 3 else \
                    "warning"
    
    return {
        "vehicle_id": vehicle_id,
        "overall_status": overall_status,
        "systems": {
            "battery": "ok" if battery_ok else "warning",
            "motor": "ok" if motor_ok else "warning",
            "tires": "ok" if tires_ok else "warning",
            "gps": "ok" if gps_ok else "warning"
        },
        "timestamp": datetime.now(timezone.utc).isoformat()
    }


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()