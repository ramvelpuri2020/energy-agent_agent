import { TradePanel } from './TradePanel';
import { mockTradeOffers } from '@/lib/mockData';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState } from 'react';
import { useToast } from './ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Search } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';


export const Marketplace = () => {
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const { publicKey, sendTransaction } = useWallet();

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
    setLocation('');
  };

  const filteredOffers = mockTradeOffers.filter(offer => 
    offer.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    offer.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBuyEnergy = async () => {
    if (!publicKey) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to proceed.",
        variant: "destructive"
      });
      return;
    }

    try {
      const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey('RECEIVER_PUBLIC_KEY'), // Replace with the seller's public key
          lamports: parseInt(amount) * LAMPORTS_PER_SOL, // Convert SOL to lamports
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');

      toast({
        title: "Transaction Successful",
        description: `You have purchased ${amount} kWh of energy.`,
      });

      setAmount('');
      setPrice('');
    } catch (error) {
      console.error('Transaction failed:', error);
      toast({
        title: "Transaction Failed",
        description: "There was an error processing your transaction.",
        variant: "destructive"
      });
    }
  };


  return (
    <div className="container mx-auto py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Energy Marketplace</h1>
      
      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="browse">Browse Listings</TabsTrigger>
          <TabsTrigger value="create">Create Listing</TabsTrigger>
        </TabsList>

        <TabsContent value="browse">
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Search by location or type (buy/sell)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <TradePanel offers={filteredOffers} />
          </div>
        </TabsContent>

        <TabsContent value="create">
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <h2 className="text-2xl font-bold mb-6">Create New Listing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input
                  type="text"
                  placeholder="Enter your location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleCreateListing}>
                Create Listing
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};