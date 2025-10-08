"use client";
import { useState } from "react";

interface Props {
  onSuccess?: () => void;
}

export default function JadwalForm({ onSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return alert("Pilih gambar");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    await fetch("/api/jadwal_pembelajaran", { method: "POST", body: formData });
    setLoading(false);
    setFile(null);
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 border p-4 rounded">
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button type="submit" disabled={loading} className="bg-blue-600 text-white py-1 px-3 rounded">
        {loading ? "Mengupload..." : "Upload Jadwal"}
      </button>
    </form>
  );
}
