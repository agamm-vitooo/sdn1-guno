"use client";

import { useState } from "react";
import AgendaForm from "../../../../components/admin/agenda/agenda.form";
import AgendaList, { Agenda } from "../../../../components/admin/agenda/agenda.list";

export default function AgendaAdminPage() {
  const [editingData, setEditingData] = useState<Agenda | null>(null);
  const [refresh, setRefresh] = useState(false);

  const handleSaved = () => {
    setEditingData(null);
    setRefresh((prev) => !prev);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Agenda</h1>

      <AgendaForm onSaved={handleSaved} editData={editingData ?? undefined} />
      <AgendaList onEdit={setEditingData} refresh={refresh} />
    </div>
  );
}
