"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Narasi {
  id?: number;
  title: string;
  description: string;
}

export default function FormNarasi({ onSuccess, editItem }: { onSuccess: () => void; editItem?: Narasi | null }) {
  const [form, setForm] = useState<Narasi>({ title: "", description: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editItem) setForm(editItem);
  }, [editItem]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // batas 1 data (max 1)
    const { data: existing } = await supabase.from("narasi_tali_hati").select("id");
    if (!editItem && existing && existing.length >= 1) {
      alert("Hanya boleh 1 data narasi tali hati.");
      setLoading(false);
      return;
    }

    if (editItem) {
      await supabase
        .from("narasi_tali_hati")
        .update({ title: form.title, description: form.description, updated_at: new Date().toISOString() })
        .eq("id", editItem.id);
    } else {
      await supabase.from("narasi_tali_hati").insert([{ title: form.title, description: form.description }]);
    }

    setForm({ title: "", description: "" });
    onSuccess();
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold">Narasi Tali Hati</h2>
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
