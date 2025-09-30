"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

interface Pengumuman {
  id: number;
  title: string;
  description?: string;
  date: string;
  image_url?: string | null;
}

interface PengumumanListProps {
  onEdit: (item: Pengumuman) => void;
  refreshFlag: boolean;
}

export default function PengumumanList({ onEdit, refreshFlag }: PengumumanListProps) {
  const [items, setItems] = useState<Pengumuman[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [refreshFlag]);

  const fetchItems = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("pengumuman")
      .select("*")
      .order("date", { ascending: true });
    setItems(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus pengumuman ini?")) return;
    await supabase.from("pengumuman").delete().eq("id", id);
    fetchItems();
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      <ul className="space-y-3">
        {items.map((it) => (
          <li key={it.id} className="border p-3 rounded flex gap-4">
            <div className="flex-1">
              <h3 className="font-semibold">{it.title}</h3>
              <p className="text-sm text-gray-600">{it.description}</p>
              <p className="text-xs text-gray-500 mt-1">{it.date}</p>
              {it.image_url && (
                <Image
                  src={it.image_url}
                  alt={it.title}
                  width={144}
                  height={100}
                  className="mt-2 rounded"
                />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <button onClick={() => onEdit(it)} className="text-blue-600">Edit</button>
              <button onClick={() => handleDelete(it.id)} className="text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
