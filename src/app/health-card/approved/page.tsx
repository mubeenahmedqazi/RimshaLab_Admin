"use client";

import { useState, useEffect } from "react";
import { getapprovedHealthCardRequests } from "../../../../lib/api-server";

interface HealthCard {
  _id: string;
  name: string;
  email: string;
  phone: string;
  cnic?: string | number; // CNIC can be string or number
  status: string;
}

export default function ApprovedHealthCards() {
  const [approvedCards, setApprovedCards] = useState<HealthCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Format CNIC safely
  const formatCnic = (cnic?: string | number) => {
    if (!cnic) return "";
    const str = String(cnic).replace(/\D/g, "").padEnd(13, "0");
    return `${str.slice(0, 5)}-${str.slice(5, 12)}-${str.slice(12)}`;
  };

  useEffect(() => {
    const fetchApprovedCards = async () => {
      try {
        const data = await getapprovedHealthCardRequests();
        if (data.success && Array.isArray(data.healthCards)) {
          const approved = data.healthCards.filter(
            (card: HealthCard) => card.status === "approved" || card.status === "verified"
          );
          setApprovedCards(approved);
        }
      } catch (error) {
        console.error("Error fetching approved health cards:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApprovedCards();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500">Loading approved health cards...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-indigo-900 mb-8">
        Approved Health Cards ({approvedCards.length})
      </h1>
      <div className="bg-white p-6 rounded-2xl shadow-lg overflow-x-auto">
        {approvedCards.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No approved health cards found</p>
        ) : (
          <table className="min-w-[900px] w-full table-auto">
            <thead>
              <tr className="text-left border-b text-indigo-800">
                <th className="py-3 px-2">Name</th>
                <th className="py-3 px-2">Phone</th>
                <th className="py-3 px-2">Email</th>
                <th className="py-3 px-2">CNIC</th>
                <th className="py-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {approvedCards.map((card) => (
                <tr key={card._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2">{card.name}</td>
                  <td className="py-3 px-2">{card.phone}</td>
                  <td className="py-3 px-2">{card.email}</td>
                  <td className="py-3 px-2">{formatCnic(card.cnic)}</td>
                  <td className="py-3 px-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        card.status === "verified"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {card.status}
                    </span>
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
