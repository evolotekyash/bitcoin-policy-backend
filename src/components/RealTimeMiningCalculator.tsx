import { useState, useEffect } from 'react';
import { Calculator, RefreshCw, TrendingUp, AlertCircle } from 'lucide-react';
import axios from 'axios';

interface BitcoinPriceData {
  bitcoin: {
    inr: number;
  };
}

interface CalculatorState {
  mwInput: number;
  mwInputString: string;
  btcPrice: number;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

const RealTimeMiningCalculator = () => {
  const [state, setState] = useState<CalculatorState>({
    mwInput: 1,
    mwInputString: '1',
    btcPrice: 0,
    isLoading: true,
    error: null,
    lastUpdated: null
  });

  // Bitcoin production calculation: approximately 10-12 BTC per MW per year
  const BTC_PER_MW_ANNUAL = 11;

  const calculateBTC = (mw: number): number => {
    return Math.round(mw * BTC_PER_MW_ANNUAL);
  };

  const calculateValueINR = (btc: number, pricePerBTC: number): number => {
    return Math.round((btc * pricePerBTC) / 10000000); // Convert to crores
  };

  const fetchBitcoinPrice = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await axios.get<BitcoinPriceData>(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr',
        {
          timeout: 15000,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      );

      console.log('API Response:', response.data); // Debug log

      if (response.data && response.data.bitcoin && typeof response.data.bitcoin.inr === 'number') {
        setState(prev => ({
          ...prev,
          btcPrice: response.data.bitcoin.inr,
          isLoading: false,
          error: null,
          lastUpdated: new Date()
        }));
      } else {
        throw new Error('Invalid response format from CoinGecko API');
      }
    } catch (error) {
      console.error('Error fetching Bitcoin price:', error);
      
      // Try alternative approach with a proxy or different endpoint
      try {
        const fallbackResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr');
        const fallbackData = await fallbackResponse.json();
        
        if (fallbackData?.bitcoin?.inr) {
          setState(prev => ({
            ...prev,
            btcPrice: fallbackData.bitcoin.inr,
            isLoading: false,
            error: null,
            lastUpdated: new Date()
          }));
          return;
        }
      } catch (fallbackError) {
        console.error('Fallback fetch also failed:', fallbackError);
      }
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Unable to fetch live price. Please check your internet connection.',
        btcPrice: 0, // Don't use fallback price, show error instead
        lastUpdated: new Date()
      }));
    }
  };

  const formatINR = (amount: number): string => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)} crore`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} lakh`;
    } else {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
  };

  const formatTimestamp = (date: Date): string => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  useEffect(() => {
    fetchBitcoinPrice();
    
    // Refresh price every 10 seconds for more real-time updates
    const interval = setInterval(fetchBitcoinPrice, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const annualBTC = calculateBTC(state.mwInput);
  const annualValueINR = state.btcPrice > 0 ? calculateValueINR(annualBTC, state.btcPrice) : 0;

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Calculator className="h-8 w-8 text-orange-500" />
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 font-inter">
              Real-Time Mining Calculator
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${state.error ? 'bg-red-500' : state.isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
              <span className="text-xs text-gray-500">
                {state.error ? 'Offline' : state.isLoading ? 'Updating...' : 'Live'}
              </span>
            </div>
          </div>
        </div>
        
        <button
          onClick={fetchBitcoinPrice}
          disabled={state.isLoading}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`h-4 w-4 ${state.isLoading ? 'animate-spin' : ''}`} />
          <span className="text-sm font-medium">
            {state.isLoading ? 'Updating...' : 'Refresh Price'}
          </span>
        </button>
      </div>

      {/* Price Status */}
      <div className="bg-slate-50 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {state.error ? (
              <AlertCircle className="h-5 w-5 text-red-500" />
            ) : (
              <TrendingUp className="h-5 w-5 text-green-500" />
            )}
            <div>
              <p className="text-sm font-medium text-gray-700">Live Bitcoin Price</p>
              {state.error ? (
                <p className="text-lg font-bold text-red-600">
                  {state.error}
                </p>
              ) : (
                <p className="text-lg font-bold text-gray-900">
                  {state.isLoading ? 'Loading...' : 
                    state.btcPrice > 0 ? formatINR(state.btcPrice) : 'No data available'
                  }
                </p>
              )}
            </div>
          </div>
          
          <div className="text-right">
            {state.error && (
              <div className="flex items-center space-x-1 text-red-600 mb-1">
                <AlertCircle className="h-4 w-4" />
                <span className="text-xs">API Error</span>
              </div>
            )}
            {state.lastUpdated && (
              <p className="text-xs text-gray-500">
                Last attempt: {formatTimestamp(state.lastUpdated)}
              </p>
            )}
            <p className="text-xs text-green-600 mt-1">
              Updates every 10 seconds
            </p>
          </div>
        </div>
      </div>

      {/* Calculator */}
      <div className="grid md:grid-cols-3 gap-8 items-center">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Power Capacity (MW)
          </label>
          <input
            type="number"
            value={state.mwInputString}
            onChange={(e) => {
              const value = e.target.value;
              setState(prev => ({ 
                ...prev, 
                mwInputString: value,
                mwInput: value === '' ? 1 : Math.max(1, Number(value) || 1)
              }));
            }}
            onBlur={(e) => {
              const value = e.target.value;
              if (value === '' || Number(value) < 1) {
                setState(prev => ({ 
                  ...prev, 
                  mwInputString: '1',
                  mwInput: 1
                }));
              }
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
            min="1"
            max="100000"
            placeholder="Enter MW capacity"
          />
          <p className="text-xs text-gray-500 mt-1">
            Based on {BTC_PER_MW_ANNUAL} BTC/MW annually
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Annual Bitcoin Production</p>
          <p className="text-3xl font-bold text-orange-500 mb-1">
            {annualBTC.toLocaleString()} BTC
          </p>
          <p className="text-xs text-gray-500">
            {(annualBTC / 12).toFixed(1)} BTC/month
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Annual Value (Real-time)</p>
          {state.error || state.btcPrice === 0 ? (
            <div>
              <p className="text-2xl font-bold text-gray-400 mb-1">
                Price unavailable
              </p>
              <p className="text-xs text-red-500">
                Please check connection
              </p>
            </div>
          ) : (
            <div>
              <p className="text-3xl font-bold text-green-500 mb-1">
                {state.isLoading ? '...' : `₹${annualValueINR.toLocaleString()} crore`}
              </p>
              <p className="text-xs text-gray-500">
                At current BTC price
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-500">Monthly Revenue</p>
            <p className="text-lg font-semibold text-gray-700">
              ₹{Math.round(annualValueINR / 12).toLocaleString()} crore
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Daily Revenue</p>
            <p className="text-lg font-semibold text-gray-700">
              ₹{Math.round(annualValueINR / 365).toLocaleString()} lakh
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Energy Efficiency</p>
            <p className="text-lg font-semibold text-gray-700">
              {BTC_PER_MW_ANNUAL} BTC/MW
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">ROI Potential</p>
            <p className="text-lg font-semibold text-green-600">
              High
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMiningCalculator;
