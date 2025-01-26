from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import datetime, timedelta
from typing import List, Dict, Optional
import uvicorn
import numpy as np

from fastapi.middleware.cors import CORSMiddleware

# Pydantic models for request/response
class WeatherData(BaseModel):
    temperature: float
    cloud_cover: float
    condition: str

class EnergyReading(BaseModel):
    timestamp: datetime
    production: float
    consumption: float
    battery_level: float
    weather_data: WeatherData

class Prediction(BaseModel):
    timestamp: datetime
    predicted_production: float
    predicted_consumption: float
    confidence: float

class OptimizationRecommendation(BaseModel):
    action_type: str
    amount: float
    priority: int
    description: str

class OptimizationResponse(BaseModel):
    recommendations: List[OptimizationRecommendation]
    total_savings_potential: float

# Initialize FastAPI app
app = FastAPI(
    title="Energy Management System API",
    description="API for smart home energy management with AI agents",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # Update with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Store some data in memory (in production, use a proper database)
class DataStore:
    def __init__(self):
        self.readings: List[EnergyReading] = []
        self.battery_capacity = 13.5  # kWh (Tesla Powerwall capacity)

data_store = DataStore()

# Routes
@app.get("/")
async def root():
    return {
        "message": "Energy Management System API",
        "version": "1.0.0",
        "endpoints": [
            "/readings",
            "/predict",
            "/optimize",
            "/status"
        ]
    }

@app.post("/readings", response_model=Dict)
async def add_reading(reading: EnergyReading):
    """Add a new energy reading"""
    try:
        # Validate reading
        if reading.production < 0 or reading.consumption < 0:
            raise HTTPException(status_code=400, detail="Invalid energy values")
        
        # Add to data store
        data_store.readings.append(reading)
        
        # Calculate basic metrics
        net_energy = reading.production - reading.consumption
        
        return {
            "status": "success",
            "reading_id": len(data_store.readings),
            "net_energy": net_energy,
            "message": "Reading successfully recorded"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/readings", response_model=List[EnergyReading])
async def get_readings(limit: int = 10):
    """Get recent energy readings"""
    return data_store.readings[-limit:]

@app.get("/predict/next24h", response_model=List[Prediction])
async def predict_next_24h():
    """Predict energy production and consumption for next 24 hours"""
    try:
        if not data_store.readings:
            raise HTTPException(status_code=400, detail="No historical data available")
        
        predictions = []
        current_time = datetime.now()
        
        # Get latest reading for reference
        latest_reading = data_store.readings[-1]
        
        for hour in range(24):
            future_time = current_time + timedelta(hours=hour)
            hour_of_day = future_time.hour
            
            # Simple prediction logic (replace with ML model in production)
            if 6 <= hour_of_day <= 18:  # Daytime
                pred_prod = latest_reading.production * np.random.normal(1.0, 0.1)
                pred_cons = latest_reading.consumption * np.random.normal(1.0, 0.1)
                confidence = 0.8
            else:  # Nighttime
                pred_prod = latest_reading.production * np.random.normal(0.2, 0.1)
                pred_cons = latest_reading.consumption * np.random.normal(0.7, 0.1)
                confidence = 0.7
                
            predictions.append(Prediction(
                timestamp=future_time,
                predicted_production=max(0, pred_prod),
                predicted_consumption=max(0, pred_cons),
                confidence=confidence
            ))
            
        return predictions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/optimize", response_model=OptimizationResponse)
async def optimize_energy(reading: EnergyReading):
    """Get optimization recommendations based on current state"""
    try:
        recommendations = []
        net_energy = reading.production - reading.consumption
        battery_headroom = data_store.battery_capacity - reading.battery_level
        
        if net_energy > 0:  # Surplus energy
            if reading.battery_level < data_store.battery_capacity * 0.9:
                # Recommend storing energy
                store_amount = min(net_energy, battery_headroom)
                recommendations.append(OptimizationRecommendation(
                    action_type="STORE",
                    amount=store_amount,
                    priority=1,
                    description=f"Store {store_amount:.2f} kWh in battery"
                ))
            
            # If there's still excess after battery storage
            remaining_surplus = net_energy - battery_headroom
            if remaining_surplus > 0:
                recommendations.append(OptimizationRecommendation(
                    action_type="SELL",
                    amount=remaining_surplus,
                    priority=2,
                    description=f"Sell {remaining_surplus:.2f} kWh to grid"
                ))
                
        else:  # Energy deficit
            deficit = abs(net_energy)
            if reading.battery_level > data_store.battery_capacity * 0.2:
                # Use battery power
                available_battery = reading.battery_level - (data_store.battery_capacity * 0.2)
                use_amount = min(deficit, available_battery)
                recommendations.append(OptimizationRecommendation(
                    action_type="USE_BATTERY",
                    amount=use_amount,
                    priority=1,
                    description=f"Use {use_amount:.2f} kWh from battery"
                ))
                
                remaining_deficit = deficit - use_amount
                if remaining_deficit > 0:
                    recommendations.append(OptimizationRecommendation(
                        action_type="BUY",
                        amount=remaining_deficit,
                        priority=2,
                        description=f"Buy {remaining_deficit:.2f} kWh from grid"
                    ))
            else:
                # Battery too low, buy all needed power
                recommendations.append(OptimizationRecommendation(
                    action_type="BUY",
                    amount=deficit,
                    priority=1,
                    description=f"Buy {deficit:.2f} kWh from grid"
                ))
        
        # Calculate potential savings (simplified)
        total_savings = sum(
            r.amount * 0.15 if r.action_type in ["STORE", "SELL"] else -r.amount * 0.20
            for r in recommendations
        )
        
        return OptimizationResponse(
            recommendations=recommendations,
            total_savings_potential=total_savings
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/status")
async def get_system_status():
    """Get current system status and statistics"""
    try:
        if not data_store.readings:
            return {
                "status": "inactive",
                "message": "No readings recorded yet"
            }
        
        latest = data_store.readings[-1]
        readings_24h = [r for r in data_store.readings 
                       if r.timestamp > datetime.now() - timedelta(hours=24)]
        
        return {
            "status": "active",
            "total_readings": len(data_store.readings),
            "latest_reading": {
                "timestamp": latest.timestamp,
                "production": latest.production,
                "consumption": latest.consumption,
                "battery_level": latest.battery_level
            },
            "last_24h_stats": {
                "total_readings": len(readings_24h),
                "avg_production": sum(r.production for r in readings_24h) / len(readings_24h),
                "avg_consumption": sum(r.consumption for r in readings_24h) / len(readings_24h),
                "peak_production": max(r.production for r in readings_24h),
                "peak_consumption": max(r.consumption for r in readings_24h)
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)