"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import GaleriForm from "./galeri.form";

interface GaleriData {
  id: number;
  title: string;
  description: string;
  image_url?: string | null;
  created_at?: string;
}

export default function GaleriList() {
  const [galeris, setGaleris] = useState<GaleriData[]>([]);
  const [editing, setEditing] = useState<GaleriData | null>(null);

  // Fetch galeri dari Supabase
  const fetchGaleris = async () => {
    const { data } = await supabase
      .from("galeri")
      .select("*")
      .order("created_at", { ascending: false });
    setGaleris(data || []);
  };

  useEffect(() => {
    fetchGaleris();
  }, []);

  // Delete galeri
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus galeri ini?")) return;
    await supabase.from("galeri").delete().eq("id", id);
    fetchGaleris();
  };

  // Dapatkan URL publik Supabase
  const getImageUrl = (path: string) => {
    if (!path) return "";
    const relativePath = path.replace(/^blog-images\//, "");
    return supabase.storage.from("blog-images").getPublicUrl(relativePath).data.publicUrl;
  };

  return (
    <div className="space-y-6">
      {/* Form Edit / Tambah */}
      {editing && (
        <GaleriForm
          editData={editing}
          onSaved={() => {
            setEditing(null);
            fetchGaleris();
          }}
        />
      )}

      {/* Tabel Galeri */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Judul</th>
            <th className="border p-2">Deskripsi</th>
            <th className="border p-2">Gambar</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {galeris.map((g) => (
            <tr key={g.id} className="hover:bg-gray-50">
              <td className="border p-2">{g.title}</td>
              <td className="border p-2">{g.description}</td>
              <td className="border p-2">
                {g.image_url && (
                  <div className="relative w-20 h-20">
                    <Image
                      src={getImageUrl(g.image_url)}
                      alt={g.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}
              </td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => setEditing(g)}
                  className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(g.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {galeris.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center py-6 text-gray-500">
                Belum ada galeri
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
