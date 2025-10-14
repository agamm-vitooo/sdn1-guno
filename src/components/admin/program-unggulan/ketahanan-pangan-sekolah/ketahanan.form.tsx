"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Ketahanan {
  id?: number;
  title: string;
  description: string;
}

export default function FormKetahanan({
  onSuccess,
  editItem,
}: {
  onSuccess: () => void;
  editItem?: Ketahanan | null;
}) {
  const [form, setForm] = useState<Ketahanan>({ title: "", description: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editItem) setForm(editItem);
  }, [editItem]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Batasi hanya 1 data
    const { data: existing } = await supabase.from("ketahanan_pangan_sekolah").select("id");
    if (!editItem && existing && existing.length >= 1) {
      alert("Hanya boleh ada 1 data Ketahanan Pangan Sekolah.");
      setLoading(false);
      return;
    }

    if (editItem) {
      await supabase
        .from("ketahanan_pangan_sekolah")
        .update({
          title: form.title,
          description: form.description,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editItem.id);
    } else {
      await supabase
        .from("ketahanan_pangan_sekolah")
        .insert([{ title: form.title, description: form.description }]);
    }

    setForm({ title: "", description: "" });
    onSuccess();
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold">Ketahanan Pangan Sekolah</h2>

      <input
        type="text"
        placeholder="Judul"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
        className="border w-full p-2 rounded"
      />

      <textarea
        placeholder="Deskripsi"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="border w-full p-2 rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Menyimpan..." : editItem ? "Update" : "Simpan"}
      </button>
    </form>
  );
}
