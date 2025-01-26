import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-16">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            EnergySwap
          </h1>
          <div className="space-x-4">
            <Button 
              onClick={() => navigate('/signin')} 
              variant="outline"
              className="hover:bg-green-50"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => navigate('/signin?signup=true')}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:opacity-90"
            >
              Sign Up
            </Button>
          </div>
        </header>

        <div className="max-w-4xl mx-auto text-center space-y-12 py-16 animate-fade-in">
          <div className="space-y-6">
            <h2 className="text-6xl font-bold text-gray-900 leading-tight">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Trade Energy
              </span>
              <br />
              with Your Community
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our innovative platform to buy and sell renewable energy directly with your neighbors.
              Save money while supporting sustainable energy practices.
            </p>
          </div>

          <div className="flex justify-center gap-6">
            <Button 
              onClick={() => navigate('/signin')} 
              size="lg" 
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:opacity-90 text-lg px-8 py-6 h-auto"
            >
              Get Started
            </Button>
            <Button 
              onClick={() => navigate('/signin')} 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6 h-auto hover:bg-green-50"
            >
              Browse Marketplace
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-24">
            <div className="p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-12 w-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg mb-6 mx-auto flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Trade Locally
              </h3>
              <p className="text-gray-600">
                Connect with energy producers and consumers in your neighborhood for efficient energy sharing.
              </p>
            </div>
            <div className="p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mb-6 mx-auto flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                AI-Powered
              </h3>
              <p className="text-gray-600">
                Get intelligent recommendations for optimal energy trading based on your usage patterns.
              </p>
            </div>
            <div className="p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-12 w-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg mb-6 mx-auto flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Save Money
              </h3>
              <p className="text-gray-600">
                Reduce your energy costs while contributing to a sustainable future.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;