export interface EnergyData {
  timestamp: string;
  generated: number;
  consumed: number;
}

export interface TradeOffer {
  id: string;
  userId: string;
  amount: number;
  price: number;
  type: 'buy' | 'sell';
}

export const generateMockEnergyData = (): EnergyData[] => {
  const data: EnergyData[] = [];
  const now = new Date();
  
  for (let i = 0; i < 24; i++) {
    const timestamp = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
    data.push({
      timestamp: timestamp.toISOString(),
      generated: Math.random() * 10 + 5,
      consumed: Math.random() * 8 + 3,
    });
  }
  
  return data;
};

export const mockTradeOffers: TradeOffer[] = [
  { id: '1', userId: 'user1', amount: 5.0, price: 0.12, type: 'sell' },
  { id: '2', userId: 'user2', amount: 3.0, price: 0.11, type: 'buy' },
  { id: '3', userId: 'user3', amount: 2.0, price: 0.13, type: 'sell' },
  { id: '4', userId: 'user4', amount: 4.0, price: 0.10, type: 'buy' },
];