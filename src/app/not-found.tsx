import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Halaman Tidak Ditemukan</h1>
      <p className="text-gray-600 mb-6">
        Maaf, halaman yang kamu cari tidak tersedia.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
