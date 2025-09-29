"use client"
import Link from "next/link"
import { useState } from "react"

export default function NavbarPublic() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPortalOpen, setIsPortalOpen] = useState(false)
  const [isKabarOpen, setIsKabarOpen] = useState(false)
  const [isTentangOpen, setIsTentangOpen] = useState(false)

  return (
    <nav className="w-full bg-white/95 backdrop-blur-md shadow-lg fixed top-0 left-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span>SDN 1 Guno</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Portal */}
            <div className="relative">
              <button
                onClick={() => setIsPortalOpen(!isPortalOpen)}
                className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium flex items-center gap-1"
              >
                Portal
                <svg className={`w-4 h-4 transform transition-transform ${isPortalOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isPortalOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white border rounded-lg shadow-md">
                  <a
                    href="https://siboba-esguji.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
                  >
                    📖 Kamus Bahasa Jawa
                  </a>
                  <Link href="/portal/siswa" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">👨‍🎓 Data Siswa</Link>
                  <Link href="/portal/kelulusan" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">🎓 Data Kelulusan</Link>
                </div>
              )}
            </div>

            {/* Kabar */}
            <div className="relative">
              <button
                onClick={() => setIsKabarOpen(!isKabarOpen)}
                className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium flex items-center gap-1"
              >
                Kabar
                <svg className={`w-4 h-4 transform transition-transform ${isKabarOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isKabarOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white border rounded-lg shadow-md">
                  <Link href="/kabar/berita" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">📰 Berita</Link>
                  <Link href="/kabar/agenda" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">📅 Agenda</Link>
                  <Link href="/kabar/prestasi" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">🏆 Prestasi</Link>
                  <Link href="/kabar/pengumuman" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">📢 Pengumuman</Link>
                  <Link href="/kabar/galeri" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">🛣️ Galeri</Link>
                </div>
              )}
            </div>

            <Link href="/program-unggulan" className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium">Program Unggulan</Link>

            {/* Tentang ESGUJI (dipindah ke belakang) */}
            <div className="relative">
              <button
                onClick={() => setIsTentangOpen(!isTentangOpen)}
                className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium flex items-center gap-1"
              >
                Tentang ESGUJI
                <svg className={`w-4 h-4 transform transition-transform ${isTentangOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isTentangOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white border rounded-lg shadow-md">
                  <Link href="/tentang/perangkat-pembelajaran" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">📘 Perangkat Pembelajaran</Link>
                  <Link href="/tentang/jadwal" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">📅 Jadwal Pelajaran Terbaru</Link>
                  <Link href="/tentang/visi-misi" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">🎯 Visi dan Misi</Link>
                  <Link href="/tentang/sejarah" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">📜 Sejarah Singkat</Link>
                  <Link href="/tentang/fasilitas" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">🏫 Fasilitas</Link>
                  <Link href="/tentang/ekstrakurikuler" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">⚽ Daftar Ekstrakurikuler</Link>
                  <Link href="/tentang/struktur" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">👥 Struktur Organisasi</Link>
                  <Link href="/tentang/mars" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">🎵 Mars SDN 1 Guno</Link>
                </div>
              )}
            </div>

            <Link
              href="/login"
              className="ml-4 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 font-medium shadow-md transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
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
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-4 space-y-1">
              {/* Portal accordion */}
              <button
                onClick={() => setIsPortalOpen(!isPortalOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium"
              >
                <span>Portal</span>
                <svg className={`w-5 h-5 transform transition-transform ${isPortalOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isPortalOpen && (
                <div className="pl-6 space-y-1">
                  <a
                    href="https://siboba-esguji.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
                  >
                    📖 Kamus Bahasa Jawa
                  </a>
                  <Link href="/portal/siswa" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">👨‍🎓 Data Siswa</Link>
                  <Link href="/portal/kelulusan" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">🎓 Data Kelulusan</Link>
                </div>
              )}

              {/* Kabar accordion */}
              <button
                onClick={() => setIsKabarOpen(!isKabarOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium"
              >
                <span>Kabar</span>
                <svg className={`w-5 h-5 transform transition-transform ${isKabarOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isKabarOpen && (
                <div className="pl-6 space-y-1">
                  <Link href="/kabar/berita" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">📰 Berita</Link>
                  <Link href="/kabar/agenda" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">📅 Agenda</Link>
                  <Link href="/kabar/prestasi" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">🏆 Prestasi</Link>
                  <Link href="/kabar/pengumuman" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">📢 Pengumuman</Link>
                  <Link href="/kabar/galeri" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">🛣️ Galeri</Link>
                </div>
              )}

              <Link href="/program-unggulan" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg">Program Unggulan</Link>

              {/* Tentang ESGUJI pindah ke bawah */}
              <button
                onClick={() => setIsTentangOpen(!isTentangOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium"
              >
                <span>Tentang ESGUJI</span>
                <svg className={`w-5 h-5 transform transition-transform ${isTentangOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isTentangOpen && (
                <div className="pl-6 space-y-1">
                  <Link href="/tentang/perangkat-pembelajaran" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">📘 Perangkat Pembelajaran</Link>
                  <Link href="/tentang/jadwal" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">📅 Jadwal Pelajaran Terbaru</Link>
                  <Link href="/tentang/visi-misi" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">🎯 Visi dan Misi</Link>
                  <Link href="/tentang/sejarah" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">📜 Sejarah Singkat</Link>
                  <Link href="/tentang/fasilitas" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">🏫 Fasilitas</Link>
                  <Link href="/tentang/ekstrakurikuler" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">⚽ Daftar Ekstrakurikuler</Link>
                  <Link href="/tentang/struktur" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">👥 Struktur Organisasi</Link>
                  <Link href="/tentang/mars" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">🎵 Mars SDN 1 Guno</Link>
                </div>
              )}

              <Link href="/login" className="block px-4 py-3 mt-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-center">Login</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
