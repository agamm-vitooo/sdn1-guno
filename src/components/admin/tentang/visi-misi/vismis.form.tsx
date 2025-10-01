"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function VisiMisiForm({ onAdded }: { onAdded: () => void }) {
  const [type, setType] = useState("visi");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return alert("Isi tidak boleh kosong");

    const { error } = await supabase.from("visi_misi").insert([{ type, content }]);
    if (error) {
      alert(error.message);
    } else {
      setContent("");
      onAdded(); // refresh list
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg bg-white shadow">
      <h2 className="font-bold text-lg mb-2">Tambah Visi/Misi</h2>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      >
        <option value="visi">Visi</option>
        <option value="misi">Misi</option>
      </select>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tulis isi..."
        className="border p-2 w-full mb-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Simpan
      </button>
    </form>
  );
}
