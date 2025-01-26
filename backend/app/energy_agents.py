from dataclasses import dataclass
from datetime import datetime, timedelta
import numpy as np
import pandas as pd
from typing import Dict, List, Optional
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler

@dataclass
class EnergyData:
    timestamp: datetime
    production: float
    consumption: float
    battery_level: float
    weather_data: Dict

@dataclass
class PredictionResult:
    timestamp: datetime
    predicted_production: float
    predicted_consumption: float
    confidence: float

class MonitoringAgent:
    """Agent responsible for monitoring and analyzing energy data"""
    
    def __init__(self, home_id: str):
        self.home_id = home_id
        self.historical_data = []
        self.model = RandomForestRegressor()
        self.scaler = StandardScaler()
        self.anomaly_thresholds = {
            'production': {'low': 0, 'high': 15},
            'consumption': {'low': 0, 'high': 10}
        }

    def process_reading(self, reading: EnergyData) -> Dict:
        """Process new energy reading and detect anomalies"""
        # Validate reading
        if not self._validate_reading(reading):
            return {
                'status': 'error',
                'message': 'Invalid reading detected'
            }

        # Store reading
        self.historical_data.append(reading)
        
        # Check for anomalies
        anomalies = self._detect_anomalies(reading)
        
        return {
            'status': 'success',
            'anomalies': anomalies,
            'summary': self._generate_summary(reading)
        }

    def _validate_reading(self, reading: EnergyData) -> bool:
        """Validate energy reading data"""
        return (
            0 <= reading.production <= 100 and  # Reasonable production range
            0 <= reading.consumption <= 100 and  # Reasonable consumption range
            0 <= reading.battery_level <= 100    # Battery percentage
        )

    def _detect_anomalies(self, reading: EnergyData) -> List[str]:
        """Detect anomalies in energy readings"""
        anomalies = []
        
        # Production anomalies
        if reading.production < self.anomaly_thresholds['production']['low']:
            anomalies.append('Low production alert')
        elif reading.production > self.anomaly_thresholds['production']['high']:
            anomalies.append('High production alert')
            
        # Consumption anomalies
        if reading.consumption < self.anomaly_thresholds['consumption']['low']:
            anomalies.append('Low consumption alert')
        elif reading.consumption > self.anomaly_thresholds['consumption']['high']:
            anomalies.append('High consumption alert')
            
        return anomalies

    def _generate_summary(self, reading: EnergyData) -> Dict:
        """Generate summary of current energy status"""
        return {
            'timestamp': reading.timestamp,
            'current_production': reading.production,
            'current_consumption': reading.consumption,
            'battery_level': reading.battery_level,
            'net_energy': reading.production - reading.consumption
        }

