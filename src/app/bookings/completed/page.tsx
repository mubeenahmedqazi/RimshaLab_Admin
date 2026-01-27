"use client";

import { useState, useEffect } from "react";
import { getBookings } from "../../../../lib/api-server";

interface Booking {
  _id: string;
  name: string;
  testName: string;
  phone: string;
  email: string;
  createdAt: string;
  status: string;
}

export default function CompletedBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    getBookings().then((data) => {
      if (data.success) {
        const filtered = data.bookings.filter((b: Booking) => b.status === "completed");
        setBookings(filtered);
      }
    });
  }, []);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString();

  return (
    <div>
      <h1 className="text-4xl font-bold text-indigo-900 mb-8">
        Completed Bookings ({bookings.length})
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-lg">
        {bookings.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No completed bookings</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left border-b text-indigo-800">
                <th className="py-3">Name</th>
                <th className="py-3">Test</th>
                <th className="py-3">Phone</th>
                <th className="py-3">Email</th>
                <th className="py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{booking.name}</td>
                  <td className="py-3">{booking.testName}</td>
                  <td className="py-3">{booking.phone}</td>
                  <td className="py-3">{booking.email}</td>
                  <td className="py-3">{formatDate(booking.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
