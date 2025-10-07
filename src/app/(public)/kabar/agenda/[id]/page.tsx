"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";

interface Agenda {
  id: number;
  title: string;
  description: string;
  image_url?: string | null;
  created_at: string;
}

export default function AgendaDetailPage() {
  const { id } = useParams();
  const [agenda, setAgenda] = useState<Agenda | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgenda = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("agendas")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("❌ Gagal mengambil detail agenda:", error.message);
      }

      setAgenda(data);
      setLoading(false);
    };

    if (id) fetchAgenda();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Memuat detail agenda...
      </div>
    );

  if (!agenda)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-500">
        <p>Agenda tidak ditemukan</p>
        <Link href="/kabar/agenda" className="mt-4 text-blue-600 hover:underline">
          ← Kembali ke Daftar Agenda
        </Link>
      </div>
    );

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-20">
      <div className="max-w-4xl mx-auto px-6 bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {agenda.image_url && (
          <div className="relative w-full h-72 bg-gray-100">
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

        <div className="p-8">
          <div className="flex items-center gap-2 text-blue-700 mb-4">
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
            <span className="text-sm font-medium">
              {new Date(agenda.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">{agenda.title}</h1>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {agenda.description}
          </p>

          <Link href="/kabar/agenda" className="mt-6 inline-block text-blue-600 hover:underline">
            ← Kembali ke Daftar Agenda
          </Link>
        </div>
      </div>
    </section>
  );
}
