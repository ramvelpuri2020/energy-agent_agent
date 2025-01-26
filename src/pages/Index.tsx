import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-16">
          <h1 className="text-3xl font-bold text-green-600">EnergySwap</h1>
          <div className="space-x-4">
            <Button onClick={() => navigate('/signin')} variant="outline">
              Sign In
            </Button>
            <Button onClick={() => navigate('/signin?signup=true')}>
              Sign Up
            </Button>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8">
            <h2 className="text-5xl font-bold text-gray-900 leading-tight">
              Trade Energy with Your Community
            </h2>
            <p className="text-xl text-gray-600">
              Join our platform to buy and sell renewable energy directly with your neighbors. 
              Save money while supporting sustainable energy practices.
            </p>
            <div className="space-x-4">
              <Button onClick={() => navigate('/signin')} size="lg" className="bg-green-600 hover:bg-green-700">
                Get Started
              </Button>
              <Button onClick={() => navigate('/signin')} variant="outline" size="lg">
                Browse Marketplace
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="/lovable-uploads/72bd786a-bfc3-4447-8c91-c9d547591953.png"
              alt="Energy Trading Concept"
              className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold mb-4 text-green-600">Trade Locally</h3>
            <p className="text-gray-600">Connect with energy producers and consumers in your neighborhood.</p>
          </div>
          <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">AI-Powered</h3>
            <p className="text-gray-600">Get smart recommendations for buying and selling energy.</p>
          </div>
          <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold mb-4 text-purple-600">Save Money</h3>
            <p className="text-gray-600">Reduce your energy costs through peer-to-peer trading.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;