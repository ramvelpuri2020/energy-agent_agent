import { TradeOffer } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';

interface TradePanelProps {
  offers: TradeOffer[];
}

export const TradePanel = ({ offers }: TradePanelProps) => {
  const { toast } = useToast();
  const [completedTrades, setCompletedTrades] = useState<string[]>([]);

  const handleTrade = (offer: TradeOffer) => {
    // Prevent double trading
    if (completedTrades.includes(offer.id)) {
      toast({
        title: "Trade Already Completed",
        description: "This trade has already been processed.",
        variant: "destructive"
      });
      return;
    }

    // Process the trade
    setCompletedTrades(prev => [...prev, offer.id]);
    
    const action = offer.type === 'sell' ? 'Bought' : 'Sold';
    const amount = offer.amount.toFixed(2);
    const price = offer.price.toFixed(2);
    
    toast({
      title: "Trade Successful",
      description: `${action} ${amount} kWh at $${price}/kWh`,
    });
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Available Trades</h3>
      <div className="space-y-4">
        {offers.map((offer) => {
          const isCompleted = completedTrades.includes(offer.id);
          
          return (
            <div 
              key={offer.id} 
              className={`flex items-center justify-between p-4 border rounded-md transition-colors ${
                isCompleted ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <div>
                <span className={`inline-block px-2 py-1 rounded text-sm ${
                  offer.type === 'sell' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {offer.type.toUpperCase()}
                </span>
                <p className="mt-2">{offer.amount.toFixed(2)} kWh at ${offer.price.toFixed(2)}/kWh</p>
              </div>
              <Button
                onClick={() => handleTrade(offer)}
                variant={isCompleted ? "secondary" : "outline"}
                disabled={isCompleted}
              >
                {isCompleted ? 'Completed' : (offer.type === 'sell' ? 'Buy' : 'Sell')}
              </Button>
            </div>
          );
        })}
        {offers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No trades available at the moment
          </div>
        )}
      </div>
    </div>
  );
};