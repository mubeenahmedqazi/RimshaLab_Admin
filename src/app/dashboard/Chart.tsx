"use client";

import { PieChart, Pie, Cell, Tooltip as PieTooltip, Legend as PieLegend } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip, Legend as BarLegend, ResponsiveContainer } from "recharts";

interface ChartProps {
  data: {
    name: string;
    bookings: number;
    patients: number;
    healthCards: number;
  }[];
}

const COLORS = ["#6366f1", "#22c55e", "#f59e0b"];

export default function Chart({ data }: ChartProps) {
  if (!data || data.length === 0)
    return <p className="text-center py-10">No data available</p>;

  // For Pie Chart, sum total values
  const totalBookings = data.reduce((acc, curr) => acc + curr.bookings, 0);
  const totalPatients = data.reduce((acc, curr) => acc + curr.patients, 0);
  const totalHealthCards = data.reduce((acc, curr) => acc + curr.healthCards, 0);

  const pieData = [
    { name: "Bookings", value: totalBookings },
    { name: "Patients", value: totalPatients },
    { name: "Health Cards", value: totalHealthCards },
  ];

  return (
    <div className="w-full flex flex-col gap-10">

      {/* ===== PIE CHART ===== */}
      <div className="bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-indigo-800 mb-4 text-center">Overview (Pie Chart)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <PieTooltip />
            <PieLegend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ===== BAR CHART ===== */}
      <div className="bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-indigo-800 mb-4 text-center">Weekly Analytics (Bar Chart)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="bookings" fill="#6366f1" />
            <Bar dataKey="patients" fill="#22c55e" />
            <Bar dataKey="healthCards" fill="#f59e0b" />
            <BarTooltip />
            <BarLegend />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
