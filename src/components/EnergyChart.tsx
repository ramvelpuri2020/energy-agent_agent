import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { EnergyData } from '@/lib/mockData';

interface EnergyChartProps {
  data: EnergyData[];
}

export const EnergyChart = ({ data }: EnergyChartProps) => {
  return (
    <div className="w-full h-[300px] bg-white rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Energy Overview</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="generated" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="consumed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(value) => new Date(value).toLocaleTimeString()} 
            interval={4}
          />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip 
            labelFormatter={(value) => new Date(value).toLocaleString()}
            formatter={(value, name) => [`${value.toFixed(2)} kWh`, name]}
          />
          <Area 
            type="monotone" 
            dataKey="generated" 
            stroke="#22c55e" 
            fillOpacity={1} 
            fill="url(#generated)" 
          />
          <Area 
            type="monotone" 
            dataKey="consumed" 
            stroke="#0ea5e9" 
            fillOpacity={1} 
            fill="url(#consumed)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};