"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Ekstra {
  _id: string;
  title: string;
  description: string;
  image_url: string;
  created_at?: string;
}

export default function EkstrakurikulerPublicPage() {
  const [data, setData] = useState<Ekstra[]>([]);

  useEffect(() => {
    fetch("/api/ekstrakurikuler")
      .then((res) => res.json())
      .then((json) => setData(json.data))
      .catch(console.error);
  }, []);

  return (
    <main className="py-16 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-center mb-8">Ekstrakurikuler</h1>

        <div className="grid gap-6 md:grid-cols-3">
          {data.map((item) => (
            <article
              key={item._id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <div className="relative h-44">
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {item.description}
                </p>
                <p className="text-xs text-gray-400 mt-3">
                  {item.created_at
                    ? new Date(item.created_at).toLocaleDateString("id-ID")
                    : ""}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
