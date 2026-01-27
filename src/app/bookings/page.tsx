"use client";

import { useEffect, useState } from "react";
import { getBookings, markBookingAsCompleted } from "../../../lib/api-server";

export default function Bookings() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    getBookings().then((data) => {
      if (data.success) setBookings(data.bookings);
    });
  }, []);

  const handleMarkComplete = async (id: string) => {
    const res = await markBookingAsCompleted(id);
    if (res.success) {
      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: "completed" } : b
        )
      );
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-indigo-900 mb-8">
        Bookings ({bookings.length})
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-lg">
        {bookings.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No bookings found</p>
        ) : (
          <table className="w-full">
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.name}</td>
                  <td>{b.testName}</td>
                  <td>{b.status}</td>
                  {b.status !== "completed" && (
                    <td>
                      <button onClick={() => handleMarkComplete(b._id)}>
                        ✅
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
