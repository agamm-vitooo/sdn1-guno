import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function BlogSection() {
  // Ambil 3 artikel terbaru
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("id, title, content, created_at, image_url")
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error(error);
    return <p>Terjadi kesalahan saat memuat artikel.</p>;
  }

  if (!blogs || blogs.length === 0) {
    return (
      <section className="max-w-7xl mx-auto p-6 py-20 text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">
          Artikel Sekolah
        </h2>
        <p className="text-gray-600 mb-8">
          Belum ada artikel yang tersedia.
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto p-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">Artikel Sekolah</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Berita dan informasi terkini dari sekolah kami
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="group border border-gray-200 rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            {blog.image_url && (
              <div className="relative w-full h-56 sm:h-64 md:h-48 lg:h-56 overflow-hidden">
                <Image
                  src={blog.image_url}
                  alt={blog.title}
                  fill
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-3 text-gray-500 text-sm font-medium">
                {new Date(blog.created_at).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </div>

              <h3 className="text-xl font-bold mb-3 line-clamp-2 text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                {blog.title}
              </h3>

              <p className="text-gray-600 text-sm flex-1 line-clamp-3 leading-relaxed mb-4">
                {blog.content}
              </p>

              {/* Pastikan id dikonversi ke Number agar URL valid */}
              <Link
                href={`/kabar/berita/${Number(blog.id)}`}
                className="inline-flex items-center border justify-center gap-2 text-gray-800 bg-transparent hover:bg-green-700 hover:text-white font-medium py-3 px-5 rounded-3xl transition-all duration-200 group-hover:gap-3"
              >
                <span>Baca Selengkapnya</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {blogs.length === 3 && (
        <div className="text-center mt-12">
          <Link
            href="/kabar/berita"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-lg group"
          >
            <span>Lihat semua artikel</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
}
