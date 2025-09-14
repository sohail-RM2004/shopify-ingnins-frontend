// frontend/src/components/CustomerAcquisitionChart.jsx
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import './OrderCharts.css'; // Reuse the same CSS

function CustomerAcquisitionChart({ data }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <div className="tooltip-header">
            <span className="tooltip-label">{label}</span>
          </div>
          <div className="tooltip-content">
            <div className="tooltip-item">
              <span className="tooltip-dot" style={{ backgroundColor: '#764ba2' }}></span>
              <span className="tooltip-label">New Customers:</span>
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
        <div className="placeholder-icon">��</div>
        <p>No customer acquisition data available</p>
      </div>
    );
  }

  return (
    <div className="elegant-chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <defs>
            <linearGradient id="acquisitionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#764ba2" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#764ba2" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#e2e8f0" 
            strokeOpacity={0.6}
          />
          <XAxis 
            dataKey="date" 
            stroke="#718096"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#718096' }}
          />
          <YAxis 
            allowDecimals={false}
            stroke="#718096"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#718096' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="newCustomers"
            stroke="#764ba2"
            strokeWidth={3}
            fill="url(#acquisitionGradient)"
            dot={{ fill: '#764ba2', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#764ba2', strokeWidth: 2, fill: '#fff' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomerAcquisitionChart;