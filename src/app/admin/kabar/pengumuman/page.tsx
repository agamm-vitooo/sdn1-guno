"use client";

import { useState } from "react";
import PengumumanForm from "../../../../components/admin/pengumuman/pengumuman.form";
import PengumumanList from "../../../../components/admin/pengumuman/pengumuman.list";

// Definisikan tipe data pengumuman
export interface PengumumanData {
  id: number;
  title: string;
  description: string;
  date: string;
  image_url?: string | null;
  created_at?: string;
}

export default function PengumumanAdminPage() {
  const [editing, setEditing] = useState<PengumumanData | null>(null);
  const [flag, setFlag] = useState(false);

  const onSaved = () => {
    setEditing(null);
    setFlag((f) => !f);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Pengumuman</h1>

      <PengumumanForm onSaved={onSaved} editData={editing || undefined} />
      <PengumumanList
        onEdit={(item) =>
          setEditing({
            ...item,
            description: item.description ?? "", // fallback jadi string kosong
            image_url: item.image_url ?? null,   // samakan tipe
          })
        }
        refreshFlag={flag}
      />
    </div>
  );
}
