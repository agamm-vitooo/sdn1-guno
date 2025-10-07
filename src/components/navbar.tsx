"use client"
import Link from "next/link"
import { useState } from "react"

// Data untuk dropdown
const menus = {
  portal: [
    { type: "a", href: "https://siboba-esguji.vercel.app/", label: "📖 Kamus Bahasa Jawa" },
    { type: "link", href: "/portal/siswa", label: "👨‍🎓 Data Siswa" },
    { type: "link", href: "/portal/kelulusan", label: "🎓 Data Kelulusan" },
  ],
  kabar: [
    { type: "link", href: "/kabar/berita", label: "📰 Berita" },
    { type: "link", href: "/kabar/agenda", label: "📅 Agenda" },
    { type: "link", href: "/kabar/prestasi", label: "🏆 Prestasi" },
    { type: "link", href: "/kabar/pengumuman", label: "📢 Pengumuman" },
    { type: "link", href: "/kabar/galeri", label: "🛣️ Galeri" },
  ],
  tentang: [
    { type: "link", href: "/tentang/perangkat-pembelajaran", label: "📘 Perangkat Pembelajaran" },
    { type: "link", href: "/tentang/jadwal", label: "📅 Jadwal Pelajaran Terbaru" },
    { type: "link", href: "/tentang/visi-misi", label: "🎯 Visi dan Misi" },
    { type: "link", href: "/tentang/sejarah", label: "📜 Sejarah Singkat" },
    { type: "link", href: "/tentang/fasilitas", label: "🏫 Fasilitas" },
    { type: "link", href: "/tentang/ekstrakurikuler", label: "⚽ Daftar Ekstrakurikuler" },
    { type: "link", href: "/tentang/struktur", label: "👥 Struktur Organisasi" },
  ],
  program: [
    { type: "link", href: "/program/sekolah-penggerak", label: "🚀 Sekolah Penggerak" },
    { type: "link", href: "/program/sekolah-damai", label: "🕊️ Sekolah Damai" },
    { type: "link", href: "/program/sekolah-ramah-anak", label: "👶 Sekolah Ramah Anak" },
    { type: "link", href: "/program/narasi-tali-hati", label: "❤️ Narasi Tali Hati" },
    { type: "link", href: "/program/ketahanan-pangan", label: "🌱 Ketahanan Pangan Sekolah" },
  ],
}

export default function NavbarPublic() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu)
  }

  const renderDropdown = (name: keyof typeof menus, isMobile = false) => (
    <div
      className={`${
        isMobile
          ? "pl-6 space-y-1"
          : "absolute left-0 mt-2 w-56 bg-white border rounded-lg shadow-sm"
      }`}
    >
      {menus[name].map((item, i) =>
        item.type === "a" ? (
          <a
            key={i}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
          >
            {item.label}
          </a>
        ) : (
          <Link
            key={i}
            href={item.href}
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
          >
            {item.label}
          </Link>
        )
      )}
    </div>
  )

  return (
    <nav className="w-full bg-white/95 backdrop-blur-md shadow-sm fixed top-0 left-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-blue-600"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <span>SDN 1 Guno</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {["portal", "kabar", "tentang", "program"].map((menu) => (
              <div key={menu} className="relative">
                <button
                  onClick={() => toggleDropdown(menu)}
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium flex items-center gap-1"
                >
                  {menu === "portal"
                    ? "Portal"
                    : menu === "kabar"
                    ? "Kabar"
                    : menu === "tentang"
                    ? "Tentang ESGUJI"
                    : "Program Unggulan"}
                  <svg
                    className={`w-4 h-4 transform transition-transform ${
                      openDropdown === menu ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openDropdown === menu &&
                  renderDropdown(menu as keyof typeof menus)}
              </div>
            ))}

            <Link
              href="/login"
              className="ml-4 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 font-medium shadow-md transition"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-4 space-y-1">
              {["portal", "kabar", "tentang", "program"].map((menu) => (
                <div key={menu}>
                  <button
                    onClick={() => toggleDropdown(menu)}
                    className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium"
                  >
                    <span>
                      {menu === "portal"
                        ? "Portal"
                        : menu === "kabar"
                        ? "Kabar"
                        : menu === "tentang"
                        ? "Tentang ESGUJI"
                        : "Program Unggulan"}
                    </span>
                    <svg
                      className={`w-5 h-5 transform transition-transform ${
                        openDropdown === menu ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openDropdown === menu &&
                    renderDropdown(menu as keyof typeof menus, true)}
                </div>
              ))}

              <Link
                href="/login"
                className="block px-4 py-3 mt-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-center"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
