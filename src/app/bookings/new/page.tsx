"use client";

import { useEffect, useState } from "react";
import { getBookings, markBookingAsCompleted } from "../../../../lib/api-server";

export default function NewBookings() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    getBookings().then((data) => {
      if (data.success) {
        setBookings(
          data.bookings.filter((b: any) => b.status !== "completed")
        );
      }
    });
  }, []);

  const handleComplete = async (id: string) => {
    const res = await markBookingAsCompleted(id);
    if (res.success) {
      setBookings((prev) => prev.filter((b) => b._id !== id));
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-indigo-900 mb-8">
        New Bookings ({bookings.length})
      </h1>

      {bookings.map((b) => (
        <div key={b._id}>
          {b.name}
          <button onClick={() => handleComplete(b._id)}>
            Mark Completed
          </button>
        </div>
      ))}
    </div>
  );
}
