
import React from 'react';

interface CryptoSparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  lineWidth?: number;
}

const CryptoSparkline: React.FC<CryptoSparklineProps> = ({
  data,
  width = 100,
  height = 40,
  color = '#9b87f5',
  lineWidth = 1.5
}) => {
  // Early return if no data
  if (!data || data.length === 0) return null;

  // Calculate values for drawing
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1; // Avoid division by zero
  
  // Create points for the polyline
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    // Invert Y to make higher values go up
    const y = height - ((value - min) / range) * height;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(' ');

  // Determine if trend is up or down for color
  const isUp = data[data.length - 1] >= data[0];
  const sparklineColor = isUp ? '#4ADE80' : '#F43F5E';

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline
        fill="none"
        stroke={color || sparklineColor}
        strokeWidth={lineWidth}
        points={points}
      />
    </svg>
  );
};

export default CryptoSparkline;
