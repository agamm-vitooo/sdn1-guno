"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface SekolahRamahAnak {
  id: string;
  title: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

interface Props {
  onEdit: (item: SekolahRamahAnak) => void;
  onRefreshTrigger: boolean;
}

export default function ListSekolahRamahAnak({
  onEdit,
  onRefreshTrigger,
}: Props) {
  const [data, setData] = useState<SekolahRamahAnak[]>([]);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("sekolah_ramah_anak")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }

    setData(data || []);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      const { error } = await supabase
        .from("sekolah_ramah_anak")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting data:", error);
      } else {
        fetchData();
      }
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
