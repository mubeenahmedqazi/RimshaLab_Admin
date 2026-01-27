import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { ReactNode } from "react";

export const metadata = {
  title: "Rimsha Lab Dashboard",
  description: "Admin dashboard",
  icons: {
    icon: "/logo.jpg",
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-gray-100 flex min-h-screen">
        {/* Sidebar on the left */}
        <div className="w-64 bg-white shadow-md flex-shrink-0">
          <Sidebar />
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Topbar on top */}
          <div className="bg-white shadow-md z-10">
            <Topbar />
          </div>

          {/* Scrollable content */}
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
