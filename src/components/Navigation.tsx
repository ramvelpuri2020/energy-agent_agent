import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const Navigation = () => {
  const location = useLocation();

  const tabs = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Marketplace', path: '/marketplace' },
  ];

  return (
    <div className="bg-white shadow-sm">
      <div className="container mx-auto">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={cn(
                'px-4 py-4 text-sm font-medium border-b-2 transition-colors',
                location.pathname === tab.path
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};