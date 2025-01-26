import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowUp, ArrowDown, Battery, Cloud, Thermometer } from 'lucide-react';
import { fetchPredictions } from '../services/energyService';
import { useEffect, useState } from 'react';

interface PredictionData {
  predictedUsage: number;
  predictedGeneration: number;
  surplus: number;
  batteryLevel: number;
  recommendations: string[];
  weather_data: {
    temperature: number;
    cloud_cover: number;
    condition: string;
  };
}

export const PredictedUsage = () => {
  const { toast } = useToast();
  const [prediction, setPrediction] = useState<PredictionData>({
    predictedUsage: 0,
    predictedGeneration: 0,
    surplus: 0,
    batteryLevel: 0,
    recommendations: [],
    weather_data: { temperature: -5, cloud_cover: 20, condition: 'Windy' }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const predictionData = await fetchPredictions();
        console.log('Fetched Prediction Data:', predictionData);

        const userSurveyData = JSON.parse(localStorage.getItem('userSurvey') || '{}');
        console.log('User Survey Data:', userSurveyData);

        const newPrediction = {
          predictedUsage: predictionData.averageConsumption,
          predictedGeneration: predictionData.averageProduction,
          surplus: predictionData.averageProduction - predictionData.averageConsumption || 0,
          batteryLevel: userSurveyData.batteryLevel || 0,
          recommendations: userSurveyData.recommendations || [],
          weather_data: {
            temperature: userSurveyData.weather?.temperature || 0,
            cloud_cover: userSurveyData.weather?.cloud_cover || 0,
            condition: userSurveyData.weather?.condition || 'Unknown'
          }
        };

        console.log('Setting New Prediction:', newPrediction);
        setPrediction(newPrediction);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch prediction data",
          variant: "destructive"
        });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Updated Prediction State:', prediction);
  }, [prediction]);

  const handleCreateListing = () => {
    toast({
      title: "Listing Created",
      description: `Listed ${prediction.surplus.toFixed(2)} kWh surplus energy for sale`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Predicted Energy Status</span>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Thermometer className="w-4 h-4" />
              {prediction.weather_data.temperature}°C
            </div>
            <div className="flex items-center gap-1">
              <Cloud className="w-4 h-4" />
              {prediction.weather_data.condition}
            </div>
            <div className="flex items-center gap-1">
              <Battery className="w-4 h-4" />
              {prediction.batteryLevel.toFixed(1)} kWh
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Predicted Usage</p>
            <p className="text-2xl font-bold">{prediction.predictedUsage.toFixed(2)} kWh</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Predicted Generation</p>
            <p className="text-2xl font-bold">{prediction.predictedGeneration.toFixed(2)} kWh</p>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border flex items-center justify-between">
          <div className="flex items-center gap-2">
            {prediction.surplus > 0 ? (
              <>
                <ArrowUp className="text-green-500" />
                <div>
                  <p className="font-medium text-green-600">Surplus</p>
                  <p className="text-2xl font-bold text-green-700">+{prediction.surplus.toFixed(2)} kWh</p>
                </div>
              </>
            ) : (
              <>
                <ArrowDown className="text-red-500" />
                <div>
                  <p className="font-medium text-red-600">Deficit</p>
                  <p className="text-2xl font-bold text-red-700">{prediction.surplus.toFixed(2)} kWh</p>
                </div>
              </>
            )}
          </div>
          
          {prediction.surplus > 0 ? (
            <Button onClick={handleCreateListing}>
              List {prediction.surplus.toFixed(2)} kWh
            </Button>
          ) : (
            <Button onClick={() => window.location.href = prediction.surplus > 0 ? '/buyers' : '/marketplace'}>
            {prediction.surplus > 0 ? `Find Buyers` : `Find Sellers`}
          </Button>
          )}
        </div>

        <div className="space-y-2">
          <p className="font-medium">Recommendations:</p>
          {prediction.recommendations.map((rec, index) => (
            <p key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
              {rec}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};