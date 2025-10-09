"use client";
import { useState } from "react";
import FasilitasForm from "@/components/admin/tentang/fasilitas/fasilitas.form";
import FasilitasList from "@/components/admin/tentang/fasilitas/fasilitas.list";

export default function FasilitasAdminPage() {
  const [reload, setReload] = useState(false);

  return (
    <main className="p-6 bg-gray-100 min-h-screen space-y-6">
      <FasilitasForm onSuccess={() => setReload(!reload)} />
      <FasilitasList key={reload.toString()} />
    </main>
  );
}
