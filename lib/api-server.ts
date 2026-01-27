// api-server.ts
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://rimsha-lab-backend.vercel.app/api";

/** ----------------------------
 * BOOKINGS
 * ---------------------------- */

// Fetch all bookings
export async function getBookings() {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings`, { cache: "no-store" });
    return await res.json();
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return { success: false, bookings: [] };
  }
}

// Mark booking completed
export async function markBookingAsCompleted(bookingId: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings/${bookingId}/complete`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    console.error("Error marking booking as completed:", error);
    return { success: false };
  }
}

/** ----------------------------
 * CONTACT MESSAGES
 * ---------------------------- */

// Fetch all messages
export async function getContactMessages() {
  try {
    const res = await fetch(`${API_BASE_URL}/contact`, { cache: "no-store" });
    return await res.json();
  } catch (error) {
    console.error("Error fetching messages:", error);
    return { success: false, messages: [] };
  }
}

// Fetch unread
export async function getUnreadMessages() {
  try {
    const res = await fetch(`${API_BASE_URL}/contact?status=unread`, {
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    console.error("Error fetching unread messages:", error);
    return { success: false, messages: [] };
  }
}

// Fetch read
export async function getReadMessages() {
  try {
    const res = await fetch(`${API_BASE_URL}/contact?status=read`, {
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    console.error("Error fetching read messages:", error);
    return { success: false, messages: [] };
  }
}

// Mark message as read
export async function markMessageAsRead(messageId: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/contact/${messageId}/read`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    console.error("Error marking message as read:", error);
    return { success: false };
  }
}

/** ----------------------------
 * HEALTH CARD
 * ---------------------------- */

// Fetch only APPROVED cards (for verification)
export async function getapprovedHealthCardRequests() {
  try {
    const res = await fetch(`${API_BASE_URL}/health-card?status=approved`, {
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    console.error("Error fetching approved health card requests:", error);
    return { success: false, healthCards: [] };
  }
}

// Fetch only NEW cards
export async function getHealthCardRequests() {
  try {
    const res = await fetch(`${API_BASE_URL}/health-card?status=new`, {
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    console.error("Error fetching health card requests:", error);
    return { success: false, healthCards: [] };
  }
}

// Approve request
export async function approveHealthCardRequest(id: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/health-card/${id}/approve`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    console.error("Error approving health card:", error);
    return { success: false };
  }
}

// Verify request
export async function verifyHealthCardRequest(id: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/health-card/${id}/verify`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    console.error("Error verifying health card:", error);
    return { success: false };
  }
}

/** ----------------------------
 * DASHBOARD STATS
 * ---------------------------- */
export async function getDashboardStats() {
  try {
    const [bookingsRes, messagesRes, healthCardRes] = await Promise.all([
      fetch(`${API_BASE_URL}/bookings`, { cache: "no-store" }),
      fetch(`${API_BASE_URL}/contact`, { cache: "no-store" }),
      fetch(`${API_BASE_URL}/health-card`, { cache: "no-store" }),
    ]);

    const bookingsData = await bookingsRes.json();
    const messagesData = await messagesRes.json();
    const healthCardData = await healthCardRes.json();

    const unreadCount = messagesData.success
      ? messagesData.messages.filter((msg: any) => msg.status === "unread").length
      : 0;

    const totalHealthCards = healthCardData.success
      ? healthCardData.healthCards.length
      : 0;

    const approvedHealthCards = healthCardData.success
      ? healthCardData.healthCards.filter((card: any) => card.status === "approved").length
      : 0;

    return {
      totalBookings: bookingsData.success ? bookingsData.bookings.length : 0,
      unreadMessages: unreadCount,
      newPatients: bookingsData.success ? bookingsData.bookings.length : 0,
      healthCardRequests: totalHealthCards,
      healthCardApproved: approvedHealthCards,
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return {
      totalBookings: 0,
      unreadMessages: 0,
      newPatients: 0,
      healthCardRequests: 0,
      healthCardApproved: 0,
    };
  }
}

/** ----------------------------
 * CHART DATA (REAL WEEKLY DATA)
 * ---------------------------- */
export async function getChartStats() {
  try {
    const [bookingsRes, patientsRes, healthCardsRes] = await Promise.all([
      fetch(`${API_BASE_URL}/bookings`, { cache: "no-store" }),
      fetch(`${API_BASE_URL}/health-card`, { cache: "no-store" }),
      fetch(`${API_BASE_URL}/health-card`, { cache: "no-store" }),
    ]);

    const bookingsData = await bookingsRes.json();
    const patientsData = await patientsRes.json();
    const healthCardsData = await healthCardsRes.json();

    const groupByDay = (items: any[]) => {
      const map: Record<string, number> = {
        Mon: 0,
        Tue: 0,
        Wed: 0,
        Thu: 0,
        Fri: 0,
        Sat: 0,
        Sun: 0,
      };
      items.forEach((item) => {
        const day = new Date(item.createdAt).toLocaleDateString("en-US", {
          weekday: "short",
        });
        if (map[day] !== undefined) map[day]++;
      });
      return map;
    };

    const bookingsByDay = groupByDay(bookingsData.bookings || []);
    const patientsByDay = groupByDay(patientsData.healthCards || []);
    const healthCardsByDay = groupByDay(healthCardsData.healthCards || []);

    return Object.keys(bookingsByDay).map((day) => ({
      name: day,
      bookings: bookingsByDay[day] || 0,
      patients: patientsByDay[day] || 0,
      healthCards: healthCardsByDay[day] || 0,
    }));
  } catch (error) {
    console.error("Error fetching chart stats:", error);
    return [];
  }
}
