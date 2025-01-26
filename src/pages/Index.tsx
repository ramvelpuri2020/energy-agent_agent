import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-16 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Energy Swap</h1>
      <p className="text-xl text-gray-600 mb-8">
        Connect with neighbors, trade energy, and make sustainable choices together.
      </p>
      <div className="space-x-4">
        <Button onClick={() => navigate('/marketplace')} size="lg">
          Browse Marketplace
        </Button>
        <Button onClick={() => navigate('/dashboard')} variant="outline" size="lg">
          View Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Index;