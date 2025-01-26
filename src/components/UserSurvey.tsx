import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { submitReading } from '../services/energyService'; // Import the submitReading function

export const UserSurvey = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    averageConsumption: '',
    solarPanels: 'no',
    householdSize: '1-2',
    primaryUseTime: 'morning',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Create a reading object
      const reading = {
        timestamp: new Date(),
        production: parseFloat(formData.averageConsumption), // Example value
        consumption: parseFloat(formData.averageConsumption), // Example value
        battery_level: 10.0, // Example value
        weather_data: {
          temperature: 25, // Example value
          cloud_cover: 0.2, // Example value
          condition: 'clear', // Example value
        },
      };

      // Submit the reading
      await submitReading(reading);

      //store formData in local storage
      localStorage.setItem('userSurvey', JSON.stringify(formData));
      
      // Provide feedback to the user
      toast({
        title: "Survey Completed",
        description: "Welcome to EnergySwap! Your profile has been created.",
      });

      // Navigate to the dashboard
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit reading data",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 py-12">
      <div className="container max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Welcome to EnergySwap!</CardTitle>
            <p className="text-center text-gray-600">Please tell us a bit about yourself</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="consumption">Average Monthly Consumption (kWh)</Label>
                <Input
                  id="consumption"
                  type="number"
                  value={formData.averageConsumption}
                  onChange={(e) => setFormData({ ...formData, averageConsumption: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="solarPanels">Do you have solar panels?</Label>
                <Select
                  value={formData.solarPanels}
                  onValueChange={(value) => setFormData({ ...formData, solarPanels: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="planning">Planning to install</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="householdSize">Household Size</Label>
                <Select
                  value={formData.householdSize}
                  onValueChange={(value) => setFormData({ ...formData, householdSize: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2">1-2 people</SelectItem>
                    <SelectItem value="3-4">3-4 people</SelectItem>
                    <SelectItem value="5+">5+ people</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primaryUseTime">Primary Energy Use Time</Label>
                <Select
                  value={formData.primaryUseTime}
                  onValueChange={(value) => setFormData({ ...formData, primaryUseTime: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (6AM-12PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12PM-6PM)</SelectItem>
                    <SelectItem value="evening">Evening (6PM-12AM)</SelectItem>
                    <SelectItem value="night">Night (12AM-6AM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full">Complete Profile</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};