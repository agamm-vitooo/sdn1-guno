"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface SejarahItem {
  _id: string;
  title: string;
  description: string;
  image_url?: string;
  created_at: string;
}

interface Props {
  onEdit: (item: SejarahItem) => void;
  refreshTrigger?: number; // bisa dipakai untuk reload list setelah tambah/edit/hapus
}

export default function SejarahList({ onEdit, refreshTrigger }: Props) {
  const [data, setData] = useState<SejarahItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Ambil data dari backend
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/sejarah");
      const json = await res.json();
      setData(json.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin hapus sejarah ini?")) return;
    try {
      const res = await fetch(`/api/sejarah/${id}`, { method: "DELETE" });
      if (res.ok) {
        setData((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert("Gagal menghapus sejarah");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Memuat sejarah...</p>;

  if (data.length === 0)
    return (
      <p className="text-gray-500 text-center bg-white p-6 rounded border">
        Belum ada sejarah. Silakan tambahkan menggunakan form di atas.
      </p>
    );

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item._id} className="bg-white p-6 rounded border">
          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
          <p className="text-gray-600 mb-3">{item.description}</p>

          {item.image_url && (
            <div className="relative w-full max-w-md h-64 mb-3">
              <Image
                src={item.image_url}
                alt={item.title}
                fill
                className="object-cover rounded-md border"
              />
            </div>
          )}

          <div className="text-xs text-gray-400 mb-4">
            Diperbarui: {new Date(item.created_at).toLocaleString("id-ID")}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(item)}
              className="px-4 py-2 bg-yellow-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(item._id)}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
