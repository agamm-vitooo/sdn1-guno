"use client";

import { useState } from "react";
import VisiMisiForm from "@/components/admin/tentang/visi-misi/vismis.form";
import VisiMisiList from "@/components/admin/tentang/visi-misi/vismis.list";

export default function VisiMisiAdminPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshList = () => setRefreshKey((k) => k + 1);

  return (
    <section className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Admin - Visi & Misi</h1>
      <VisiMisiForm onAdded={refreshList} />
      <VisiMisiList refreshKey={refreshKey} />
    </section>
  );
}
