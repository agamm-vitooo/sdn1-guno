"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Blog {
  id: number;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔎 Fetch blogs (pakai useCallback agar aman dipakai di useEffect)
  const fetchBlogs = useCallback(async () => {
    setLoading(true);

    let query = supabase.from("blogs").select("*").order("id", { ascending: false });

    if (startDate && endDate) {
      query = query.gte("created_at", startDate).lte("created_at", endDate);
    }

    const { data, error } = await query;
    if (error) console.error("❌ Gagal fetch blogs:", error.message);
    setBlogs(data || []);
    setLoading(false);
  }, [startDate, endDate]);

  // 🌀 Load data pertama kali
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Semua Artikel</h1>
          <p className="text-gray-600 text-lg">Temukan berita dan informasi terbaru dari sekolah kami</p>
        </div>

        {/* 🗓️ Filter tanggal */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto"
          />
          <span className="text-gray-500">sampai</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto"
          />
          <button
            onClick={fetchBlogs}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Filter
          </button>
          {(startDate || endDate) && (
            <button
              onClick={() => {
                setStartDate("");
                setEndDate("");
                fetchBlogs();
              }}
              className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
            >
              Reset
            </button>
          )}
        </div>

        {/* 📚 Daftar artikel */}
        {loading ? (
          <p className="text-center text-gray-500">Memuat artikel...</p>
        ) : blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-lg">
            <p className="text-gray-500 text-xl font-semibold mb-2">Tidak ada artikel dalam rentang tanggal ini</p>
            <p className="text-gray-400 text-sm">Coba ubah filter tanggalnya</p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {blogs.map((blog) => (
              <article
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                key={blog.id}
              >
                <div className="flex flex-col lg:flex-row">
                  {blog.image_url && (
                    <div className="relative w-full lg:w-2/5 h-72 lg:h-auto overflow-hidden bg-gray-100">
                      <Image
                        src={blog.image_url}
                        alt={blog.title}
                        fill
                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}

                  <div className="lg:w-3/5 p-8 flex flex-col justify-between">
                    <div>
                      {/* 📅 Tanggal */}
                      {blog.created_at && (
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                        {blog.title}
                      </h3>

                      <p className="text-gray-600 text-base leading-relaxed line-clamp-3 mb-6">{blog.content}</p>
                    </div>

                    <Link
                      href={`/blog/${blog.id}`}
                      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 font-semibold py-3 px-6 rounded-xl"
                    >
                      <span>Baca Selengkapnya</span>
                      <svg
                        className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
