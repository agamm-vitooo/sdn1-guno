// src/app/(admin)/dashboard/ekstrakurikuler/page.tsx
"use client";
import { useState } from "react";
import EkstrakurikulerForm from "@/components/admin/tentang/ekstrakurikuler/ekstrakurikuler.form";
import EkstrakurikulerList from "@/components/admin/tentang/ekstrakurikuler/ekstrakurikuler.list";

export default function EkstraAdminPage() {
  const [refreshKey, setRefreshKey] = useState(false);

  return (
    <main className="p-6 bg-gray-100 min-h-screen space-y-6">
      <h1 className="text-2xl font-bold">Kelola Ekstrakurikuler</h1>
      <EkstrakurikulerForm onSuccess={() => setRefreshKey((p) => !p)} />
      <EkstrakurikulerList key={String(refreshKey)} />
    </main>
  );
}
