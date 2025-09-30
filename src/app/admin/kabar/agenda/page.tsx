"use client";

import { useState } from "react";
import AgendaForm from "../../../../components/admin/agenda/agenda.form";
import AgendaList from "../../../../components/admin/agenda/agenda.list";

// Sesuaikan dengan struktur tabel Supabase
export interface AgendaData {
  id: number;
  title: string;
  description: string;
  date: string; // Supabase return date dalam bentuk string ISO
  image_url?: string | null;
  created_at?: string;
}

export default function AgendaAdminPage() {
  const [editingData, setEditingData] = useState<AgendaData | null>(null);
  const [refresh, setRefresh] = useState(false);

  const handleSaved = () => {
    setEditingData(null);
    setRefresh((prev) => !prev);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Agenda</h1>

      <AgendaForm
        onSaved={handleSaved}
        editData={
          editingData
            ? { ...editingData, image_url: editingData.image_url ?? null }
            : undefined
        }
      />

      <AgendaList
        onEdit={setEditingData}
        refresh={refresh}
      />
    </div>
  );
}
