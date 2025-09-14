// frontend/src/components/StatCards.jsx
import React from 'react';
import CountUp from 'react-countup';
import './StatCard.css';

function StatCards({ title, value, icon, trend, format = 'number' }) {
  const getCountUpProps = () => {
    const baseProps = {
      end: value || 0,
      duration: 2,
      enableScrollSpy: true,
      scrollSpyOnce: true,
      separator: ','
    };

    switch (format) {
      case 'currency':
        return {
          ...baseProps,
          prefix: '$',
          decimals: 2
        };
      case 'percentage':
        return {
          ...baseProps,
          suffix: '%',
          decimals: 1
        };
      case 'decimal':
        return {
          ...baseProps,
          decimals: 2
        };
      default:
        return baseProps;
    }
  };

  return (
    <div className="stats-card">
      <div className="stats-card-header">
        <div className="stats-card-icon">{icon}</div>
        <div className="stats-card-trend">{trend}</div>
      </div>
      <div className="stats-card-content">
        <h3 className="stats-card-title">{title}</h3>
        <p className="stats-card-value">
          <CountUp {...getCountUpProps()} />
        </p>
      </div>
    </div>
  );
}

export default StatCards;