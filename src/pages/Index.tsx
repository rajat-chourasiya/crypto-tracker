
import React from 'react';
import Header from '../components/Header';
import CryptoTracker from '../components/CryptoTracker';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-crypto-bg text-white">
      <Header />
      <main className="container mx-auto px-4 pb-12">
        <CryptoTracker />
      </main>
    </div>
  );
};

export default Index;
