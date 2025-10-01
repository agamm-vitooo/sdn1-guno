"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Pagination from "@/components/pagination";

interface Agenda {
  id: number;
  title: string;
  description: string;
  image_url?: string | null;
  created_at: string;
}

export default function AgendaPage() {
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [loading, setLoading] = useState(false);

  // 📌 Pagination state
  const [page, setPage] = useState(1);
  const limit = 5; // jumlah agenda per halaman
  const [totalPages, setTotalPages] = useState(1);

  // 🔎 Fetch agenda
  const fetchAgendas = useCallback(async () => {
    setLoading(true);

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from("agendas")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: true })
      .range(from, to);

    if (error) {
      console.error("❌ Gagal fetch agendas:", error.message);
    }

    setAgendas(data || []);
    setTotalPages(count ? Math.ceil(count / limit) : 1);
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchAgendas();
  }, [fetchAgendas]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Agenda Sekolah</h1>
          <p className="text-gray-600 text-lg">Jadwal kegiatan dan acara sekolah</p>
        </div>

        {/* Agenda List */}
        {loading ? (
          <p className="text-center text-gray-500">Memuat agenda...</p>
        ) : !agendas || agendas.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-xl font-semibold">Belum ada agenda</p>
          </div>
        ) : (
          <div className="space-y-6">
            {agendas.map((agenda) => (
              <article
                key={agenda.id}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  {agenda.image_url && (
                    <div className="relative w-full md:w-72 h-56 md:h-auto bg-gray-100 flex-shrink-0">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-images/agendas/${agenda.image_url?.split(
                          "/"
                        ).pop()}`}
                        alt={agenda.title}
                        fill
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Content Section */}
                  <div className="p-6 md:p-8 flex-1">
                    {/* Date Badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full">
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
                          {new Date(agenda.created_at).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{agenda.title}</h2>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed">{agenda.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* 📌 Pagination */}
        {agendas.length > 0 && (
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        )}
      </div>
    </section>
  );
}
