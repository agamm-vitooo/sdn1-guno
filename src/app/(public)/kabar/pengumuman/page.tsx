import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

interface Pengumuman {
  id: number;
  title: string;
  description: string;
  date: string;
  image_url?: string | null;
}

export default async function PengumumanPublicPage() {
  const { data: items } = await supabase
    .from("pengumuman")
    .select("*")
    .order("date", { ascending: true });

  return (
    <section className="min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Pengumuman</h1>
          <p className="text-gray-600 text-lg">Informasi dan pengumuman terbaru dari sekolah</p>
        </div>

        {/* Empty State */}
        {!items || items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-xl">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <p className="text-gray-500 text-xl font-semibold">Belum ada pengumuman</p>
          </div>
        ) : (
          /* Announcements List */
          <div className="space-y-6">
            {items?.map((it: Pengumuman) => {
              const imgSrc = it.image_url?.startsWith("http")
                ? it.image_url
                : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-images/${it.image_url}`;

              return (
                <article
                  key={it.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-purple-100"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    {it.image_url && (
                      <div className="relative w-full md:w-80 h-64 md:h-auto bg-gradient-to-br from-purple-100 to-pink-100 flex-shrink-0">
                        <Image
                          src={imgSrc}
                          alt={it.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="p-6 md:p-8 flex-1">
                      {/* Date Badge */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm font-medium">{it.date}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        {it.title}
                      </h2>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed">
                        {it.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}