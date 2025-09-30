"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

interface GaleriData {
  id: number;
  title: string;
  description: string;
  image_url?: string | null;
  created_at?: string;
}

export default function GaleriPage() {
  const [galeris, setGaleris] = useState<GaleriData[]>([]);

  useEffect(() => {
    const fetchGaleris = async () => {
      const { data } = await supabase
        .from("galeri")
        .select("*")
        .order("created_at", { ascending: false });
      setGaleris(data || []);
    };
    fetchGaleris();
  }, []);

  const getImageUrl = (path: string) => {
    if (!path) return "";
    const relativePath = path.replace(/^blog-images\//, "");
    return supabase.storage.from("blog-images").getPublicUrl(relativePath).data.publicUrl;
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {galeris.map((g) => (
        <div key={g.id} className="border p-2 rounded shadow">
          {g.image_url && (
            <Image
              src={getImageUrl(g.image_url)}
              alt={g.title}
              width={400} // bisa sesuaikan atau buat responsif
              height={300}
              className="w-full h-48 object-cover mb-2 rounded"
            />
          )}
          <h3 className="font-bold">{g.title}</h3>
          <p className="text-sm text-gray-600">{g.description}</p>
        </div>
      ))}
    </div>
  );
}
