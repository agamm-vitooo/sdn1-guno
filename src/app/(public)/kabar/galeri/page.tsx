"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

interface GaleriData {
  id: number;
  title: string;
  description: string;
  image_url?: string | null;
  created_at?: string;
}

// ✅ Helper: generate URL public Supabase
const getImageUrl = (path?: string | null): string => {
  if (!path) return "";
  const relativePath = path.replace(/^blog-images\//, "");
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-images/${relativePath}`;
};

// ✅ Komponen Kartu Galeri
function GaleriCard({ data, isFirst }: { data: GaleriData; isFirst?: boolean }) {
  const imageUrl = getImageUrl(data.image_url);

  return (
    <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      {imageUrl && (
        <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
          <Image
            src={imageUrl}
            alt={data.title || "Foto galeri"}
            fill
            priority={isFirst} // hanya gambar pertama (LCP) diberi priority
            fetchPriority={isFirst ? "high" : "auto"}
            loading={isFirst ? "eager" : "lazy"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />

          {/* Overlay teks */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
            <div className="p-4 text-white">
              <h3 className="font-bold text-lg line-clamp-1">{data.title}</h3>
              <p className="text-sm opacity-90 line-clamp-2">{data.description}</p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default function GaleriPage() {
  const [galeris, setGaleris] = useState<GaleriData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const fetchGaleris = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("galeri")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) {
        setGaleris(data || []);
      }
      setLoading(false);
    };

    fetchGaleris();
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Galeri Foto</h1>
          <p className="text-gray-600 text-lg">
            Dokumentasi kegiatan dan momen berharga di sekolah
          </p>
        </header>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-md">
            <p className="text-gray-500 text-lg">Memuat galeri...</p>
          </div>
        ) : galeris.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-md">
            <p className="text-gray-500 text-lg">Belum ada foto dalam galeri</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galeris.map((g, i) => (
              <GaleriCard key={g.id} data={g} isFirst={i === 0} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
