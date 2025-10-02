"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import Pagination from "@/components/pagination";

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

  // 📌 Pagination state
  const [page, setPage] = useState(1);
  const limit = 5; // jumlah artikel per halaman
  const [totalPages, setTotalPages] = useState(1);

  // 🔎 Fetch blogs
  const fetchBlogs = useCallback(async () => {
    setLoading(true);

    let query = supabase
      .from("blogs")
      .select("id, title, content, created_at, image_url, is_featured", { count: "exact" })
      .order("id", { ascending: false });

    if (startDate && endDate) {
      query = query.gte("created_at", startDate).lte("created_at", endDate);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await query.range(from, to);
    if (error) console.error("❌ Gagal fetch blogs:", error.message);

    setBlogs(data || []);
    setTotalPages(count ? Math.ceil(count / limit) : 1);
    setLoading(false);
  }, [startDate, endDate, page]);

  // 🌀 Load data
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
            onChange={(e) => {
              setPage(1); // reset page ketika filter berubah
              setStartDate(e.target.value);
            }}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto"
          />
          <span className="text-gray-500">sampai</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setPage(1); // reset page ketika filter berubah
              setEndDate(e.target.value);
            }}
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
                setPage(1);
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
                className="group bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-gray-100"
                key={blog.id}
              >
                <div className="flex flex-col lg:flex-row">
                  {blog.image_url && (
                    <div className="relative w-full lg:w-2/5 h-72 lg:h-auto overflow-hidden bg-gray-100">
                      <Image
                        src={blog.image_url}
                        alt={blog.title}
                        fill
                        className="object-cover w-full h-full"
                      />
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

                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 line-clamp-2">
                        {blog.title}
                      </h3>

                      <p className="text-gray-600 text-base leading-relaxed line-clamp-3 mb-6">
                        {blog.content}
                      </p>
                    </div>

                    <Link
                      href={`/kabar/berita/${blog.id}`}
                      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto border border-gray-400 rounded-3xl text-gray-800 bg-transparent hover:bg-green-700 hover:text-white transition-all duration-200 font-semibold py-3 px-6"
                    >
                      <span>Baca Selengkapnya</span>
                      <svg
                        className="w-5 h-5"
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

        {/* 📌 Pagination */}
        {blogs.length > 0 && (
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        )}
      </div>
    </section>
  );
}
