import React, { useState, useEffect } from 'react';
import { BarChart2 } from 'lucide-react';

const StatusDashboard = () => {
  const [statusData, setStatusData] = useState([]);

  useEffect(() => {
    // Fetch status data from an API or database
    const fetchData = async () => {
      try {
        const response = await fetch('/api/status');
        const data = await response.json();
        setStatusData(data);
      } catch (error) {
        console.error('Error fetching status data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="main-heading">Status Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statusData.map((status, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold">{status.name}</h2>
            <p>Status: {status.isOnline ? 'Online' : 'Offline'}</p>
            <p>Response Time: {status.responseTime}ms</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusDashboard; 