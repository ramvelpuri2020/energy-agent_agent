import axios from 'axios';

// Base URL for your FastAPI server
const API_BASE_URL = 'http://localhost:8000';

// Function to submit energy readings
export const submitReading = async (reading) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/readings`, reading);
    return response.data;
  } catch (error) {
    console.error('Error submitting reading:', error);
    throw error;
  }
};

// Function to fetch predictions
export const fetchPredictions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/predict/next24h`);
      const predictions = response.data;
    
    // get avg consumption in a day
      const total = predictions.reduce(
        (acc, curr) => {
          acc.production += curr.predicted_production;
          acc.consumption += curr.predicted_consumption;
          acc.confidence += curr.confidence;
          return acc;
        },
        { production: 0, consumption: 0, confidence: 0 }
      );
  
      const count = predictions.length;
      console.log(total.production / count)
      console.log(total.consumption / count)
      return {
        averageProduction: total.production / count,
        averageConsumption: total.consumption / count,
        averageConfidence: total.confidence / count,
      };
    } catch (error) {
      console.error('Error fetching predictions:', error);
      throw error;
    }
  };