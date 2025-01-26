import { TradePanel } from './TradePanel';
import { mockTradeOffers } from '@/lib/mockData';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState } from 'react';
import { useToast } from './ui/use-toast';

export const Marketplace = () => {
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const { toast } = useToast();

  const handleCreateListing = () => {
    if (!amount || !price) {
      toast({
        title: "Missing Information",
        description: "Please fill in both amount and price fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Listing Created",
      description: `Listed ${amount} kWh at $${price}/kWh`,
    });

    setAmount('');
    setPrice('');
  };

  return (
    <div className="container mx-auto py-8 animate-fade-in">
      <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
        <h2 className="text-2xl font-bold mb-6">Create New Listing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Amount (kWh)</label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Price per kWh ($)</label>
            <Input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleCreateListing}>
            Create Listing
          </Button>
        </div>
      </div>

      <TradePanel offers={mockTradeOffers} />
    </div>
  );
};