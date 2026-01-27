"use client";

import { useState, useEffect } from "react";
import { getHealthCardRequests, approveHealthCardRequest } from "../../../../lib/api-server";

interface HealthCard {
  _id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  cnic: string;
  gender?: string;
  bloodGroup?: string;
  status: string;
  createdAt: string;
}

export default function NewHealthCardRequests() {
  const [requests, setRequests] = useState<HealthCard[]>([]);
  const [loadingIds, setLoadingIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHealthCardRequests();

        if (data.success && Array.isArray(data.healthCards)) {
          const newRequests = data.healthCards.filter(
            (card: HealthCard) => card.status === "new"
          );

          setRequests(newRequests);
        } else {
          console.error("Invalid health card response:", data);
        }
      } catch (err) {
        console.error("Error fetching health card requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      setLoadingIds((prev) => [...prev, id]);
      const res = await approveHealthCardRequest(id);

      setLoadingIds((prev) => prev.filter((x) => x !== id));

      if (res.success) {
        setRequests((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status: "approved" } : r))
        );
      } else {
        alert(res.message || "Failed to approve health card request");
      }
    } catch (err) {
      setLoadingIds((prev) => prev.filter((x) => x !== id));
      console.error("Error approving health card:", err);
    }
  };

  if (loading) return <p className="text-center py-8 text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-4xl font-bold text-indigo-900 mb-8">
        New Health Card Requests ({requests.length})
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-lg overflow-x-auto">
        {requests.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No new requests found</p>
        ) : (
          <table className="min-w-[1200px] w-full table-auto">
            <thead>
              <tr className="text-left border-b text-indigo-800">
                <th className="py-3 px-2">Name</th>
                <th className="py-3 px-2">Email</th>
                <th className="py-3 px-2">CNIC</th>
                <th className="py-3 px-2">Address</th>
                <th className="py-3 px-2">Phone</th>
                <th className="py-3 px-2">Gender</th>
                <th className="py-3 px-2">Blood Group</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => {
                const isLoading = loadingIds.includes(req._id);
                return (
                  <tr key={req._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2">{req.name}</td>
                    <td className="py-3 px-2">{req.email}</td>
                    <td className="py-3 px-2">{req.cnic}</td>
                    <td className="py-3 px-2">{req.address}</td>
                    <td className="py-3 px-2">{req.phone}</td>
                    <td className="py-3 px-2">{req.gender || "-"}</td>
                    <td className="py-3 px-2">{req.bloodGroup || "-"}</td>
                    <td className="py-3 px-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          req.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {req.status === "approved" ? "Approved" : req.status}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      {req.status !== "approved" && (
                        <button
                          onClick={() => handleApprove(req._id)}
                          disabled={isLoading}
                          className={`px-3 py-1 rounded-lg text-white ${
                            isLoading
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700"
                          }`}
                        >
                          {isLoading ? "Approving..." : "Approve"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
