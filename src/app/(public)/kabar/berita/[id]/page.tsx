"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 🧩 Definisikan tipe blog
interface Blog {
  id: string;
  title: string;
  content: string;
  created_at: string;
  image_url: string | null;
  is_featured: boolean;
}

export default function BlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      console.log("📡 Mengambil artikel dengan id:", id);
      const { data, error } = await supabase
        .from("blogs")
        .select("id, title, content, created_at, image_url, is_featured")
        .eq("id", id)
        .single();

      if (error) {
        console.error("❌ Gagal mengambil data:", error);
      } else {
        console.log("✅ Data blog:", data);
        setBlog(data as Blog);
      }
      setLoading(false);
    };

    fetchBlog();
  }, [id]);

  if (loading)
    return <p className="text-center mt-20 text-gray-500">Memuat artikel...</p>;

  if (!blog)
    return (
      <div className="text-center mt-20 text-red-600">
        Artikel tidak ditemukan.
      </div>
    );

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Tombol Kembali */}
        <Link
          href="/kabar/berita"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium mb-8 transition-colors duration-200 group"
        >
          <svg
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Kembali ke Semua Artikel</span>
        </Link>

        {/* Kontainer Artikel */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Gambar Utama */}
          {blog.image_url && (
            <div className="relative w-full h-96 bg-gray-100">
              <Image
                src={blog.image_url}
                alt={blog.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          )}

          {/* Konten Artikel */}
          <div className="p-8 md:p-12">
            {/* Tanggal */}
            {blog.created_at && (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm font-medium">
                    {new Date(blog.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            )}

            {/* Judul */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              {blog.title}
            </h1>

            {/* Isi Konten */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-lg whitespace-pre-line leading-relaxed text-justify">
                {blog.content}
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
