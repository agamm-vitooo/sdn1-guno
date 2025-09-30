"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Image as ImageIcon, Mail, X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SidebarAdmin({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  // Menu dengan nested submenu
  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    {
      name: "Kabar",
      icon: ImageIcon,
      submenu: [
        { name: "Berita", href: "/admin/kabar/berita" },
        { name: "Agenda", href: "/admin/kabar/agenda" },
        { name: "Prestasi", href: "/admin/kabar/prestasi" },
        { name: "Pengumuman", href: "/kabar/pengumuman" },
        { name: "Galeri", href: "/kabar/galeri" },
      ],
    },
    { name: "Program Unggulan", href: "/program-unggulan", icon: Mail },
    {
      name: "Tentang ESGUJI",
      icon: FileText,
      submenu: [
        { name: "Perangkat Pembelajaran", href: "/tentang/perangkat-pembelajaran" },
        { name: "Jadwal Pelajaran Terbaru", href: "/tentang/jadwal" },
        { name: "Visi dan Misi", href: "/tentang/visi-misi" },
        { name: "Sejarah Singkat", href: "/tentang/sejarah" },
        { name: "Fasilitas", href: "/tentang/fasilitas" },
        { name: "Ekstrakurikuler", href: "/tentang/ekstrakurikuler" },
        { name: "Struktur Organisasi", href: "/tentang/struktur" },
        { name: "Mars SDN 1 Guno", href: "/tentang/mars" },
      ],
    },
  ];

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40" onClick={onClose} />}

      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-white shadow-lg flex flex-col transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="p-6 flex justify-between items-center border-b">
          <h2 className="text-xl font-extrabold text-gray-800 tracking-tight">Admin Panel</h2>
          <button onClick={onClose} className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const hasSubmenu = !!item.submenu;

              return (
                <li key={item.name}>
                  {!hasSubmenu ? (
                    <Link
                      href={item.href!}
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                        pathname === item.href
                          ? "bg-blue-500 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {Icon && <Icon size={20} />}
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ) : (
                    <details className="group">
                      <summary className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer select-none text-gray-700 hover:bg-gray-100">
                        {Icon && <Icon size={20} />}
                        <span className="font-medium">{item.name}</span>
                      </summary>
                      <ul className="pl-6 mt-1 space-y-1">
                        {item.submenu!.map((sub) => (
                          <li key={sub.name}>
                            <Link
                              href={sub.href}
                              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg"
                              target={sub.href.startsWith("http") ? "_blank" : "_self"}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t text-sm text-gray-500">© {new Date().getFullYear()} Admin Panel</div>
      </aside>
    </>
  );
}
