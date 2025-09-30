"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import PrestasiForm from "./prestasi.form";

interface PrestasiData {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
}

interface PrestasiListProps {
  prestasis: PrestasiData[];
  refresh: () => void;
}

export default function PrestasiList({ prestasis, refresh }: PrestasiListProps) {
  const [editData, setEditData] = useState<PrestasiData | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus prestasi ini?")) return;
    const { error } = await supabase.from("prestasi").delete().eq("id", id);
    if (error) return alert(error.message);
    refresh();
  };

  return (
    <div>
      {editData && <PrestasiForm editData={editData} onSaved={() => { setEditData(null); refresh(); }} onClose={() => setEditData(null)} />}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {prestasis.map((p) => (
          <div key={p.id} className="border rounded p-4 shadow">
            {p.image_url && <img src={p.image_url} alt={p.title} className="w-full h-48 object-cover rounded mb-2" />}
            <h2 className="font-bold">{p.title}</h2>
            <p className="text-sm mb-2">{p.description}</p>
            <div className="flex space-x-2">
              <button onClick={() => setEditData(p)} className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
              <button onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
