"use client";

import Link from "next/link";
import { LayoutDashboard, Calendar, Mail, LogOut, ChevronDown, ChevronRight, FileText } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Sidebar() {
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [bookingsOpen, setBookingsOpen] = useState(false);
  const [healthCardOpen, setHealthCardOpen] = useState(false);

  return (
    <aside className="fixed left-0 top-0 w-64 h-full bg-indigo-900/95 backdrop-blur-md text-white shadow-2xl rounded-r-3xl border-r border-indigo-700 flex flex-col">
      
      {/* Logo */}
      <div className="relative flex flex-col items-center py-8">
        <Image
          src="/logo.jpg"
          alt="Rimsha Lab Logo"
          width={125}
          height={125}
          className="rounded-2xl shadow-md hover:scale-110 transition-transform duration-500 ease-out mx-auto"
          priority
        />
      </div>

      {/* Navigation Links (scrollable, no scrollbar) */}
      <nav className="flex-1 overflow-y-auto scrollbar-none px-4 space-y-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-700/70 hover:shadow-lg hover:scale-105 transition-all rounded-xl text-lg"
        >
          <LayoutDashboard className="w-5 h-5" /> Dashboard
        </Link>

        {/* BOOKINGS DROPDOWN */}
        <div className="space-y-1">
          <button
            onClick={() => setBookingsOpen(!bookingsOpen)}
            className="flex items-center justify-between w-full gap-3 px-4 py-3 hover:bg-indigo-700/70 hover:shadow-lg hover:scale-105 transition-all rounded-xl text-lg"
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5" /> Bookings
            </div>
            {bookingsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {bookingsOpen && (
            <div className="ml-6 space-y-1 border-l-2 border-indigo-600 pl-4">
              <Link
                href="/bookings/new"
                className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-700/50 hover:shadow-lg transition-all rounded-lg text-sm"
              >
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                New Bookings
              </Link>
              <Link
                href="/bookings/completed"
                className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-700/50 hover:shadow-lg transition-all rounded-lg text-sm"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Completed Bookings
              </Link>
              <Link
                href="/bookings"
                className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-700/50 hover:shadow-lg transition-all rounded-lg text-sm"
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                All Bookings
              </Link>
            </div>
          )}
        </div>

        {/* HEALTH CARD DROPDOWN */}
        <div className="space-y-1">
          <button
            onClick={() => setHealthCardOpen(!healthCardOpen)}
            className="flex items-center justify-between w-full gap-3 px-4 py-3 hover:bg-indigo-700/70 hover:shadow-lg hover:scale-105 transition-all rounded-xl text-lg"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5" /> Health Card
            </div>
            {healthCardOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {healthCardOpen && (
            <div className="ml-6 space-y-1 border-l-2 border-indigo-600 pl-4">
              <Link
                href="/health-card/new"
                className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-700/50 hover:shadow-lg transition-all rounded-lg text-sm"
              >
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                New Requests
              </Link>
              <Link
                href="/health-card/approved"
                className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-700/50 hover:shadow-lg transition-all rounded-lg text-sm"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Approved
              </Link>
              <Link
                href="/health-card/verify"
                className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-700/50 hover:shadow-lg transition-all rounded-lg text-sm"
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Verify Health Card
              </Link>
            </div>
          )}
        </div>

        {/* MESSAGES DROPDOWN */}
        <div className="space-y-1">
          <button
            onClick={() => setMessagesOpen(!messagesOpen)}
            className="flex items-center justify-between w-full gap-3 px-4 py-3 hover:bg-indigo-700/70 hover:shadow-lg hover:scale-105 transition-all rounded-xl text-lg"
          >
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5" /> Messages
            </div>
            {messagesOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {messagesOpen && (
            <div className="ml-6 space-y-1 border-l-2 border-indigo-600 pl-4">
              <Link
                href="/messages/unread"
                className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-700/50 hover:shadow-lg transition-all rounded-lg text-sm"
              >
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                Unread Messages
              </Link>
              <Link
                href="/messages/read"
                className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-700/50 hover:shadow-lg transition-all rounded-lg text-sm"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Read Messages
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Logout */}
      <div className="px-4 py-4">
        <Link
          href="/login"
          className="flex items-center gap-3 px-4 py-3 hover:bg-red-600 hover:shadow-lg hover:scale-105 transition-all rounded-xl text-lg"
        >
          <LogOut className="w-5 h-5" /> Logout
        </Link>
      </div>
    </aside>
  );
}
