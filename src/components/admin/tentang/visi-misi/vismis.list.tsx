"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface VisiMisi {
  id: number;
  type: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export default function VisiMisiList({ refreshKey }: { refreshKey: number }) {
  const [data, setData] = useState<VisiMisi[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("visi_misi")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) console.error(error);
      else setData(data);
    };
    fetchData();
  }, [refreshKey]);

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus data ini?")) return;
    await supabase.from("visi_misi").delete().eq("id", id);
    setData(data.filter((d) => d.id !== id));
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow mt-4">
      <h2 className="font-bold text-lg mb-2">Daftar Visi & Misi</h2>
      <ul className="space-y-2">
        {data.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <div>
              <span className="font-semibold capitalize">{item.type}:</span>{" "}
              {item.content}
              <div className="text-xs text-gray-500">
                Dibuat: {new Date(item.created_at).toLocaleString()}
              </div>
            </div>
            <div className="flex gap-2">
              {/* Tombol edit bisa dikembangkan */}
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
