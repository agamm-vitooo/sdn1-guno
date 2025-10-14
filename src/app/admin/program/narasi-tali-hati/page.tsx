"use client";
import { useState } from "react";
import FormNarasi from "../../../../components/admin/program-unggulan/narasi-tali-hati/narasi-tali-hati.form";
import ListNarasi from "../../../../components/admin/program-unggulan/narasi-tali-hati/narasi-tali-hati.list";

interface NarasiTaliHati {
  id?: number;
  title: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export default function AdminNarasiTaliHatiPage() {
  const [refresh, setRefresh] = useState(false);
  const [editItem, setEditItem] = useState<NarasiTaliHati | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-3xl mx-auto">
        <FormNarasi
          onSuccess={() => {
            setEditItem(null);
            setRefresh(!refresh);
          }}
          editItem={editItem}
        />
        <ListNarasi
          onEdit={(item: NarasiTaliHati) => setEditItem(item)}
          refresh={refresh}
        />
      </div>
    </div>
  );
}
