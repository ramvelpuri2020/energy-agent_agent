import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

export const AIRecommendations = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Lightbulb className="w-8 h-8 text-yellow-500" />
        <CardTitle>AI Recommendations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
          <p className="text-sm text-yellow-800">
            Based on your usage patterns, you might need an additional 3 kWh tomorrow between 2 PM and 5 PM.
            Consider purchasing now while prices are lower.
          </p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg border border-green-100">
          <p className="text-sm text-green-800">
            Your solar panels are performing 15% better than last week. 
            You could sell your excess energy during peak hours (1 PM - 4 PM).
          </p>
        </div>
      </CardContent>
    </Card>
  );
};