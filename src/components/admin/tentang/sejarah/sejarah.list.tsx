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
  refreshTrigger?: number;
}

export default function SejarahList({ onEdit, refreshTrigger }: Props) {
  const [data, setData] = useState<SejarahItem | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/sejarah");
      const json = await res.json();
      setData(json.data?.[0] || null); // hanya ambil satu data pertama
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);

  const handleDelete = async () => {
    if (!data?._id) return;
    if (!confirm("Yakin ingin hapus sejarah sekolah?")) return;
    await fetch(`/api/sejarah/${data._id}`, { method: "DELETE" });
    setData(null);
  };

  if (loading) return <p>Memuat...</p>;

  if (!data)
    return (
      <p className="text-gray-500 text-center bg-white p-6 rounded border">
        Belum ada sejarah. Silakan tambahkan menggunakan form di atas.
      </p>
    );

  return (
    <div className="bg-white p-6 rounded border">
      <h3 className="text-xl font-semibold mb-2">{data.title}</h3>
      <p className="text-gray-600 mb-3">{data.description}</p>

      {data.image_url && (
        <div className="relative w-full max-w-md h-64 mb-3">
          <Image
            src={data.image_url}
            alt={data.title}
            fill
            className="object-cover rounded-md border"
          />
        </div>
      )}

      <div className="text-xs text-gray-400 mb-4">
        Diperbarui: {new Date(data.created_at).toLocaleString("id-ID")}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(data)}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
