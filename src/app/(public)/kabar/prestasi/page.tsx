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
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {prestasis.map((p) => (
        <div key={p.id} className="border rounded-lg shadow-md overflow-hidden">
          {p.image_url && (
            <div className="relative w-full h-48">
              <Image
                src={p.image_url}
                alt={p.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw" // optimisasi responsif
                priority={false}
              />
            </div>
          )}
          <div className="p-4">
            <h2 className="font-bold text-lg mb-2">{p.title}</h2>
            <p className="text-gray-600 text-sm">{p.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