class PredictionAgent:
    """Agent responsible for predicting future energy patterns"""
    
    def __init__(self, home_id: str):
        self.home_id = home_id
        self.model_production = RandomForestRegressor()
        self.model_consumption = RandomForestRegressor()
        self.scaler = StandardScaler()
        self.is_trained = False

    def train(self, historical_data: List[EnergyData]):
        """Train prediction models using historical data"""
        if len(historical_data) < 24:  # Need at least 24 hours of data
            return False
            
        # Prepare training data
        df = self._prepare_training_data(historical_data)
        
        # Train production model
        X = self._extract_features(df)
        y_prod = df['production']
        y_cons = df['consumption']
        
        # Scale features
        X_scaled = self.scaler.fit_transform(X)
        
        # Train models
        self.model_production.fit(X_scaled, y_prod)
        self.model_consumption.fit(X_scaled, y_cons)
        
        self.is_trained = True
        return True

    def predict_next_24h(self, current_data: EnergyData) -> List[PredictionResult]:
        """Predict energy patterns for next 24 hours"""
        if not self.is_trained:
            return []
            
        predictions = []
        current_time = current_data.timestamp
        
        for hour in range(24):
            future_time = current_time + timedelta(hours=hour)
            features = self._create_prediction_features(future_time, current_data)
            
            # Scale features
            features_scaled = self.scaler.transform([features])
            
            # Make predictions
            pred_prod = self.model_production.predict(features_scaled)[0]
            pred_cons = self.model_consumption.predict(features_scaled)[0]
            
            # Calculate confidence based on prediction variance
            confidence = self._calculate_confidence(features_scaled)
            
            predictions.append(PredictionResult(
                timestamp=future_time,
                predicted_production=pred_prod,
                predicted_consumption=pred_cons,
                confidence=confidence
            ))
            
        return predictions

    def _prepare_training_data(self, historical_data: List[EnergyData]) -> pd.DataFrame:
        """Prepare historical data for training"""
        data = []
        for reading in historical_data:
            data.append({
                'timestamp': reading.timestamp,
                'production': reading.production,
                'consumption': reading.consumption,
                'temperature': reading.weather_data.get('temperature', 20),
                'cloud_cover': reading.weather_data.get('cloud_cover', 0),
                'hour': reading.timestamp.hour,
                'day_of_week': reading.timestamp.weekday()
            })
        return pd.DataFrame(data)

    def _extract_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Extract features for model training"""
        # Time-based features
        df['hour_sin'] = np.sin(2 * np.pi * df['hour']/24)
        df['hour_cos'] = np.cos(2 * np.pi * df['hour']/24)
        df['day_sin'] = np.sin(2 * np.pi * df['day_of_week']/7)
        df['day_cos'] = np.cos(2 * np.pi * df['day_of_week']/7)
        
        feature_columns = [
            'hour_sin', 'hour_cos', 'day_sin', 'day_cos',
            'temperature', 'cloud_cover'
        ]
        
        return df[feature_columns]

    def _create_prediction_features(self, timestamp: datetime, current_data: EnergyData) -> List:
        """Create feature vector for prediction"""
        hour = timestamp.hour
        day = timestamp.weekday()
        
        return [
            np.sin(2 * np.pi * hour/24),
            np.cos(2 * np.pi * hour/24),
            np.sin(2 * np.pi * day/7),
            np.cos(2 * np.pi * day/7),
            current_data.weather_data.get('temperature', 20),
            current_data.weather_data.get('cloud_cover', 0)
        ]

    def _calculate_confidence(self, features_scaled) -> float:
        """Calculate prediction confidence score"""
        # Simple confidence calculation based on feature similarity to training data
        # In production, use more sophisticated uncertainty estimation
        return 0.8  # Placeholder confidence score

class OptimizationAgent:
    """Agent responsible for optimizing energy usage"""
    
    def __init__(self, home_id: str):
        self.home_id = home_id
        self.battery_capacity = 13.5  # kWh (Tesla Powerwall capacity)
        self.min_battery_level = 0.2
        self.max_battery_level = 0.9

    def optimize_usage(self, current_data: EnergyData, 
                      predictions: List[PredictionResult]) -> Dict:
        """Generate optimization recommendations"""
        # Calculate current energy balance
        net_energy = current_data.production - current_data.consumption
        battery_headroom = self.battery_capacity * self.max_battery_level - current_data.battery_level
        
        # Analyze predictions
        predicted_deficit = self._calculate_predicted_deficit(predictions)
        
        # Generate recommendations
        recommendations = []
        actions = {}
        
        if net_energy > 0:  # Current surplus
            if predicted_deficit > 0:  # Future deficit expected
                if battery_headroom > 0:
                    recommendations.append("Store surplus energy for predicted future deficit")
                    actions['store_energy'] = min(net_energy, battery_headroom)
                else:
                    recommendations.append("Consider selling surplus energy")
                    actions['sell_energy'] = net_energy
            else:
                recommendations.append("Optimal conditions for selling energy")
                actions['sell_energy'] = net_energy
                
        else:  # Current deficit
            if current_data.battery_level > self.battery_capacity * self.min_battery_level:
                recommendations.append("Use stored battery energy")
                actions['use_battery'] = abs(net_energy)
            else:
                recommendations.append("Consider purchasing energy")
                actions['buy_energy'] = abs(net_energy)
        
        return {
            'recommendations': recommendations,
            'actions': actions,
            'predicted_deficit': predicted_deficit
        }

    def _calculate_predicted_deficit(self, predictions: List[PredictionResult]) -> float:
        """Calculate predicted energy deficit over prediction period"""
        total_deficit = 0
        for pred in predictions:
            net_energy = pred.predicted_production - pred.predicted_consumption
            if net_energy < 0:
                total_deficit += abs(net_energy)
        return total_deficit

# Example usage
if __name__ == "__main__":
    # Initialize agents
    monitor = MonitoringAgent("home1")
    predictor = PredictionAgent("home1")
    optimizer = OptimizationAgent("home1")
    
    # Simulate current reading
    current_reading = EnergyData(
        timestamp=datetime.now(),
        production=5.0,
        consumption=3.0,
        battery_level=8.0,
        weather_data={
            'temperature': 25,
            'cloud_cover': 0.2
        }
    )
    
    # Process reading
    monitoring_result = monitor.process_reading(current_reading)
    print("\nMonitoring Results:")
    print(monitoring_result)
    
    # Generate predictions
    predictions = predictor.predict_next_24h(current_reading)
    
    # Get optimization recommendations
    optimization_result = optimizer.optimize_usage(current_reading, predictions)
    print("\nOptimization Recommendations:")
    print(optimization_result)