
import { CryptoAsset } from '../store/cryptoSlice';

// Initial data for 5 crypto assets
export const initialCryptoData: CryptoAsset[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    logoUrl: 'src/assets/bitcoin-btc-logo.svg',
    currentPrice: 67830.14,
    previousPrice: null,
    priceChangeDirection: null,
    percentChange1h: 0.32,
    percentChange24h: 1.87,
    percentChange7d: -2.43,
    marketCap: 1328451236782,
    volume24h: 42356789012,
    circulatingSupply: 19576187,
    maxSupply: 21000000,
    sparklineData: [65420, 66280, 65890, 66740, 67100, 66950, 67830],
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    logoUrl: 'src/assets/ethereum-eth-logo.svg',
    currentPrice: 3468.29,
    previousPrice: null,
    priceChangeDirection: null,
    percentChange1h: -0.12,
    percentChange24h: 2.45,
    percentChange7d: 5.21,
    marketCap: 421983461234,
    volume24h: 18765432198,
    circulatingSupply: 120345678,
    maxSupply: null,
    sparklineData: [3240, 3310, 3290, 3380, 3420, 3390, 3468],
  },
  {
    id: 'tether',
    name: 'Tether',
    symbol: 'USDT',
    logoUrl: 'src/assets/tether-usdt-logo.svg',
    currentPrice: 1.00,
    previousPrice: null,
    priceChangeDirection: null,
    percentChange1h: 0.01,
    percentChange24h: 0.03,
    percentChange7d: -0.02,
    marketCap: 94567891234,
    volume24h: 65432198765,
    circulatingSupply: 94567891234,
    maxSupply: null,
    sparklineData: [1.001, 0.999, 1.002, 0.998, 1.001, 0.999, 1.000],
  },
  {
    id: 'binance-coin',
    name: 'Binance Coin',
    symbol: 'BNB',
    logoUrl: 'src/assets/bnb-bnb-logo.svg',
    currentPrice: 604.32,
    previousPrice: null,
    priceChangeDirection: null,
    percentChange1h: 0.78,
    percentChange24h: -1.24,
    percentChange7d: 3.72,
    marketCap: 92345678901,
    volume24h: 2468135790,
    circulatingSupply: 153026210,
    maxSupply: 183026210,
    sparklineData: [590, 598, 592, 605, 600, 596, 604],
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    logoUrl: 'src/assets/solana-sol-logo.svg',
    currentPrice: 147.63,
    previousPrice: null,
    priceChangeDirection: null,
    percentChange1h: -0.45,
    percentChange24h: -2.36,
    percentChange7d: 8.91,
    marketCap: 67891234567,
    volume24h: 5432167890,
    circulatingSupply: 460123456,
    maxSupply: null,
    sparklineData: [142, 146, 144, 148, 152, 150, 147],
  }
];

// Function to generate random price changes
function generateRandomPriceChange(currentPrice: number): number {
  const changePercent = (Math.random() * 0.8 - 0.4) / 100; // -0.4% to +0.4%
  return parseFloat((currentPrice * (1 + changePercent)).toFixed(2));
}

// Function to generate random volume changes
function generateRandomVolumeChange(currentVolume: number): number {
  const changePercent = (Math.random() * 2 - 1) / 100; // -1% to +1%
  return Math.round(currentVolume * (1 + changePercent));
}

// Function to generate random percent changes
function generateRandomPercentChange(currentPercent: number): number {
  const change = (Math.random() * 0.4 - 0.2); // -0.2 to +0.2
  return parseFloat((currentPercent + change).toFixed(2));
}

// Simulate WebSocket updates for a single asset
export function generateAssetUpdate(asset: CryptoAsset): Partial<CryptoAsset> & { id: string } {
  const newPrice = generateRandomPriceChange(asset.currentPrice);
  
  return {
    id: asset.id,
    currentPrice: newPrice,
    percentChange1h: generateRandomPercentChange(asset.percentChange1h),
    percentChange24h: generateRandomPercentChange(asset.percentChange24h),
    percentChange7d: generateRandomPercentChange(asset.percentChange7d),
    volume24h: generateRandomVolumeChange(asset.volume24h),
  };
}

// Simulate batch updates for all assets
export function generateBatchUpdates(assets: CryptoAsset[]): (Partial<CryptoAsset> & { id: string })[] {
  return assets.map(asset => generateAssetUpdate(asset));
}

// Mock WebSocket class
export class MockCryptoWebSocket {
  private intervalId: number | null = null;
  private assets: CryptoAsset[] = [];
  private updateCallback: ((updates: (Partial<CryptoAsset> & { id: string })[]) => void) | null = null;

  constructor(initialAssets: CryptoAsset[]) {
    this.assets = [...initialAssets];
  }

  connect(callback: (updates: (Partial<CryptoAsset> & { id: string })[]) => void): void {
    this.updateCallback = callback;
    // Simulate WebSocket connection with updates every 1.5 seconds
    this.intervalId = window.setInterval(() => {
      if (this.updateCallback) {
        const updates = generateBatchUpdates(this.assets);
        
        // Update local state
        updates.forEach(update => {
          const assetIndex = this.assets.findIndex(a => a.id === update.id);
          if (assetIndex !== -1 && update.currentPrice) {
            this.assets[assetIndex] = {
              ...this.assets[assetIndex],
              currentPrice: update.currentPrice,
              percentChange1h: update.percentChange1h || this.assets[assetIndex].percentChange1h,
              percentChange24h: update.percentChange24h || this.assets[assetIndex].percentChange24h,
              percentChange7d: update.percentChange7d || this.assets[assetIndex].percentChange7d,
              volume24h: update.volume24h || this.assets[assetIndex].volume24h,
            };
          }
        });
        
        // Send updates to callback
        this.updateCallback(updates);
      }
    }, 1500);
  }

  disconnect(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.updateCallback = null;
  }
}
