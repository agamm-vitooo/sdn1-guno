import { supabase } from "@/lib/supabaseClient";

export const revalidate = 60; // cache 1 menit

export default async function SekolahRamahAnakPage() {
  const { data } = await supabase
    .from("sekolah_ramah_anak")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-700 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sekolah Ramah Anak
          </h1>
          <p className="text-pink-100 text-lg max-w-2xl">
            Mewujudkan lingkungan belajar yang aman, nyaman, inklusif, dan menyenangkan bagi semua anak
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {data?.length ? (
          <div className="grid gap-6">
            {data.map((item, index) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 group"
              >
                {/* Card Header with Accent */}
                <div className="h-2 bg-gradient-to-r from-pink-500 to-purple-600"></div>

                <div className="p-8">
                  {/* Badge and Title */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 mb-3">
                        <span className="text-xs font-semibold text-pink-600 bg-pink-50 px-3 py-1 rounded-full">
                          Program #{index + 1}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                        {item.title}
                      </h2>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer with Date */}
                  <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <svg
                        className="w-4 h-4 text-pink-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>
                        Diperbarui:{" "}
                        {new Date(item.updated_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-pink-100 mb-6">
              <svg
                className="w-10 h-10 text-pink-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Belum Ada Data
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Saat ini belum ada program Sekolah Ramah Anak yang tersedia. Silakan cek kembali nanti.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
