"use client";
import { useState } from "react";
import FormSekolahRamahAnak from "../../../../components/admin/program-unggulan/sekolah-ramah-anak/ramah-anak.form";
import ListSekolahRamahAnak from "../../../../components/admin/program-unggulan/sekolah-ramah-anak/ramah-anak.list";

interface SekolahRamahAnak {
  id?: string;
  title: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export default function AdminSekolahRamahAnakPage() {
  const [refresh, setRefresh] = useState(false);
  const [editItem, setEditItem] = useState<SekolahRamahAnak | null>(null);

  const handleSuccess = () => {
    setEditItem(null);
    setRefresh(!refresh);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manajemen Sekolah Ramah Anak</h1>
      <FormSekolahRamahAnak
        editItem={editItem}
        onSuccess={handleSuccess}
        onCancel={() => setEditItem(null)}
      />
      <ListSekolahRamahAnak
        onEdit={(item: SekolahRamahAnak) => setEditItem(item)}
        onRefreshTrigger={refresh}
      />
    </div>
  );
}
