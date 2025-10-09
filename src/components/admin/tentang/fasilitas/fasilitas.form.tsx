"use client";
import { useState } from "react";

export default function FasilitasForm({ onSuccess }: { onSuccess: () => void }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !image) return alert("Lengkapi semua field!");
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);

    const res = await fetch("/api/fasilitas", { method: "POST", body: formData });
    const data = await res.json();
    setLoading(false);

    if (data.success) {
      setTitle("");
      setImage(null);
      onSuccess();
    } else alert("Gagal menyimpan!");
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="text-lg font-semibold">Tambah Fasilitas</h2>
      <input
        type="text"
        placeholder="Judul fasilitas"
        className="w-full border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Menyimpan..." : "Simpan"}
      </button>
    </form>
  );
}
