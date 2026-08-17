import { useEffect, useState } from 'react';
import './ProgressRing.css';

export default function ProgressRing({
  radius = 40,
  stroke = 8,
  progress = 0,
  color = '#1F5C4A',
  children,
}) {
  const [offset, setOffset] = useState(0);
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  useEffect(() => {
    const progressOffset = circumference - (progress / 100) * circumference;
    // Small delay to trigger animation
    const timeout = setTimeout(() => setOffset(progressOffset), 100);
    return () => clearTimeout(timeout);
  }, [progress, circumference]);

  // Initial state is full offset (empty circle)
  const initialOffset = circumference;

  return (
    <div className="progress-ring" style={{ width: radius * 2, height: radius * 2 }}>
      <svg
        height={radius * 2}
        width={radius * 2}
        className="progress-ring-svg"
      >
        <circle
          className="progress-ring-circle-bg"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          className="progress-ring-circle-progress"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset: offset || initialOffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      {children && (
        <div className="progress-ring-content" style={{ width: radius * 2, height: radius * 2 }}>
          {children}
        </div>
      )}
    </div>
  );
}
