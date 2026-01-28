"use client";

import { useEffect, useState } from "react";
import { getBookings, markBookingAsCompleted } from "../../../lib/api-server";

interface Booking {
  _id: string;
  name: string;
  testName: string;
  phone: string;
  email: string;
  createdAt: string;
  status: string;
}

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const data = await getBookings();
    if (data.success) {
      // Sort: new bookings first, completed later
      const sorted = data.bookings.sort((a: Booking, b: Booking) => {
        if (a.status === "completed" && b.status !== "completed") return 1;
        if (a.status !== "completed" && b.status === "completed") return -1;
        return 0;
      });
      setBookings(sorted);
    }
  };

  const handleMarkComplete = async (id: string) => {
    const res = await markBookingAsCompleted(id);
    if (res.success) {
      // Update status locally and re-sort
      const updated = bookings.map((b) =>
        b._id === id ? { ...b, status: "completed" } : b
      );
      const sorted = updated.sort((a, b) => {
        if (a.status === "completed" && b.status !== "completed") return 1;
        if (a.status !== "completed" && b.status === "completed") return -1;
        return 0;
      });
      setBookings(sorted);
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString();

  return (
    <div>
      <h1 className="text-4xl font-bold text-indigo-900 mb-8">
        All Bookings ({bookings.length})
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-lg">
        {bookings.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No bookings found</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left border-b text-indigo-800">
                <th className="py-3">Name</th>
                <th className="py-3">Test</th>
                <th className="py-3">Phone</th>
                <th className="py-3">Email</th>
                <th className="py-3">Date</th>
                <th className="py-3">Status</th>
                <th className="py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{b.name}</td>
                  <td className="py-3">{b.testName}</td>
                  <td className="py-3">{b.phone}</td>
                  <td className="py-3">{b.email}</td>
                  <td className="py-3">{formatDate(b.createdAt)}</td>
                  <td className="py-3">{b.status}</td>
                  <td className="py-3">
                    {b.status !== "completed" && (
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        onClick={() => handleMarkComplete(b._id)}
                      >
                        Mark Completed
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
