import React from 'react';

const ActivityGraph = () => {
  const activityData = [
    { day: 'Mon', value: 15 },
    { day: 'Tue', value: 12 },
    { day: 'Wed', value: 24 },
    { day: 'Thu', value: 18 },
    { day: 'Fri', value: 22 },
    { day: 'Sat', value: 16 },
    { day: 'Sun', value: 14 },
  ];

  const maxValue = Math.max(...activityData.map(item => item.value));

  return (
    <div className="bg-white rounded-3xl p-4 border-4 border-yellow-300">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold">24.9</h3>
            <p className="text-sm text-gray-500">7-days trend</p>
          </div>
          <span className="text-xs text-gray-500">Last 7 days</span>
        </div>

        {/* Graph */}
        <div className="h-32 flex items-end gap-2">
          {activityData.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-1">
              <div 
                className={`w-full rounded-full ${
                  index === 2 ? 'bg-purple-500' : 'bg-purple-200'
                }`}
                style={{
                  height: `${(item.value / maxValue) * 100}%`,
                }}
              />
              <span className="text-xs text-gray-500">{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityGraph; 