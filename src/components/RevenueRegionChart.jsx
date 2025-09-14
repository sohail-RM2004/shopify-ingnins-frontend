// frontend/src/components/RevenueRegionChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function RevenueRegionChart({ data }) {
  // FIX: Create a shallow copy using the spread operator (...) before sorting.
  const sortedData = [...(data || [])].sort((a, b) => b.revenue - a.revenue);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <div className="tooltip-header">
            <span className="tooltip-label">{label}</span>
          </div>
          <div className="tooltip-content">
            <div className="tooltip-item">
              <span className="tooltip-dot" style={{ backgroundColor: '#82ca9d' }}></span>
              <span className="tooltip-label">Revenue:</span>
              <span className="tooltip-value">${payload[0].value.toLocaleString()}</span>
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
          data={sortedData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
        >
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.3}/>
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#e2e8f0" 
            strokeOpacity={0.6}
          />
          <XAxis 
            type="number" 
            stroke="#718096"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#718096' }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <YAxis 
            dataKey="name" 
            type="category" 
            stroke="#718096"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#718096' }}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="revenue" 
            fill="url(#revenueGradient)"
            radius={[0, 4, 4, 0]}
            stroke="#82ca9d"
            strokeWidth={1}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueRegionChart;