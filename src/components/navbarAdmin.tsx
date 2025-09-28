"use client"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function NavbarAdmin() {
  const router = useRouter()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <header className="w-full bg-white shadow p-4 flex justify-between items-center">
      <h1 className="font-bold">Admin Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </header>
  )
}
