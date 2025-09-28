import { ReactNode } from "react";
import SidebarAdmin from "@/components/sidebarAdmin";
import NavbarAdmin from "@/components/navbarAdmin";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SidebarAdmin />

      {/* Main area */}
      <div className="flex flex-1 flex-col">
        <NavbarAdmin />
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
