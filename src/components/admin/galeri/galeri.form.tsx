"use client";

import { useState } from "react";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { supabase } from "@/lib/supabaseClient";

interface GaleriData {
  id?: number;
  title: string;
  description: string;
  image_url?: string | null;
}

interface GaleriFormProps {
  onSaved: () => void;
  editData?: GaleriData;
}

export default function GaleriForm({ onSaved, editData }: GaleriFormProps) {
  const [title, setTitle] = useState(editData?.title || "");
  const [description, setDescription] = useState(editData?.description || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(editData?.image_url || null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(editData?.image_url || null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let image_url = editData?.image_url || null;

    if (imageFile) {
      const compressedFile = await imageCompression(imageFile, { maxSizeMB: 0.2 });
      if (compressedFile.size > 200 * 1024) {
        alert("Gambar terlalu besar (>200 KB) setelah kompresi!");
        setLoading(false);
        return;
      }

      const fileName = `${Date.now()}-${compressedFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("blog-images/galeri")
        .upload(fileName, compressedFile, { cacheControl: "3600", upsert: true });

      if (uploadError) {
        alert(uploadError.message);
        setLoading(false);
        return;
      }

      image_url = `blog-images/galeri/${fileName}`;
    }

    if (editData?.id) {
      await supabase.from("galeri").update({ title, description, image_url }).eq("id", editData.id);
    } else {
      await supabase.from("galeri").insert([{ title, description, image_url }]);
    }

    setTitle("");
    setDescription("");
    setImageFile(null);
    setImagePreview(null);
    setLoading(false);
    onSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Judul"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border p-2 w-full rounded"
      />
      <textarea
        placeholder="Deskripsi"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
      />

      {/* Preview Gambar menggunakan Next.js Image */}
      {imagePreview && (
        <div className="w-48 h-48 mt-2 rounded overflow-hidden border relative">
          <Image
            src={imagePreview}
            alt="Preview"
            fill
            className="object-cover"
            sizes="192px"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        {editData ? "Update" : "Tambah"}
      </button>
    </form>
  );
}
