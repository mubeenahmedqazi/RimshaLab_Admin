"use client";

import { useEffect, useState } from "react";
import { getDashboardStats, getChartStats } from "../../../lib/api-server";
import Chart from "./Chart";

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    getDashboardStats().then(setStats);
    getChartStats().then(setChartData);
  }, []);

  if (!stats || !chartData) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-indigo-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Metric title="Total Bookings" value={stats.totalBookings} />
        <Metric title="Unread Messages" value={stats.unreadMessages} />
        <Metric title="New Patients" value={stats.newPatients} />
        <Metric title="Health Card Requests" value={stats.healthCardRequests} />
        <Metric title="Approved Cards" value={stats.healthCardApproved} />
      </div>

      <div className="mt-12 bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">
          Analytics Overview
        </h2>
        <Chart data={chartData} />
      </div>
    </div>
  );
}

function Metric({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-lg font-semibold text-indigo-700">{title}</h2>
      <p className="mt-3 text-3xl font-bold">{value}</p>
    </div>
  );
}
