"use client";

import { useState, useEffect } from "react";
import { getContactMessages } from "../../../../lib/api-server";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  status: string;
  createdAt: string;
  readAt?: string;
}

export default function ReadMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    async function fetchMessages() {
      const data = await getContactMessages();
      if (data.success) {
        setMessages(data.messages.filter((msg: ContactMessage) => msg.status === "read"));
      }
    }
    fetchMessages();
  }, []);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString();

  return (
    <div>
      <h1 className="text-4xl font-bold text-indigo-900 mb-8">
        Read Messages ({messages.length})
      </h1>

      <div className="space-y-6">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No read messages</p>
        ) : (
          messages.map((message) => (
            <div
              key={message._id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition border-l-4 border-green-500 opacity-75"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-indigo-700">{message.name}</h3>
                <div className="text-right">
                  <span className="text-sm text-gray-500 block">
                    Received: {formatDate(message.createdAt)}
                  </span>
                  {message.readAt && (
                    <span className="text-sm text-green-600 block">
                      Read: {formatDate(message.readAt)}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-800 font-medium mb-2">{message.subject}</p>
              <p className="text-gray-600 mb-3">{message.message}</p>

              <div className="flex gap-4 text-sm text-gray-500">
                {message.phone && <span>📞 {message.phone}</span>}
                <span>✉️ {message.email}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
