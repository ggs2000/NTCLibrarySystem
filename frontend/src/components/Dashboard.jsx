import React from "react";
import BookStats from "./BookStats";
import Notifications from "./Notifications";
import TotalBooksReport from "./TotalBooksReport";
import Activity from "./Activity";
import FineQueue from "./FineQueue";

const Dashboard = () => {
  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-100">
      {/* Page Header */}
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-sans text-gray-800">
          Dashboard
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">Home / Overview</p>
      </header>

      {/* Book Stats Row */}
      <div className="mb-6">
        <BookStats />
      </div>

      {/* Section Label */}
      <div className="mb-3 pt-6 sm:pt-2">
        <h2 className="text-lg sm:text-xl font-sans text-gray-700">
          Reports & Updates
        </h2>
      </div>

      {/* Main Grid - Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Notifications />
        <TotalBooksReport />
        <Activity />
        <FineQueue />
      </div>
    </div>
  );
};

export default Dashboard;
