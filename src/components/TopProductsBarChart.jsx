// frontend/src/components/TopProductsBarChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './TopProductsBarChart.css';

function TopProductsBarChart({ data }) {
  // If no data, show placeholder
  if (!data || data.length === 0) {
    return (
      <div className="chart-placeholder">
        <div className="placeholder-icon">��</div>
        <p>No product data available</p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <div className="tooltip-header">
            <span className="tooltip-label">{label}</span>
          </div>
          <div className="tooltip-content">
            <div className="tooltip-item">
              <span className="tooltip-label">Revenue:</span>
              <span className="tooltip-value">${payload[0].value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="elegant-chart-container">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            angle={-45}
            textAnchor="end"
            height={80}
            fontSize={12}
            stroke="#666"
          />
          <YAxis 
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            fontSize={12}
            stroke="#666"
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="revenue" 
            fill="#667eea"
            radius={[4, 4, 0, 0]}
            stroke="#667eea"
            strokeWidth={1}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TopProductsBarChart;