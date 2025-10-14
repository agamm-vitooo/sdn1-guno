"use client";
import { useState } from "react";
import FormKetahanan from "../../../../components/admin/program-unggulan/ketahanan-pangan-sekolah/ketahanan.form";
import ListKetahanan from "../../../../components/admin/program-unggulan/ketahanan-pangan-sekolah/ketahanan.list";

interface KetahananPangan {
  id?: number;
  title: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export default function AdminKetahananPanganSekolahPage() {
  const [refresh, setRefresh] = useState(false);
  const [editItem, setEditItem] = useState<KetahananPangan | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-50 p-6">
      <div className="max-w-3xl mx-auto">
        <FormKetahanan
          onSuccess={() => {
            setEditItem(null);
            setRefresh(!refresh);
          }}
          editItem={editItem}
        />

        <ListKetahanan
          onEdit={(item: KetahananPangan) => setEditItem(item)}
          refresh={refresh}
        />
      </div>
    </div>
  );
}
