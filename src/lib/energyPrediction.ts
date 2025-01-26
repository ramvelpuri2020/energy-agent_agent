interface WeatherData {
  temperature: number;
  cloud_cover: number;
  condition: string;
}

interface EnergySnapshot {
  timestamp: Date;
  weather: WeatherData;
  production: number;
  consumption: number;
  batteryLevel: number;
  netEnergy: number;
}

interface PredictionResult {
  snapshot: EnergySnapshot;
  recommendations: string[];
}

// Simulate weather data (in real app, would fetch from weather API)
const getSimulatedWeather = (hour: number): WeatherData => {
  if (hour >= 10 && hour <= 16) {
    return {
      temperature: 28,
      cloud_cover: 0.1,
      condition: 'sunny'
    };
  }
  return {
    temperature: 22,
    cloud_cover: 0.3,
    condition: 'clear'
  };
};

export const predictEnergyStatus = (): PredictionResult => {
  const now = new Date();
  const hour = now.getHours();
  const weather = getSimulatedWeather(hour);
  
  // Simulate production based on time and weather
  let production = 0;
  if (hour >= 6 && hour <= 18) {
    production = 8.5 * (1 - weather.cloud_cover);
  } else {
    production = 0.8;
  }

  // Simulate consumption based on time of day
  let consumption = 3.0;
  if (hour >= 17 && hour <= 22) {
    consumption = 5.5; // Evening peak
  }

  const batteryLevel = 10.0;
  const netEnergy = production - consumption;

  const recommendations: string[] = [];
  if (netEnergy > 0) {
    recommendations.push(`Energy surplus detected: ${netEnergy.toFixed(2)} kWh`);
    const storageCapacity = 13.5 - batteryLevel;
    recommendations.push(`Can store up to ${storageCapacity.toFixed(2)} kWh in battery`);
  } else {
    recommendations.push(`Energy deficit detected: ${Math.abs(netEnergy).toFixed(2)} kWh`);
    recommendations.push(`Can use up to ${batteryLevel.toFixed(2)} kWh from battery`);
  }

  return {
    snapshot: {
      timestamp: now,
      weather,
      production,
      consumption,
      batteryLevel,
      netEnergy
    },
    recommendations
  };
};