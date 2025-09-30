"use client";

import GaleriForm from "@/components/admin/galeri/galeri.form";
import GaleriList from "@/components/admin/galeri/galeri.list";

export default function GaleriAdminPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Kelola Galeri</h1>
      <GaleriForm onSaved={() => window.location.reload()} />
      <GaleriList />
    </div>
  );
}
