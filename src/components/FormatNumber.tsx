
import React from 'react';

interface FormatNumberProps {
  value: number;
  format?: 'currency' | 'compact' | 'percent';
  currency?: string;
  precision?: number;
}

const FormatNumber: React.FC<FormatNumberProps> = ({ 
  value, 
  format = 'currency', 
  currency = 'USD',
  precision = 2
}) => {
  if (value === undefined || value === null) return null;

  try {
    if (format === 'currency') {
      return (
        <span>
          {new Intl.NumberFormat('en-US', { 
            style: 'currency', 
            currency, 
            minimumFractionDigits: precision,
            maximumFractionDigits: precision
          }).format(value)}
        </span>
      );
    }
    
    if (format === 'compact') {
      return (
        <span>
          {new Intl.NumberFormat('en-US', { 
            notation: 'compact',
            compactDisplay: 'short',
            minimumFractionDigits: 0,
            maximumFractionDigits: 1
          }).format(value)}
        </span>
      );
    }
    
    if (format === 'percent') {
      return (
        <span>
          {value > 0 ? '+' : ''}
          {new Intl.NumberFormat('en-US', { 
            style: 'percent', 
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            signDisplay: 'exceptZero'
          }).format(value / 100)}
        </span>
      );
    }

    // Default fallback
    return <span>{value.toFixed(precision)}</span>;
  } catch (e) {
    console.error('Error formatting number:', e);
    return <span>{value}</span>;
  }
};

export default FormatNumber;
