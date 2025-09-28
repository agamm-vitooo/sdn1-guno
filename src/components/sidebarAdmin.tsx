"use client"
import Link from "next/link"

export default function SidebarAdmin() {
  return (
    <aside className="w-64 bg-gray-100 h-screen p-4">
      <h2 className="text-lg font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-4">
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/admin/blog">Blog</Link></li>
        <li><Link href="/galery">Galery</Link></li>
      </ul>
    </aside>
  )
}
