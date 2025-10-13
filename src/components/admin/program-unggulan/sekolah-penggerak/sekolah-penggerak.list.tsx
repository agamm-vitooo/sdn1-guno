"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// Definisikan tipe data sesuai tabel
interface SekolahPenggerak {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  onEdit: (item: SekolahPenggerak) => void;
  onRefreshTrigger: boolean;
}

export default function ListSekolahPenggerak({ onEdit, onRefreshTrigger }: Props) {
  const [data, setData] = useState<SekolahPenggerak[]>([]);

  const fetchData = async () => {
    const { data } = await supabase
      .from("sekolah_penggerak")
      .select("*")
      .order("created_at", { ascending: false });

    setData((data as SekolahPenggerak[]) || []);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      await supabase.from("sekolah_penggerak").delete().eq("id", id);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, [onRefreshTrigger]);

  return (
    <div className="mt-4">
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Judul</th>
            <th className="border p-2">Deskripsi</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.title}</td>
              <td className="border p-2">{item.description}</td>
              <td className="border p-2 text-center space-x-2">
                <button
                  onClick={() => onEdit(item)}
                  className="bg-yellow-400 px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center p-3">
                Tidak ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
