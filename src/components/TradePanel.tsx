import { TradeOffer } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface TradePanelProps {
  offers: TradeOffer[];
}

export const TradePanel = ({ offers }: TradePanelProps) => {
  const { toast } = useToast();

  const handleTrade = (offer: TradeOffer) => {
    toast({
      title: "Trade Initiated",
      description: `${offer.type === 'buy' ? 'Selling' : 'Buying'} ${offer.amount} kWh at $${offer.price}/kWh`,
    });
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Available Trades</h3>
      <div className="space-y-4">
        {offers.map((offer) => (
          <div 
            key={offer.id} 
            className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-50 transition-colors"
          >
            <div>
              <span className={`inline-block px-2 py-1 rounded text-sm ${
                offer.type === 'sell' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {offer.type.toUpperCase()}
              </span>
              <p className="mt-2">{offer.amount} kWh at ${offer.price}/kWh</p>
            </div>
            <Button
              onClick={() => handleTrade(offer)}
              variant="outline"
            >
              {offer.type === 'sell' ? 'Buy' : 'Sell'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};