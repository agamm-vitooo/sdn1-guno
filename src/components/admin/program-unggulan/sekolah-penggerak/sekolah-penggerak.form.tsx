"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// Definisikan tipe data sesuai tabel
interface SekolahPenggerak {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  editItem?: SekolahPenggerak | null;
  onSuccess: () => void;
  onCancel?: () => void;
}

export default function FormSekolahPenggerak({ editItem, onSuccess, onCancel }: Props) {
  const [title, setTitle] = useState(editItem?.title || "");
  const [description, setDescription] = useState(editItem?.description || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (editItem) {
      await supabase
        .from("sekolah_penggerak")
        .update({ title, description, updated_at: new Date() })
        .eq("id", editItem.id);
    } else {
      await supabase
        .from("sekolah_penggerak")
        .insert([{ title, description }]);
    }

    setLoading(false);
    setTitle("");
    setDescription("");
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 border rounded-lg shadow">
      <input
        type="text"
        placeholder="Judul"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        placeholder="Deskripsi"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
        rows={4}
        required
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editItem ? "Update" : "Tambah"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}
