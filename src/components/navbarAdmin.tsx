"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { LogOut, Menu } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function NavbarAdmin({ onMenuClick }: NavbarProps) {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <header className="w-full bg-white px-6 py-4 flex justify-between items-center shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Tombol Hamburger */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-lg font-extrabold text-gray-800 tracking-tight">
          Admin Dashboard
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
          A
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
