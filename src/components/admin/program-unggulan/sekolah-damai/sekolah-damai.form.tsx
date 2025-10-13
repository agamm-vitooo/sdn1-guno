"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface SekolahDamai {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  editItem?: SekolahDamai | null;
  onSuccess: () => void;
  onCancel?: () => void;
}

export default function FormSekolahDamai({ editItem, onSuccess, onCancel }: Props) {
  const [title, setTitle] = useState(editItem?.title || "");
  const [description, setDescription] = useState(editItem?.description || "");
  const [loading, setLoading] = useState(false);
  const [maxReached, setMaxReached] = useState(false);

  useEffect(() => {
    const checkDataCount = async () => {
      const { count } = await supabase
        .from("sekolah_damai")
        .select("*", { count: "exact", head: true });
      if (count && count >= 1 && !editItem) setMaxReached(true);
    };
    checkDataCount();
  }, [editItem]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (maxReached && !editItem) {
      alert("Data hanya boleh 1! Silakan edit data yang ada.");
      return;
    }
    setLoading(true);

    if (editItem) {
      await supabase
        .from("sekolah_damai")
        .update({ title, description, updated_at: new Date() })
        .eq("id", editItem.id);
    } else {
      await supabase.from("sekolah_damai").insert([{ title, description }]);
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
          disabled={loading || (maxReached && !editItem)}
          className={`px-4 py-2 rounded text-white ${
            loading || (maxReached && !editItem)
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
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
      {maxReached && !editItem && (
        <p className="text-sm text-red-500">
          Hanya diperbolehkan satu data. Silakan edit data yang sudah ada.
        </p>
      )}
    </form>
  );
}
