"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Fasilitas {
  _id: string;
  title: string;
  image_url: string;
  created_at?: string;
}

export default function FasilitasPublicPage() {
  const [data, setData] = useState<Fasilitas[]>([]);

  useEffect(() => {
    fetch("/api/fasilitas")
      .then((res) => res.json())
      .then((json) => setData(json.data));
  }, []);

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Fasilitas Sekolah</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((fasilitas) => (
          <div
            key={fasilitas._id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 text-center"
          >
            <div className="relative w-full h-48 mb-3">
              <Image
                src={fasilitas.image_url}
                alt={fasilitas.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <h2 className="font-semibold text-gray-800">{fasilitas.title}</h2>
          </div>
        ))}
      </div>
    </main>
  );
}
