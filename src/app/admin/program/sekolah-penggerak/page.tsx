"use client";
import { useState } from "react";
import FormSekolahPenggerak from "../../../../components/admin/program-unggulan/sekolah-penggerak/sekolah-penggerak.form";
import ListSekolahPenggerak from "../../../../components/admin/program-unggulan/sekolah-penggerak/sekolah-penggerak.list";

// Definisikan tipe data sesuai tabel
interface SekolahPenggerak {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export default function AdminSekolahPenggerakPage() {
  const [refresh, setRefresh] = useState(false);
  const [editItem, setEditItem] = useState<SekolahPenggerak | null>(null);

  const handleSuccess = () => {
    setEditItem(null);
    setRefresh(!refresh);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manajemen Sekolah Penggerak</h1>
      <FormSekolahPenggerak
        editItem={editItem}
        onSuccess={handleSuccess}
        onCancel={() => setEditItem(null)}
      />
      <ListSekolahPenggerak onEdit={setEditItem} onRefreshTrigger={refresh} />
    </div>
  );
}
