"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import {
  Book, School, Users, Calendar, Newspaper, Trophy, Megaphone, ImageIcon, FileText, Clock, Target, ScrollText, Building2, Layers, Rocket, Baby, Heart, Leaf, } from "lucide-react"

// Data dropdown
const menus = {
  portal: [
    { type: "a", href: "https://siboba-esguji.vercel.app/", label: "Kamus Bahasa Jawa", icon: Book },
    { type: "a", href: "https://dinaspdank.wonogirikab.go.id/", label: "Dinas P&K Kab. Wonogiri", icon: School },
    { type: "link", href: "/portal/siswa", label: "Data Siswa", icon: Users },
    { type: "link", href: "/portal/kelulusan", label: "Data Kelulusan", icon: ScrollText },
  ],
  kabar: [
    { type: "link", href: "/kabar/berita", label: "Berita", icon: Newspaper },
    { type: "link", href: "/kabar/agenda", label: "Agenda", icon: Calendar },
    { type: "link", href: "/kabar/prestasi", label: "Prestasi", icon: Trophy },
    { type: "link", href: "/kabar/pengumuman", label: "Pengumuman", icon: Megaphone },
    { type: "link", href: "/kabar/galeri", label: "Galeri", icon: ImageIcon },
  ],
  tentang: [
    { type: "link", href: "/tentang/perangkat-pembelajaran", label: "Perangkat Pembelajaran", icon: FileText },
    { type: "link", href: "/tentang/jadwal-pembelajaran", label: "Jadwal Pelajaran Terbaru", icon: Clock },
    { type: "link", href: "/tentang/visi-misi", label: "Visi dan Misi", icon: Target },
    { type: "link", href: "/tentang/sejarah", label: "Sejarah Singkat", icon: ScrollText },
    { type: "link", href: "/tentang/fasilitas", label: "Fasilitas", icon: Building2 },
    { type: "link", href: "/tentang/ekstrakurikuler", label: "Daftar Ekstrakurikuler", icon: Target },
    { type: "link", href: "/tentang/struktur", label: "Struktur Organisasi", icon: Layers },
  ],
  program: [
    { type: "link", href: "/program/sekolah-penggerak", label: "Sekolah Penggerak", icon: Rocket },
    { type: "link", href: "/program/sekolah-damai", label: "Sekolah Damai", icon: Heart },
    { type: "link", href: "/program/sekolah-ramah-anak", label: "Sekolah Ramah Anak", icon: Baby },
    { type: "link", href: "/program/narasi-tali-hati", label: "Narasi Tali Hati", icon: Heart },
    { type: "link", href: "/program/ketahanan-pangan-sekolah", label: "Ketahanan Pangan Sekolah", icon: Leaf },
  ],
}

export default function NavbarPublic() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu)
  }

  const renderDropdown = (name: keyof typeof menus, isMobile = false) => (
  <div
    className={`${
      isMobile
        ? "pl-6 space-y-1"
        : "absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg"
    } animate-in fade-in slide-in-from-top-2 duration-200`}
  >
    {menus[name].map((item, i) => {
      const Icon = item.icon
      return item.type === "a" ? (
        <a
          key={i}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 rounded"
        >
          <Icon className="w-4 h-4 text-blue-600" />
          {item.label}
        </a>
      ) : (
        <Link
          key={i}
          href={item.href}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 rounded"
        >
          <Icon className="w-4 h-4 text-blue-600" />
          {item.label}
        </Link>
      )
    })}
  </div>
)

  return (
    <nav 
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white shadow-md border-b border-gray-200" 
          : "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`flex justify-between items-center transition-all duration-300 ${
            isScrolled ? "h-14" : "h-16"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center gap-2 font-bold text-blue-600 transition-all duration-300 ${
              isScrolled ? "text-lg" : "text-xl"
            }`}
          >
            <div 
              className={`bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md transition-all duration-300 ${
                isScrolled ? "w-8 h-8" : "w-10 h-10"
              }`}
            >
              <svg
                className={`text-white transition-all duration-300 ${
                  isScrolled ? "w-5 h-5" : "w-6 h-6"
                }`}
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
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium flex items-center gap-1 transition-colors duration-150 rounded-lg hover:bg-blue-50"
                >
                  {menu === "portal"
                    ? "Portal"
                    : menu === "kabar"
                    ? "Kabar"
                    : menu === "tentang"
                    ? "Tentang ESGUJI"
                    : "Program Unggulan"}
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-200 ${
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
              className="ml-4 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 font-medium shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg"
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
              className="p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
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
          <div className="md:hidden bg-white border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="px-2 pt-2 pb-4 space-y-1">
              {["portal", "kabar", "tentang", "program"].map((menu) => (
                <div key={menu}>
                  <button
                    onClick={() => toggleDropdown(menu)}
                    className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors duration-150"
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
                      className={`w-5 h-5 transform transition-transform duration-200 ${
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
                className="block px-4 py-3 mt-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-center hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
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