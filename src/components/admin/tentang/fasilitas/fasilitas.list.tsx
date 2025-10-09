"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Tipe data fasilitas
interface Fasilitas {
  _id: string;
  title: string;
  image_url: string;
  created_at?: string;
}

export default function FasilitasList() {
  const [data, setData] = useState<Fasilitas[]>([]);

  async function fetchData() {
    const res = await fetch("/api/fasilitas");
    const json = await res.json();
    setData(json.data as Fasilitas[]);
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin hapus?")) return;
    await fetch(`/api/fasilitas/${id}`, { method: "DELETE" });
    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Daftar Fasilitas</h2>
      <ul className="space-y-3">
        {data.map((f) => (
          <li
            key={f._id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16">
                <Image
                  src={f.image_url}
                  alt={f.title}
                  fill
                  className="object-cover rounded"
                  sizes="64px"
                />
              </div>
              <span>{f.title}</span>
            </div>
            <button
              onClick={() => handleDelete(f._id)}
              className="text-red-600 hover:underline"
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
