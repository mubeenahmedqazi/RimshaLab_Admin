"use client";

import { useState } from "react";
import { getapprovedHealthCardRequests, verifyHealthCardRequest } from "../../../../lib/api-server";

interface HealthCard {
  _id: string;
  name: string;
  email: string;
  phone: string;
  cnic?: string | number;
  status: string;
}

export default function VerifyHealthCardsPortal() {
  const [cnic, setCnic] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifiedData, setVerifiedData] = useState<HealthCard | null>(null);

  const normalizeCnic = (cnic?: string | number) =>
    String(cnic ?? "")
      .replace(/\D/g, "")
      .trim();

  const formatCnic = (cnic?: string | number) => {
    if (!cnic) return "";
    const n = normalizeCnic(cnic).padEnd(13, "0");
    return `${n.slice(0, 5)}-${n.slice(5, 12)}-${n.slice(12)}`;
  };

  const handleVerify = async () => {
    const numericCnic = normalizeCnic(cnic);

    if (numericCnic.length !== 13)
      return alert("Please enter a valid 13-digit CNIC");

    setLoading(true);

    try {
      // fetch approved cards only
      const res = await getapprovedHealthCardRequests();
      if (!res.success) return alert("Failed to fetch data");

      const card = res.healthCards.find(
        (c: HealthCard) => normalizeCnic(c.cnic) === numericCnic
      );

      if (!card) {
        setVerifiedData(null);
        return alert("CNIC not found in APPROVED list");
      }

      await verifyHealthCardRequest(card._id);
      setVerifiedData(card);
    } catch (error) {
      console.error(error);
      alert("Error verifying CNIC");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Health Card Verification</h1>

      <input
        type="text"
        placeholder="Enter CNIC (13 digits)"
        value={cnic}
        onChange={(e) => setCnic(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <button
        onClick={handleVerify}
        disabled={loading}
        className={`w-full py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {loading ? "Verifying..." : "Verify"}
      </button>

      {verifiedData && (
        <div className="mt-6 p-4 border rounded bg-green-50 text-green-800">
          <p><strong>Name:</strong> {verifiedData.name}</p>
          <p><strong>Email:</strong> {verifiedData.email}</p>
          <p><strong>Phone:</strong> {verifiedData.phone}</p>
          <p><strong>CNIC:</strong> {formatCnic(verifiedData.cnic)}</p>
          <p><strong>Status:</strong> {verifiedData.status}</p>
        </div>
      )}
    </div>
  );
}
