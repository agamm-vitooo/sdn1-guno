"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface VisiMisi {
  id: number;
  type: string;
  content: string;
}

export default function VisiMisiPublicPage() {
  const [visi, setVisi] = useState<VisiMisi[]>([]);
  const [misi, setMisi] = useState<VisiMisi[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("visi_misi").select("*");
      if (error) console.error(error);
      else {
        setVisi(data.filter((d) => d.type === "visi"));
        setMisi(data.filter((d) => d.type === "misi"));
      }
    };
    fetchData();
  }, []);

  return (
    <section className="max-w-5xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Visi & Misi</h1>
      <div className="grid grid-cols-2 gap-6">
        {/* Kotak A - Visi */}
        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="font-bold text-xl mb-2">Visi</h2>
          {visi.map((item) => (
            <p key={item.id}>{item.content}</p>
          ))}
        </div>

        {/* Kotak B - Misi */}
        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="font-bold text-xl mb-2">Misi</h2>
          <ul className="list-disc list-inside">
            {misi.map((item) => (
              <li key={item.id}>{item.content}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
