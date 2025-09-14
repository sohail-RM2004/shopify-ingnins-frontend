// frontend/src/components/CustomerPieChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];

function CustomerPieChart({ data }) {
  // If no data, show placeholder
  if (!data || data.length === 0) {
    return (
      <div className="chart-placeholder">
        <div className="placeholder-icon">📊</div>
        <p>No customer data available</p>
      </div>
    );
  }

  // Filter out invalid data and ensure all values are numbers
  const validData = data.filter(item => 
    item && 
    typeof item.value === 'number' && 
    !isNaN(item.value) && 
    item.value >= 0 &&
    item.name
  );

  // If no valid data after filtering, show placeholder
  if (validData.length === 0) {
    return (
      <div className="chart-placeholder">
        <div className="placeholder-icon">📊</div>
        <p>No valid customer data available</p>
      </div>
    );
  }

  // Calculate total for percentage calculations
  const total = validData.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      // Calculate percentage manually instead of relying on data.percent
      const percentage = total > 0 ? ((data.value / total) * 100).toFixed(1) : '0.0';
      
      return (
        <div className="custom-tooltip">
          <div className="tooltip-header">
            <span className="tooltip-label">{data.name}</span>
          </div>
          <div className="tooltip-content">
            <div className="tooltip-item">
              <span className="tooltip-dot" style={{ backgroundColor: data.color }}></span>
              <span className="tooltip-label">Count:</span>
              <span className="tooltip-value">{data.value}</span>
            </div>
            <div className="tooltip-item">
              <span className="tooltip-label">Percentage:</span>
              <span className="tooltip-value">
                {percentage}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    if (!payload || payload.length === 0) return null;
    
    return (
      <div className="custom-legend">
        {payload.map((entry, index) => {
          const percentage = entry.payload && entry.payload.value && total > 0 
            ? ((entry.payload.value / total) * 100).toFixed(1)
            : '0.0';
            
          return (
            <div key={`item-${index}`} className="legend-item">
              <div 
                className="legend-color" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="legend-label">{entry.value}</span>
              <span className="legend-value">
                {entry.payload.value} ({percentage}%)
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="elegant-chart-container">
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={validData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            stroke="#fff"
            strokeWidth={2}
          >
            {validData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomerPieChart;
