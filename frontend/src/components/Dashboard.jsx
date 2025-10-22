import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { apiService } from '../services/api';
import { BarChart3, PieChart, TrendingUp, Clock } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await apiService.getDashboardData();
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Failed to load dashboard data</p>
      </div>
    );
  }

  const { overview, schemesByCategory, popularIntents, budgetByRegion } = dashboardData;

  // Chart configurations
  const categoryChartData = {
    labels: schemesByCategory.map(item => item._id.replace('_', ' ')),
    datasets: [{
      label: 'Number of Schemes',
      data: schemesByCategory.map(item => item.count),
      backgroundColor: [
        '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16'
      ]
    }]
  };

  const budgetChartData = {
    labels: budgetByRegion.slice(0, 5).map(item => item._id),
    datasets: [{
      label: 'Budget Allocation (₹ Crores)',
      data: budgetByRegion.slice(0, 5).map(item => item.totalBudget / 10000000),
      backgroundColor: '#3B82F6'
    }]
  };

  const intentChartData = {
    labels: popularIntents.map(item => item._id.replace('_', ' ')),
    datasets: [{
      data: popularIntents.map(item => item.count),
      backgroundColor: [
        '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'
      ]
    }]
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Schemes</p>
              <p className="text-2xl font-bold">{overview.totalSchemes}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Queries</p>
              <p className="text-2xl font-bold">{overview.totalQueries}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Avg Response Time</p>
              <p className="text-2xl font-bold">{Math.round(overview.avgResponseTime)}ms</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <PieChart className="w-8 h-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold">₹{(overview.totalBudget / 10000000000).toFixed(1)}K Cr</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Schemes by Category</h3>
          <Bar 
            data={categoryChartData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false }
              }
            }}
          />
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Popular Query Intents</h3>
          <Doughnut 
            data={intentChartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'bottom' }
              }
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Budget Allocation by Region</h3>
          <Bar 
            data={budgetChartData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false }
              }
            }}
          />
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Recent Queries</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {dashboardData.recentQueries.map((query, index) => (
              <div key={index} className="border-l-4 border-primary-500 pl-3 py-2">
                <p className="text-sm font-medium">{query.user_query}</p>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Intent: {query.intent}</span>
                  <span>{query.response_time}ms</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;