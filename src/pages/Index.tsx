import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <header className="flex justify-between items-center mb-16">
          <h1 className="text-2xl font-bold text-green-600">EnergySwap</h1>
          <Button onClick={() => navigate('/signin')} variant="outline">
            Sign In
          </Button>
        </header>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">
              Trade Energy with Your Community
            </h2>
            <p className="text-xl text-gray-600">
              Join our platform to buy and sell renewable energy directly with your neighbors. Save money while supporting sustainable energy practices.
            </p>
            <div className="space-x-4">
              <Button onClick={() => navigate('/signin')} size="lg">
                Get Started
              </Button>
              <Button onClick={() => navigate('/marketplace')} variant="outline" size="lg">
                Browse Marketplace
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b"
              alt="Energy Trading Concept"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Trade Locally</h3>
            <p className="text-gray-600">Connect with energy producers and consumers in your neighborhood.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">AI-Powered</h3>
            <p className="text-gray-600">Get smart recommendations for buying and selling energy.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Save Money</h3>
            <p className="text-gray-600">Reduce your energy costs through peer-to-peer trading.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;