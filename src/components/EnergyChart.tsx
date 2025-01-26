import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface EnergyData {
  time: string;
  generated: number;
  consumed: number;
}

interface EnergyChartProps {
  data: EnergyData[];
}

export const EnergyChart = ({ data }: EnergyChartProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Energy Overview</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [`${value.toFixed(2)} kWh`]}
            />
            <Area
              type="monotone"
              dataKey="generated"
              stackId="1"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.3}
              name="Generated"
            />
            <Area
              type="monotone"
              dataKey="consumed"
              stackId="2"
              stroke="#0ea5e9"
              fill="#0ea5e9"
              fillOpacity={0.3}
              name="Consumed"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};