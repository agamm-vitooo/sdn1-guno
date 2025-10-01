"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

interface PrestasiData {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
}

export default function PublicPrestasiPage() {
  const [prestasis, setPrestasis] = useState<PrestasiData[]>([]);

  useEffect(() => {
    const fetchPrestasi = async () => {
      const { data, error } = await supabase
        .from("prestasi")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) return console.error(error);
      setPrestasis(data || []);
    };
    fetchPrestasi();
  }, []);

  return (
    <section className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Pencapaian Siswa</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Berbagai prestasi yang telah diraih oleh siswa-siswi SDN 1 Guno
          </p>
        </div>

        {/* Empty State */}
        {prestasis.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-xl">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p className="text-gray-500 text-xl font-semibold">Belum ada prestasi</p>
          </div>
        ) : (
          /* Grid Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prestasis.map((p) => (
              <article
                key={p.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                {/* Image Container */}
                {p.image_url && (
                  <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
                    <Image
                      src={p.image_url}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="high" // ⚡ kasih prioritas ke LCP image pertama
                      quality={70} // kurangi size, tetap jernih
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {p.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed line-clamp-3">
                    {p.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
