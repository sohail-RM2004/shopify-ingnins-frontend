// frontend/src/components/AnimatedNumber.jsx
import React, { useState, useEffect, useRef } from 'react';

function AnimatedNumber({ 
  value, 
  duration = 2000, 
  decimals = 0, 
  prefix = '', 
  suffix = '',
  className = ''
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (value === null || value === undefined || isNaN(value)) {
      setDisplayValue(0);
      return;
    }

    const startValue = displayValue;
    const endValue = parseFloat(value);
    const startTime = Date.now();
    startTimeRef.current = startTime;
    setIsAnimating(true);

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * easeOut;

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
        setIsAnimating(false);
      }
    };

    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration]);

  const formatValue = (val) => {
    if (decimals > 0) {
      return val.toFixed(decimals);
    }
    return Math.round(val).toLocaleString();
  };

  return (
    <span className={`animated-number ${className} ${isAnimating ? 'animating' : ''}`}>
      {prefix}{formatValue(displayValue)}{suffix}
    </span>
  );
}

export default AnimatedNumber;