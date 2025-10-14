"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Ketahanan {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export default function ListKetahanan({
  onEdit,
  refresh,
}: {
  onEdit: (item: Ketahanan) => void;
  refresh: boolean;
}) {
  const [data, setData] = useState<Ketahanan[]>([]);

  useEffect(() => {
    fetchData();
  }, [refresh]);

  async function fetchData() {
    const { data } = await supabase
      .from("ketahanan_pangan_sekolah")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setData(data);
  }

  async function handleDelete(id: number) {
    if (confirm("Yakin ingin menghapus data ini?")) {
      await supabase.from("ketahanan_pangan_sekolah").delete().eq("id", id);
      fetchData();
    }
  }

  return (
    <div className="space-y-3 mt-4">
      <h2 className="text-lg font-semibold">Daftar Ketahanan Pangan Sekolah</h2>

      {data.length === 0 ? (
        <p className="text-gray-500">Belum ada data.</p>
      ) : (
        data.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded-lg flex justify-between items-center bg-gray-50"
          >
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-xs text-gray-400">
                Diperbarui: {new Date(item.updated_at).toLocaleString()}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(item)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
