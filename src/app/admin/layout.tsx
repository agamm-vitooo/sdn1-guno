"use client";

import { useState } from "react";
import SidebarAdmin from "@/components/sidebarAdmin";
import NavbarAdmin from "@/components/navbarAdmin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SidebarAdmin isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <NavbarAdmin onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-6 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
