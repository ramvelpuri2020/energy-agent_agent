import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface PredictionData {
  predictedUsage: number;
  predictedGeneration: number;
  surplus: number;
}

export const PredictedUsage = () => {
  const { toast } = useToast();
  
  // For MVP, we'll simulate prediction data
  const prediction: PredictionData = {
    predictedUsage: 25,
    predictedGeneration: 30,
    surplus: 5
  };

  const handleCreateListing = () => {
    toast({
      title: "Listing Created",
      description: `Listed ${prediction.surplus.toFixed(2)} kWh surplus energy for sale`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Predicted Energy Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Predicted Usage</p>
            <p className="text-2xl font-bold">{prediction.predictedUsage} kWh</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Predicted Generation</p>
            <p className="text-2xl font-bold">{prediction.predictedGeneration} kWh</p>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border flex items-center justify-between">
          <div className="flex items-center gap-2">
            {prediction.surplus > 0 ? (
              <>
                <ArrowUp className="text-green-500" />
                <div>
                  <p className="font-medium text-green-600">Surplus</p>
                  <p className="text-2xl font-bold text-green-700">+{prediction.surplus} kWh</p>
                </div>
              </>
            ) : (
              <>
                <ArrowDown className="text-red-500" />
                <div>
                  <p className="font-medium text-red-600">Deficit</p>
                  <p className="text-2xl font-bold text-red-700">{prediction.surplus} kWh</p>
                </div>
              </>
            )}
          </div>
          
          {prediction.surplus > 0 ? (
            <Button onClick={handleCreateListing}>
              List {prediction.surplus} kWh
            </Button>
          ) : (
            <Button onClick={() => window.location.href = '/marketplace'}>
              Find Sellers
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};