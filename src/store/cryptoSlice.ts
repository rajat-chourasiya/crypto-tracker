
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

export interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  logoUrl: string;
  currentPrice: number;
  previousPrice: number | null;
  priceChangeDirection: 'up' | 'down' | null;
  percentChange1h: number;
  percentChange24h: number;
  percentChange7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  sparklineData: number[];
}

interface CryptoState {
  assets: CryptoAsset[];
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

const initialState: CryptoState = {
  assets: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setAssets: (state, action: PayloadAction<CryptoAsset[]>) => {
      state.assets = action.payload;
      state.lastUpdated = Date.now();
      state.loading = false;
      state.error = null;
    },
    updateAsset: (state, action: PayloadAction<Partial<CryptoAsset> & { id: string }>) => {
      const index = state.assets.findIndex((asset) => asset.id === action.payload.id);
      if (index !== -1) {
        const currentAsset = state.assets[index];

        // Store previous price and calculate direction if price changed
        if (action.payload.currentPrice !== undefined && 
            action.payload.currentPrice !== currentAsset.currentPrice) {
          action.payload.previousPrice = currentAsset.currentPrice;
          action.payload.priceChangeDirection = 
            action.payload.currentPrice > currentAsset.currentPrice ? 'up' : 'down';
        }

        state.assets[index] = { 
          ...currentAsset, 
          ...action.payload,
        };
        
        state.lastUpdated = Date.now();
      }
    },
    updateMultipleAssets: (state, action: PayloadAction<(Partial<CryptoAsset> & { id: string })[]>) => {
      action.payload.forEach(update => {
        const index = state.assets.findIndex(asset => asset.id === update.id);
        if (index !== -1) {
          const currentAsset = state.assets[index];
          
          // Store previous price and calculate direction if price changed
          if (update.currentPrice !== undefined && 
              update.currentPrice !== currentAsset.currentPrice) {
            update.previousPrice = currentAsset.currentPrice;
            update.priceChangeDirection = 
              update.currentPrice > currentAsset.currentPrice ? 'up' : 'down';
          }
          
          state.assets[index] = { ...currentAsset, ...update };
        }
      });
      
      if (action.payload.length > 0) {
        state.lastUpdated = Date.now();
      }
    },
  },
});

export const { setLoading, setError, setAssets, updateAsset, updateMultipleAssets } = cryptoSlice.actions;

// Selectors
export const selectCryptoAssets = (state: RootState) => state.crypto.assets;
export const selectCryptoLoading = (state: RootState) => state.crypto.loading;
export const selectCryptoError = (state: RootState) => state.crypto.error;
export const selectCryptoLastUpdated = (state: RootState) => state.crypto.lastUpdated;
export const selectCryptoAssetById = (id: string) => (state: RootState) => 
  state.crypto.assets.find(asset => asset.id === id);

export default cryptoSlice.reducer;
