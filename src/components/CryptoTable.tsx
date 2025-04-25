
import React from 'react';
import { useAppSelector } from '../store/hooks';
import { selectCryptoAssets } from '../store/cryptoSlice';
import CryptoSparkline from './CryptoSparkline';
import FormatNumber from './FormatNumber';
import { ArrowUp, ArrowDown } from 'lucide-react';

const CryptoTable: React.FC = () => {
  const assets = useAppSelector(selectCryptoAssets);

  return (
    <div className="w-full overflow-x-auto">
      <table className="crypto-table">
        <thead className="text-xs uppercase">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">1h %</th>
            <th scope="col">24h %</th>
            <th scope="col">7d %</th>
            <th scope="col">Market Cap</th>
            <th scope="col">Volume (24h)</th>
            <th scope="col">Supply</th>
            <th scope="col">Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, index) => {
            const priceClass = asset.priceChangeDirection === 'up' 
              ? 'animate-price-up' 
              : asset.priceChangeDirection === 'down' 
                ? 'animate-price-down' 
                : '';
                
            return (
              <tr key={asset.id} className={`${priceClass}`}>
                <td className="font-medium">{index + 1}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <img src={asset.logoUrl} alt={asset.name} className="w-6 h-6" />
                    <div>
                      <div className="font-medium">{asset.name}</div>
                      <div className="text-xs text-crypto-neutral">{asset.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="font-medium">
                  <div className="flex items-center gap-1">
                    <FormatNumber value={asset.currentPrice} precision={asset.currentPrice < 1 ? 4 : 2} />
                    {asset.priceChangeDirection === 'up' && (
                      <ArrowUp className="w-4 h-4 text-crypto-positive" />
                    )}
                    {asset.priceChangeDirection === 'down' && (
                      <ArrowDown className="w-4 h-4 text-crypto-negative" />
                    )}
                  </div>
                </td>
                <td className={`${asset.percentChange1h >= 0 ? 'change-positive' : 'change-negative'}`}>
                  <FormatNumber value={asset.percentChange1h} format="percent" />
                </td>
                <td className={`${asset.percentChange24h >= 0 ? 'change-positive' : 'change-negative'}`}>
                  <FormatNumber value={asset.percentChange24h} format="percent" />
                </td>
                <td className={`${asset.percentChange7d >= 0 ? 'change-positive' : 'change-negative'}`}>
                  <FormatNumber value={asset.percentChange7d} format="percent" />
                </td>
                <td>
                  <FormatNumber value={asset.marketCap} format="compact" />
                </td>
                <td>
                  <FormatNumber value={asset.volume24h} format="compact" />
                </td>
                <td>
                  <div className="flex flex-col">
                    <span><FormatNumber value={asset.circulatingSupply} format="compact" /></span>
                    {asset.maxSupply && (
                      <span className="text-xs text-crypto-neutral">
                        Max: <FormatNumber value={asset.maxSupply} format="compact" />
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <CryptoSparkline data={asset.sparklineData} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
