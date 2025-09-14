// frontend/src/components/OrderDistributionChart.jsx
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import './OrderCharts.css'; // Reuse the same CSS

const COLORS = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'];

function OrderDistributionChart({ data }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <div className="tooltip-header">
            <span className="tooltip-label">{label}</span>
          </div>
          <div className="tooltip-content">
            <div className="tooltip-item">
              <span className="tooltip-dot" style={{ backgroundColor: payload[0].fill }}></span>
              <span className="tooltip-label">Orders:</span>
              <span className="tooltip-value">{payload[0].value}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  if (!data || data.length === 0) {
    return (
      <div className="chart-placeholder">
        <div className="placeholder-icon">📊</div>
        <p>No order distribution data available</p>
      </div>
    );
  }

  return (
    <div className="elegant-chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <defs>
            <linearGradient id="distributionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#667eea" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#667eea" stopOpacity={0.3}/>
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#e2e8f0" 
            strokeOpacity={0.6}
          />
          <XAxis 
            dataKey="range" 
            stroke="#718096"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#718096' }}
          />
          <YAxis 
            stroke="#718096"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#718096' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="count" 
            fill="url(#distributionGradient)"
            radius={[4, 4, 0, 0]}
            stroke="#667eea"
            strokeWidth={1}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OrderDistributionChart;