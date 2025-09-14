// frontend/src/components/AdvancedInsights.jsx
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

function AdvancedInsights({ data }) {
  const {
    customerAcquisition = [],
    orderTrends = [],
    productPerformance = [],
    seasonalData = []
  } = data;

  return (
    <div className="advanced-insights">
      <div className="insights-grid">
        {/* Customer Acquisition Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Customer Acquisition</h3>
            <div className="chart-subtitle">New customers over time</div>
          </div>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={customerAcquisition}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#718096" fontSize={12} />
                <YAxis stroke="#718096" fontSize={12} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="newCustomers" 
                  stroke="#667eea" 
                  strokeWidth={3}
                  dot={{ fill: '#667eea', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Size Distribution */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Order Size Distribution</h3>
            <div className="chart-subtitle">Orders by value range</div>
          </div>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={orderTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="range" stroke="#718096" fontSize={12} />
                <YAxis stroke="#718096" fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" fill="#764ba2" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Seasonal Performance */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Seasonal Performance</h3>
            <div className="chart-subtitle">Revenue by month</div>
          </div>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={seasonalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#718096" fontSize={12} />
                <YAxis stroke="#718096" fontSize={12} />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#f093fb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvancedInsights;