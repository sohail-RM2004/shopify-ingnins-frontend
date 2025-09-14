// frontend/src/components/OrderCharts.jsx
import React from 'react';
import './OrderCharts.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine
} from 'recharts';

function OrderCharts({ data }) {
  // Calculate trend data
  const trendData = data?.map((item, index) => {
    const prevValue = index > 0 ? data[index - 1].orders : 0;
    const trend = prevValue > 0 ? ((item.orders - prevValue) / prevValue) * 100 : 0;
    return {
      ...item,
      trend: trend.toFixed(1)
    };
  }) || [];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <div className="tooltip-header">
            <span className="tooltip-label">{label}</span>
          </div>
          <div className="tooltip-content">
            <div className="tooltip-item">
              <span className="tooltip-dot" style={{ backgroundColor: '#667eea' }}></span>
              <span className="tooltip-label">Orders:</span>
              <span className="tooltip-value">{payload[0].value}</span>
            </div>
            {payload[0].payload.trend && (
              <div className="tooltip-item">
                <span className="tooltip-label">Trend:</span>
                <span className={`tooltip-trend ${payload[0].payload.trend > 0 ? 'positive' : 'negative'}`}>
                  {payload[0].payload.trend > 0 ? '+' : ''}{payload[0].payload.trend}%
                </span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="elegant-chart-container">
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart
          data={trendData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <defs>
            <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#667eea" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#667eea" stopOpacity={0.05}/>
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
            dataKey="orders"
            stroke="#667eea"
            strokeWidth={3}
            fill="url(#ordersGradient)"
            dot={{ fill: '#667eea', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#667eea', strokeWidth: 2, fill: '#fff' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OrderCharts;