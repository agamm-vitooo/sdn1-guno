"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";

interface Pengumuman {
  id: number;
  title: string;
  description: string;
  date: string;
  image_url?: string | null;
}

export default function PengumumanDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<Pengumuman | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("pengumuman")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error("❌ Gagal mengambil detail:", error.message);
      setData(data);
      setLoading(false);
    };

    if (id) fetchDetail();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Memuat detail pengumuman...
      </div>
    );

  if (!data)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-500">
        <p>Pengumuman tidak ditemukan.</p>
        <Link href="/kabar/pengumuman" className="mt-4 text-purple-600 hover:underline">
          ← Kembali ke Daftar Pengumuman
        </Link>
      </div>
    );

  const imgSrc = data.image_url?.startsWith("http")
    ? data.image_url
    : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-images/${data.image_url}`;

  return (
    <section className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-6 bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Gambar */}
        {data.image_url && (
          <div className="relative w-full h-80 bg-purple-100">
            <Image
              src={imgSrc}
              alt={data.title}
              fill
              className="object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Konten */}
        <div className="p-8">
          {/* Tanggal */}
          <div className="flex items-center gap-2 text-purple-700 mb-4">
            <svg
              className="w-5 h-5"
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
            <span className="text-sm font-medium">{data.date}</span>
          </div>

          {/* Judul */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{data.title}</h1>

          {/* Deskripsi */}
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {data.description}
          </p>

          <Link
            href="/kabar/pengumuman"
            className="mt-8 inline-block text-purple-600 hover:text-purple-800 transition-colors"
          >
            ← Kembali ke Daftar Pengumuman
          </Link>
        </div>
      </div>
    </section>
  );
}
