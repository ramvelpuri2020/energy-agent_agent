export interface EnergyData {
  time: string;
  generated: number;
  consumed: number;
}

export interface TradeOffer {
  id: string;
  userId: string;
  amount: number;
  price: number;
  type: 'buyer' | 'seller';
  sellerPublicKey: string; // Public key of the seller
  location?: string;
}

export const generateMockEnergyData = (): EnergyData[] => {
  const data: EnergyData[] = [];
  const now = new Date();
  
  for (let i = 0; i < 24; i++) {
    const timestamp = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
    data.push({
      time: timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      generated: Math.random() * 10 + 5,
      consumed: Math.random() * 8 + 3,
    });
  }
  
  return data;
};

export const mockTradeOffers: TradeOffer[] = [
  {
    id: '1',
    amount: 1.0,
    price: 0.012,
    type: 'seller',
    sellerPublicKey: 'BG8fEjZzWo95B7fvAFjxwfAXpG8naifUkigT5nv8Vg8e', // Example public key
    location: 'San Francisco, CA',
    userId: ""
  },
  {
    id: '2',
    amount: 2.0,
    price: 0.011,
    type: 'buyer',
    sellerPublicKey: 'BG8fEjZzWo95B7fvAFjxwfAXpG8naifUkigT5nv8Vg8e', // Example public key
    location: 'Oakland, CA',
    userId: ""
  },
  {
    id: '3',
    amount: 2.0,
    price: 0.013,
    type: 'seller',
    sellerPublicKey: 'BG8fEjZzWo95B7fvAFjxwfAXpG8naifUkigT5nv8Vg8e', // Example public key
    location: 'Berkeley, CA',
    userId: ""
  },
  {
    id: '4',
    amount: 1.0,
    price: 0.010,
    type: 'buyer',
    sellerPublicKey: 'BG8fEjZzWo95B7fvAFjxwfAXpG8naifUkigT5nv8Vg8e', // Example public key
    location: 'San Jose, CA',
    userId: ""
  },
];