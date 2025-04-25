
import React from 'react';
import { useAppSelector } from '../store/hooks';
import { selectCryptoAssets } from '../store/cryptoSlice';
import CryptoSparkline from './CryptoSparkline';
import FormatNumber from './FormatNumber';
import { ArrowUp, ArrowDown } from 'lucide-react';

const CryptoTableMobile: React.FC = () => {
  const assets = useAppSelector(selectCryptoAssets);

  return (
    <div className="w-full space-y-4">
      {assets.map((asset, index) => {
        const priceClass = asset.priceChangeDirection === 'up' 
          ? 'animate-price-up' 
          : asset.priceChangeDirection === 'down' 
            ? 'animate-price-down' 
            : '';
            
        return (
          <div 
            key={asset.id}
            className={`bg-crypto-row-alt p-4 rounded-lg ${priceClass}`}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="text-crypto-neutral">{index + 1}</span>
                <img src={asset.logoUrl} alt={asset.name} className="w-6 h-6" />
                <div>
                  <div className="font-medium">{asset.name}</div>
                  <div className="text-xs text-crypto-neutral">{asset.symbol}</div>
                </div>
              </div>
              <div className="flex items-center gap-1 font-medium">
                <FormatNumber value={asset.currentPrice} precision={asset.currentPrice < 1 ? 4 : 2} />
                {asset.priceChangeDirection === 'up' && (
                  <ArrowUp className="w-4 h-4 text-crypto-positive" />
                )}
                {asset.priceChangeDirection === 'down' && (
                  <ArrowDown className="w-4 h-4 text-crypto-negative" />
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3">
              <div>
                <div className="text-xs text-crypto-neutral">1h %</div>
                <div className={`${asset.percentChange1h >= 0 ? 'change-positive' : 'change-negative'}`}>
                  <FormatNumber value={asset.percentChange1h} format="percent" />
                </div>
              </div>
              <div>
                <div className="text-xs text-crypto-neutral">24h %</div>
                <div className={`${asset.percentChange24h >= 0 ? 'change-positive' : 'change-negative'}`}>
                  <FormatNumber value={asset.percentChange24h} format="percent" />
                </div>
              </div>
              <div>
                <div className="text-xs text-crypto-neutral">7d %</div>
                <div className={`${asset.percentChange7d >= 0 ? 'change-positive' : 'change-negative'}`}>
                  <FormatNumber value={asset.percentChange7d} format="percent" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-xs text-crypto-neutral">Market Cap</div>
                <div>
                  <FormatNumber value={asset.marketCap} format="compact" />
                </div>
              </div>
              <div>
                <div className="text-xs text-crypto-neutral">Volume (24h)</div>
                <div>
                  <FormatNumber value={asset.volume24h} format="compact" />
                </div>
              </div>
              <div>
                <div className="text-xs text-crypto-neutral">Circulating Supply</div>
                <div>
                  <FormatNumber value={asset.circulatingSupply} format="compact" />
                </div>
              </div>
              <div>
                <div className="text-xs text-crypto-neutral">Max Supply</div>
                <div>
                  {asset.maxSupply ? (
                    <FormatNumber value={asset.maxSupply} format="compact" />
                  ) : (
                    <span>∞</span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-3">
              <div className="text-xs text-crypto-neutral">Last 7 Days</div>
              <CryptoSparkline data={asset.sparklineData} width={280} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CryptoTableMobile;
