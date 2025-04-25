
import React from 'react';
import { Bitcoin } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-4 border-b border-gray-800 mb-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bitcoin className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-bold">Crypto Ticker Live</h1>
          </div>
          <div className="text-sm text-crypto-neutral">
            Simulated real-time data
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
