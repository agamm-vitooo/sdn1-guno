// src/components/admin/tentang/ekstrakurikuler/ekstrakurikuler.form.tsx
"use client";
import { useState } from "react";

interface Props {
  onSuccess?: () => void;
  initial?: { title?: string; description?: string; id?: string };
}

export default function EkstrakurikulerForm({ onSuccess, initial }: Props) {
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(initial?.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return alert("Isi judul");

    console.log("💡 Submit clicked", { title, description, file, isEdit });

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (file) formData.append("image", file);

      console.log("📤 FormData prepared:", formData);

      let res: Response;
      if (isEdit && initial?.id) {
        console.log("✏️ Editing item id:", initial.id);
        res = await fetch(`/api/ekstrakurikuler/${initial.id}`, { method: "PUT", body: formData });
      } else {
        if (!file) return alert("Pilih gambar");
        console.log("➕ Creating new ekstrakurikuler");
        res = await fetch("/api/ekstrakurikuler", { method: "POST", body: formData });
      }

      const data = await res.json();
      console.log("✅ Response from API:", data);

      setTitle("");
      setDescription("");
      setFile(null);
      onSuccess?.();
    } catch (err) {
      console.error("❌ Error submitting form:", err);
      alert("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-3">
      <h3 className="font-semibold">{isEdit ? "Edit Ekstrakurikuler" : "Tambah Ekstrakurikuler"}</h3>
      <input
        type="text"
        placeholder="Judul"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
      <textarea
        placeholder="Deskripsi singkat"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        rows={4}
      />
      <input
        type="file"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0] || null;
          setFile(selectedFile);
          console.log("📂 File selected:", selectedFile);
        }}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          {loading ? (isEdit ? "Menyimpan..." : "Mengupload...") : isEdit ? "Simpan" : "Tambah"}
        </button>
      </div>
    </form>
  );
}
