import { EnergyChart } from './EnergyChart';
import { TradePanel } from './TradePanel';
import { AIRecommendations } from './AIRecommendations';
import { generateMockEnergyData, mockTradeOffers } from '@/lib/mockData';

export const Dashboard = () => {
  const energyData = generateMockEnergyData();
  const currentGeneration = energyData[energyData.length - 1].generated;
  const currentConsumption = energyData[energyData.length - 1].consumed;

  return (
    <div className="container mx-auto py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Energy Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Current Generation</h3>
          <p className="text-4xl font-bold text-primary">{currentGeneration.toFixed(2)} kWh</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Current Consumption</h3>
          <p className="text-4xl font-bold text-secondary">{currentConsumption.toFixed(2)} kWh</p>
        </div>
      </div>

      <div className="mb-8">
        <EnergyChart data={energyData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TradePanel offers={mockTradeOffers} />
        <AIRecommendations />
      </div>
    </div>
  );
};