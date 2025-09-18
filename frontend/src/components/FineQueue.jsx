import React from "react";

const FineQueue = () => {
  const fines = [
    { name: "Dante Gulapa", days: "3 days", amount: "15 php" },
    { name: "Marvin August ten", days: "3 days", amount: "15 php" },
    { name: "Anna De Armas", days: "1 day", amount: "5 php" },
    { name: "Agnes Lusartan", days: "5 days", amount: "20 php" },
  ];

  return (
    <div className="bg-teal-700 text-white shadow-lg w-full h-61 flex flex-col" style={{
        boxShadow: "8px 8px 20px rgba(0,0,0,0.4)", // 3D shadow on right & bottom
      }}>
      {/* Header */}
      <div className="p-4 border-b border-white">
        <h2 className="text-2xl font-sans">Fine Queue</h2>
      </div>

      {/* Fine List */}
      <div className="p-4 space-y-4 overflow-y-auto">
        {fines.map((fine, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-sm border-l-2 border-white pl-4"
          >
            {/* Name */}
            <span>{fine.name}</span>

            {/* Badges */}
            <div className="flex gap-2">
              <span className="bg-white text-teal-700 rounded-full px-4 py-1 text-xs font-medium min-w-[70px] text-center">
                {fine.days}
              </span>
              <span className="bg-white text-teal-700 rounded-full px-4 py-1 text-xs font-medium min-w-[70px] text-center">
                {fine.amount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FineQueue;
