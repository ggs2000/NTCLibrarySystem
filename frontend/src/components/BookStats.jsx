import React from "react";
import dashboardBookIcon1 from "../assets/dashboardbookicon1.png"; // adjust path if needed
import dashboardBookIcon2 from "../assets/dashboardbookicon2.png"; // adjust path if needed
import dashboardBookIcon3 from "../assets/dashboardbookicon3.png"; // adjust path if needed

const BookStats = () => {
  const stats = [
    {
      title: "Added Books",
      value: "295 New Books Added in Library",
      icon: dashboardBookIcon1,
    },
    {
      title: "Available Books",
      value: "502 Available Books in Library",
      icon: dashboardBookIcon2,
    },
    {
      title: "Borrowed Books",
      value: "14 Borrowed Books in Library",
      icon: dashboardBookIcon3,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="relative h-48 flex items-center pl-5 overflow-hidden"
          style={{
            backgroundImage: `url(${stat.icon})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay (optional for readability) */}
          <div className="absolute inset-0" />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between h-full p-6 text-white">
            <h2 className="text-lg font-semibold">{stat.title}</h2>
            <p className="text-sm">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookStats;
