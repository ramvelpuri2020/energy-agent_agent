import { TradeOffer } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { MapPin } from 'lucide-react';

interface TradePanelProps {
  offers: TradeOffer[];
}

export const TradePanel = ({ offers }: TradePanelProps) => {
  const { toast } = useToast();
  const [completedTrades, setCompletedTrades] = useState<string[]>([]);

  const handleTrade = (offer: TradeOffer) => {
    if (completedTrades.includes(offer.id)) {
      toast({
        title: "Trade Already Completed",
        description: "This trade has already been processed.",
        variant: "destructive"
      });
      return;
    }

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
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`inline-block px-2 py-1 rounded text-sm ${
                  offer.type === 'sell' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {offer.type.toUpperCase()}
                </span>
                {offer.location && (
                  <span className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {offer.location}
                  </span>
                )}
              </div>
              <p>{offer.amount.toFixed(2)} kWh at ${offer.price.toFixed(2)}/kWh</p>
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
  );
};