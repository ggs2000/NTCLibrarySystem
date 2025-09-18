import React from "react";

const Activity = () => {
  const activities = [
    "Jane De Lion Borrowed the Book",
    "Juan De La Cruz Returned the Book",
    "Jose Rizal Returned the Book",
    "Joseph Del Luna Borrowed the Book",
  ];

  return (
    <div className="bg-teal-700 text-white shadow-lg w-full h-61 flex flex-col" style={{
        boxShadow: "8px 8px 20px rgba(0,0,0,0.4)", // 3D shadow on right & bottom
      }}>
      {/* Header with underline */}
      <div className="p-4 border-b border-white">
        <h2 className="text-2xl font-sans">Activity</h2>
      </div>

      {/* Activity List */}
      <div className="p-4 overflow-y-auto">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="text-sm py-2 border-b border-white last:border-b-0"
          >
            {activity}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
