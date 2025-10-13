"use client";
import { useState } from "react";
import FormSekolahDamai from "../../../../components/admin/program-unggulan/sekolah-damai/sekolah-damai.form";
import ListSekolahDamai from "../../../../components/admin/program-unggulan/sekolah-damai/sekolah-damai.list";

interface SekolahDamai {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export default function AdminSekolahDamaiPage() {
  const [refresh, setRefresh] = useState(false);
  const [editItem, setEditItem] = useState<SekolahDamai | null>(null);

  const handleSuccess = () => {
    setEditItem(null);
    setRefresh(!refresh);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manajemen Sekolah Damai</h1>
      <FormSekolahDamai
        editItem={editItem}
        onSuccess={handleSuccess}
        onCancel={() => setEditItem(null)}
      />
      <ListSekolahDamai onEdit={setEditItem} onRefreshTrigger={refresh} />
    </div>
  );
}
