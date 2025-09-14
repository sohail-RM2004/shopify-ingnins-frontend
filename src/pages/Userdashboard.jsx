// frontend/src/pages/Userdashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import StatCards from '../components/StatCards';
import OrderCharts from '../components/OrderCharts';
import CustomerPieChart from '../components/CustomerPieChart';
import RevenueRegionChart from '../components/RevenueRegionChart';
import CustomerAcquisitionChart from '../components/CustomerAcquisitionChart';
import OrderDistributionChart from '../components/OrderDistributionChart';
import TopProductsBarChart from '../components/TopProductsBarChart';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './Userdashboard.css';

const get30DaysAgo = () => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date;
};

function Userdashboard() {
  // --- EXISTING STATE ---
  const [stats, setStats] = useState(null);
  const [topCustomers, setTopCustomers] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(get30DaysAgo());
  const [endDate, setEndDate] = useState(new Date());

  // --- NEW STATE FOR NEW INSIGHTS ---
  const [customerSegments, setCustomerSegments] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [revenueByRegion, setRevenueByRegion] = useState([]);
  const [abandonedCarts, setAbandonedCarts] = useState(null);
  
  // --- NEW STATE FOR ADDITIONAL INSIGHTS ---
  const [customerAcquisition, setCustomerAcquisition] = useState([]);
  const [orderDistribution, setOrderDistribution] = useState([]);

  // --- NEW STATE FOR UI ---
  const [userProfile, setUserProfile] = useState(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!startDate || !endDate) return;
    const fetchData = async () => {
      setLoading(true);
      const formattedStartDate = startDate.toISOString().split('T')[0];
      const formattedEndDate = endDate.toISOString().split('T')[0];
      
      try {
        const [
          statsRes, customersRes, ordersRes, 
          topProductsRes, revenueRegionRes, abandonedCartsRes,
          customerAcquisitionRes, orderDistributionRes, customerSegmentsRes
        ] = await Promise.all([
          api.get(`/insights/stats?startDate=${formattedStartDate}&endDate=${formattedEndDate}`),
          api.get('/insights/top-customers'),
          api.get(`/insights/orders-over-time?startDate=${formattedStartDate}&endDate=${formattedEndDate}`),
          api.get('/insights/top-products'),
          api.get('/insights/revenue-by-region'),
          api.get('/insights/abandoned-carts'),
          api.get(`/insights/customer-acquisition?startDate=${formattedStartDate}&endDate=${formattedEndDate}`),
          api.get('/insights/order-distribution'),
          api.get('/insights/customer-segments'),
        ]);

        // SET EXISTING STATE
        setStats(statsRes.data);
        setTopCustomers(customersRes.data);
        setOrdersData(ordersRes.data);
        // SET NEW STATE
        setTopProducts(topProductsRes.data);
        setCustomerSegments(customerSegmentsRes.data);
        setRevenueByRegion(revenueRegionRes.data);
        setAbandonedCarts(abandonedCartsRes.data);
        
        // SET ADDITIONAL INSIGHTS
        setCustomerAcquisition(customerAcquisitionRes.data);
        setOrderDistribution(orderDistributionRes.data);

        // Set user info from token and stored profile
const token = localStorage.getItem('token');
const storedProfile = localStorage.getItem('userProfile');

if (token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    setUserInfo({ 
      email: payload.email || 'User',
      tenantId: payload.tenantId 
    });
    
    // Use stored profile if available
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile));
    }
  } catch (e) {
    console.error('Error parsing token:', e);
  }
}

      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
        if (error.response && error.response.status === 401) {
          handleLogout();
        }
      } finally { setLoading(false); }
    };
    fetchData();
  }, [startDate, endDate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  // --- JSX with modern design ---
  return (
    <div className="dashboard-container">
      {/* Modern Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="brand-title">Argos BI</h1>
        </div>

        <div className="navbar-actions">
          {/* Date Filter */}
          <div className="date-filter-container">
            <DatePicker 
              selected={startDate} 
              onChange={(date) => setStartDate(date)}
              className="date-picker"
              placeholderText="Start Date"
            />
            <span className="date-separator">to</span>
            <DatePicker 
              selected={endDate} 
              onChange={(date) => setEndDate(date)}
              className="date-picker"
              placeholderText="End Date"
            />
          </div>

          {/* User Dropdown */}
          <div className="user-dropdown">
            <button className="user-button" onClick={toggleUserDropdown}>
              <div className="user-avatar">
                {userInfo?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="user-name">{userInfo?.email || 'User'}</span>
              <svg className={`dropdown-arrow ${userDropdownOpen ? 'open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {userDropdownOpen && (
  <div className="user-dropdown-menu">
    <div className="user-info">
      <div className="user-email">{userProfile?.email || userInfo?.email || 'user@example.com'}</div>
      <div className="user-shop">{userProfile?.shopUrl || 'No shop connected'}</div>
      <div className="user-tenant">Tenant ID: {userProfile?.tenantId || userInfo?.tenantId || 'N/A'}</div>
    </div>
    <div className="dropdown-divider"></div>
    <button className="dropdown-item" onClick={handleLogout}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Logout
    </button>
  </div>
)}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading dashboard data...</p>
          </div>
        ) : !stats ? (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h3>Could not load dashboard data</h3>
            <p>Please check your connection and try again.</p>
          </div>
        ) : (
          <>
            {/* Stats Cards Grid */}
            <section className="stats-section">
              <div className="section-header">
                <h2>Key Metrics</h2>
                <p>Overview of your store performance</p>
              </div>
<div className="stats-grid">
  <StatCards
    title="Total Customers"
    value={stats?.totalCustomers || 0}
    icon="👥"
    trend="+12%"
    format="number"
  />
  <StatCards
    title="Total Orders"
    value={stats?.totalOrders || 0}
    icon="📦"
    trend="+8%"
    format="number"
  />
  <StatCards
    title="Total Revenue"
    value={stats?.totalRevenue || 0}
    icon="💰"
    trend="+15%"
    format="currency"
  />
  <StatCards
    title="Average Order Value"
    value={stats?.avgOrderValue || 0}
    icon="💰"
    trend="+5%"
    format="currency"
  />
  <StatCards
    title="Customer Lifetime Value"
    value={stats?.customerLifetimeValue || 0}
    icon="💎"
    trend="+10%"
    format="currency"
  />
  <StatCards
    title="Repeat Customer Rate"
    value={stats?.repeatCustomerRate || 0}
    icon="🔄"
    trend="+3%"
    format="percentage"
  />
</div>
            </section>

            {/* Charts Section */}
            <section className="charts-section">
              <div className="charts-grid">
                <div className="chart-card">
                  <div className="chart-header">
                    <h3>Orders Over Time</h3>
                    <div className="chart-actions">
                      <button className="chart-action-btn">📊</button>
                      <button className="chart-action-btn">📈</button>
                    </div>
                  </div>
                  <div className="chart-content">
                    <OrderCharts data={ordersData} />
                  </div>
                </div>

                <div className="chart-card">
                  <div className="chart-header">
                    <h3>Top Customers</h3>
                    <div className="chart-actions">
                      <button className="chart-action-btn">👑</button>
                    </div>
                  </div>
                  <div className="chart-content">
                    <div className="customers-table">
                      <div className="table-header">
                        <span>Customer</span>
                        <span>Total Spent</span>
                      </div>
                      {topCustomers.map((customer, index) => (
                        <div key={customer.id} className="customer-row">
                          <div className="customer-info">
                            <div className="customer-avatar">
                              {customer.firstName?.charAt(0) || 'C'}
                            </div>
                            <div className="customer-details">
                              <div className="customer-name">
                                {customer.firstName} {customer.lastName}
                              </div>
                              <div className="customer-email">{customer.email}</div>
                            </div>
                          </div>
                          <div className="customer-spent">
                            ${customer.totalSpent.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Product Performance Section - Side by Side */}
            <section className="product-performance-section">
              <div className="section-header">
                <h2>Product Performance</h2>
                <p>Comprehensive analysis of your top products</p>
              </div>
              <div className="products-grid">
                <div className="chart-card products-table-card">
                  <div className="chart-header">
                    <h3>Top Products by Revenue</h3>
                    <div className="chart-subtitle">Detailed breakdown</div>
                  </div>
                  <div className="chart-content">
                    <div className="products-table">
                      {topProducts.map((product, index) => (
                        <div key={product.name} className="product-row">
                          <div className="product-rank">#{index + 1}</div>
                          <div className="product-info">
                            <div className="product-name">{product.name}</div>
                          </div>
                          <div className="product-revenue">
                            ${product.revenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="chart-card products-chart-card">
                  <div className="chart-header">
                    <h3>Revenue Visualization</h3>
                    <div className="chart-subtitle">Interactive bar chart</div>
                  </div>
                  <div className="chart-content">
                    <TopProductsBarChart data={topProducts} />
                  </div>
                </div>
              </div>
            </section>

            {/* Customer & Regional Insights */}
            <section className="customer-insights-section">
              <div className="section-header">
                <h2>Customer & Regional Insights</h2>
                <p>Understanding your customer base and geographic performance</p>
              </div>
              <div className="insights-grid">
                <div className="chart-card">
                  <div className="chart-header">
                    <h3>Customer Segments</h3>
                    <div className="chart-subtitle">Customer distribution by behavior</div>
                  </div>
                  <div className="chart-content">
                    <CustomerPieChart data={customerSegments} />
                  </div>
                </div>

                <div className="chart-card">
                  <div className="chart-header">
                    <h3>Revenue by Region</h3>
                    <div className="chart-subtitle">Geographic performance analysis</div>
                  </div>
                  <div className="chart-content">
                    <RevenueRegionChart data={revenueByRegion} />
                  </div>
                </div>
              </div>
            </section>

            {/* Advanced Analytics Section */}
            <section className="advanced-analytics-section">
              <div className="section-header">
                <h2>Advanced Analytics</h2>
                <p>Deep insights into customer behavior and order patterns</p>
              </div>
              <div className="analytics-grid">
                <div className="chart-card">
                  <div className="chart-header">
                    <h3>Customer Acquisition</h3>
                    <div className="chart-subtitle">New customers over time</div>
                  </div>
                  <div className="chart-content">
                    <CustomerAcquisitionChart data={customerAcquisition} />
                  </div>
                </div>

                <div className="chart-card">
                  <div className="chart-header">
                    <h3>Order Size Distribution</h3>
                    <div className="chart-subtitle">Orders by value range</div>
                  </div>
                  <div className="chart-content">
                    <OrderDistributionChart data={orderDistribution} />
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default Userdashboard;