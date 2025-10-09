// src/components/admin/tentang/ekstrakurikuler/ekstrakurikuler.list.tsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import EkstrakurikulerForm from "./ekstrakurikuler.form";

interface Ekstra {
  _id: string;
  title: string;
  description: string;
  image_url: string;
  created_at?: string;
}

export default function EkstrakurikulerList() {
  const [data, setData] = useState<Ekstra[]>([]);
  const [editing, setEditing] = useState<Ekstra | null>(null);
  const [reloadFlag, setReloadFlag] = useState(false);

  async function fetchData() {
    const res = await fetch("/api/ekstrakurikuler");
    const json = await res.json();
    setData(json.data as Ekstra[]);
  }

  useEffect(() => {
    fetchData();
  }, [reloadFlag]);

  async function handleDelete(id: string) {
    if (!confirm("Hapus ekstrakurikuler ini?")) return;
    await fetch(`/api/ekstrakurikuler/${id}`, { method: "DELETE" });
    setReloadFlag((p) => !p);
  }

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h3 className="font-semibold text-lg">Daftar Ekstrakurikuler</h3>

      <div className="grid gap-4">
        {data.map((item) => (
          <div key={item._id} className="flex gap-4 items-start border-b pb-3">
            <div className="w-24 h-24 relative">
              <Image src={item.image_url} alt={item.title} fill className="object-cover rounded" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => setEditing(item)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="mt-4 border-t pt-4">
          <EkstrakurikulerForm
            initial={{ id: editing._id, title: editing.title, description: editing.description }}
            onSuccess={() => {
              setEditing(null);
              setReloadFlag((p) => !p);
            }}
          />
        </div>
      )}
    </div>
  );
}
