"use client";
import JadwalForm from "../../../../components/admin/tentang/jadwal-pembelajaran/jadwal.form";
import JadwalList from "../../../../components/admin/tentang/jadwal-pembelajaran/jadwal.list";

export default function AdminJadwalPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Kelola Jadwal Pembelajaran</h1>
      <JadwalForm onSuccess={() => window.location.reload()} />
      <JadwalList />
    </div>
  );
}
