"use client";

import Image from "next/image";
import { useState, useEffect, ChangeEvent } from "react";

// tipe data untuk item sejarah
interface Sejarah {
  _id?: string;
  title: string;
  description: string;
  image_url?: string;
}

interface Props {
  editItem?: Sejarah | null;
  onSuccess: () => void;
  onCancel?: () => void;
}

export default function SejarahForm({ editItem, onSuccess, onCancel }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title || "");
      setDescription(editItem.description || "");
      setImageUrl(editItem.image_url || "");
    } else {
      setTitle("");
      setDescription("");
      setImageUrl("");
    }
  }, [editItem]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD!}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      if (data.secure_url) {
        setImageUrl(data.secure_url);
      } else {
        alert("Gagal upload gambar");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat upload gambar");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const body = JSON.stringify({
        title,
        description,
        image_url: imageUrl,
      });

      const res = await fetch(
        editItem ? `/api/sejarah/${editItem._id}` : `/api/sejarah`,
        {
          method: editItem ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body,
        }
      );

      if (!res.ok) throw new Error("Gagal menyimpan data");
      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Judul sejarah"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border w-full p-2 rounded"
        required
      />
      <textarea
        placeholder="Deskripsi sejarah"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border w-full p-2 rounded"
        rows={5}
        required
      />

      {/* upload gambar */}
      <div>
        <label className="block font-medium mb-1">Gambar</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border p-2 w-full rounded"
        />
        {uploading && <p className="text-sm text-gray-500 mt-1">Mengupload...</p>}

        {imageUrl && (
          <div className="relative mt-3 w-full max-h-64 h-64">
            <Image
              src={imageUrl}
              alt="Preview"
              fill
              className="object-cover rounded border"
            />
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Menyimpan..." : editItem ? "Simpan Perubahan" : "Tambah"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}
