"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import PrestasiForm from "../../../../components/admin/prestasi/prestasi.form";
import PrestasiList from "../../../../components/admin/prestasi/prestasi.list";

interface PrestasiData {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
}

export default function AdminPrestasiPage() {
  const [prestasis, setPrestasis] = useState<PrestasiData[]>([]);

  const fetchPrestasi = async () => {
    const { data, error } = await supabase.from("prestasi").select("*").order("created_at", { ascending: false });
    if (error) return console.error(error);
    setPrestasis(data);
  };

  useEffect(() => { fetchPrestasi(); }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Prestasi</h1>
      <PrestasiForm onSaved={fetchPrestasi} />
      <PrestasiList prestasis={prestasis} refresh={fetchPrestasi} />
    </div>
  );
}
