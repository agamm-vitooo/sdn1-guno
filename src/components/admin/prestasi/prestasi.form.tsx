"use client";

import { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import { supabase } from "@/lib/supabaseClient";

interface PrestasiData {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
}

interface PrestasiFormProps {
  onSaved: () => void;
  editData?: PrestasiData;
  onClose?: () => void;
}

export default function PrestasiForm({ onSaved, editData, onClose }: PrestasiFormProps) {
  const [title, setTitle] = useState(editData?.title || "");
  const [description, setDescription] = useState(editData?.description || "");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setDescription(editData.description);
    }
  }, [editData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return alert("Judul prestasi wajib!");
    setLoading(true);
    let imageUrl = editData?.image_url || null;

    try {
      if (file) {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1024,
        });
        const fileName = `${Date.now()}-${compressedFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("blog-images")
          .upload(fileName, compressedFile, { upsert: true });
        if (uploadError) throw uploadError;

        const { data: publicUrl } = supabase.storage
          .from("blog-images")
          .getPublicUrl(fileName);
        imageUrl = publicUrl.publicUrl;
      }

      if (editData) {
        const { error } = await supabase
          .from("prestasi")
          .update({ title, description, image_url: imageUrl })
          .eq("id", editData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("prestasi")
          .insert([{ title, description, image_url: imageUrl }]);
        if (error) throw error;
      }

      setTitle("");
      setDescription("");
      setFile(null);
      onSaved();
      onClose?.();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("❌ Gagal menyimpan prestasi:", err.message);
      } else {
        console.error("❌ Gagal menyimpan prestasi:", err);
      }
      alert("Gagal menyimpan prestasi. Cek console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl p-6 bg-white shadow-md rounded-lg space-y-4"
    >
      <h2 className="text-xl font-semibold">
        {editData ? "Edit Prestasi" : "Tambah Prestasi"}
      </h2>
      <input
        type="text"
        placeholder="Judul Prestasi"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Deskripsi Prestasi"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded h-32"
      />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <div className="flex space-x-2">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading
            ? "Menyimpan..."
            : editData
            ? "Update Prestasi"
            : "Simpan Prestasi"}
        </button>
        {editData && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}
