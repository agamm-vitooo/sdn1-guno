"use client";

import { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface BlogData {
  id: number;
  title: string;
  content: string;
  image_url: string | null;
}

interface BlogFormProps {
  onAdded: () => void;
  editData?: BlogData;
  onClose?: () => void;
}

export default function BlogForm({ onAdded, editData, onClose }: BlogFormProps) {
  const [title, setTitle] = useState(editData?.title || "");
  const [content, setContent] = useState(editData?.content || "");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setContent(editData.content);
    }
  }, [editData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = editData?.image_url || null;

    try {
      if (file) {
        // 🔹 Kompres otomatis dengan target maksimal 200 KB
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.2, // 200 KB
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        });

        console.log(
          `📦 Before: ${(file.size / 1024).toFixed(1)} KB | After: ${(compressedFile.size / 1024).toFixed(1)} KB`
        );

        // 🔹 Validasi setelah kompres
        if (compressedFile.size > 200 * 1024) {
          alert("Ukuran gambar masih lebih dari 200 KB setelah dikompres. Gunakan gambar lain.");
          setLoading(false);
          return;
        }

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
          .from("blogs")
          .update({ title, content, image_url: imageUrl })
          .eq("id", editData.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("blogs").insert([
          {
            title,
            content,
            image_url: imageUrl,
          },
        ]);

        if (error) throw error;
      }

      setTitle("");
      setContent("");
      setFile(null);
      onAdded();
      onClose?.();
    } catch (err) {
      console.error("❌ Gagal menyimpan artikel:", err);
      alert("Gagal menyimpan artikel. Cek console untuk detail.");
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
        {editData ? "Edit Artikel" : "Tambah Artikel Baru"}
      </h2>

      <input
        type="text"
        placeholder="Judul Artikel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />

      <textarea
        placeholder="Isi Artikel"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="w-full p-2 border rounded h-40"
      />

      <input type="file" accept="image/*" onChange={handleFileChange} />

      <div className="flex space-x-2">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {loading ? "Menyimpan..." : editData ? "Update Artikel" : "Simpan Artikel"}
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
