
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setAssets, updateMultipleAssets, selectCryptoLastUpdated } from '../store/cryptoSlice';
import { initialCryptoData, MockCryptoWebSocket } from '../services/cryptoService';
import CryptoTable from './CryptoTable';
import CryptoTableMobile from './CryptoTableMobile';
import { useIsMobile } from '../hooks/use-mobile';

const CryptoTracker: React.FC = () => {
  const dispatch = useAppDispatch();
  const lastUpdated = useAppSelector(selectCryptoLastUpdated);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Initialize with mock data
    dispatch(setAssets(initialCryptoData));
    
    // Create mock WebSocket for real-time updates
    const mockSocket = new MockCryptoWebSocket(initialCryptoData);
    
    // Connect and handle updates
    mockSocket.connect((updates) => {
      dispatch(updateMultipleAssets(updates));
    });
    
    // Cleanup on unmount
    return () => {
      mockSocket.disconnect();
    };
  }, [dispatch]);
  
  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Live Crypto Prices</h2>
        <div className="text-sm text-crypto-neutral">
          {lastUpdated ? (
            <>Last updated: {new Date(lastUpdated).toLocaleTimeString()}</>
          ) : (
            <>Loading data...</>
          )}
        </div>
      </div>

      {/* Show appropriate table based on screen size */}
      <div className="hidden md:block">
        <CryptoTable />
      </div>
      <div className="block md:hidden">
        <CryptoTableMobile />
      </div>
    </div>
  );
};

export default CryptoTracker;
