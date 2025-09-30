"use client";

import { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

interface PengumumanData {
  id?: number;
  title: string;
  description?: string;
  date: string;
  image_url?: string | null;
}

interface PengumumanFormProps {
  onSaved: () => void;
  editData?: PengumumanData | null;
}

export default function PengumumanForm({
  onSaved,
  editData,
}: PengumumanFormProps) {
  const [title, setTitle] = useState(editData?.title || "");
  const [description, setDescription] = useState(editData?.description || "");
  const [date, setDate] = useState(editData?.date || "");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    editData?.image_url || null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle(editData?.title || "");
    setDescription(editData?.description || "");
    setDate(editData?.date || "");
    setPreview(editData?.image_url || null);
    setFile(null);
  }, [editData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f) {
      setPreview(URL.createObjectURL(f));
    } else {
      setPreview(editData?.image_url || null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = editData?.image_url || null;

    if (file) {
      try {
        // compress image - target 0.2 MB
        const options = {
          maxSizeMB: 0.2,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);

        // validasi ukuran hasil kompres
        if (compressedFile.size > 200 * 1024) {
          alert("Ukuran gambar masih > 200 KB setelah kompresi. Upload dibatalkan.");
          setLoading(false);
          return;
        }

        // buat nama file unik
        const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
        const filename = `pengumuman-${Date.now()}.${ext}`;
        const filePath = `pengumuman/${filename}`;

        // upload ke bucket 'blog-images'
        const { error: uploadError } = await supabase.storage
          .from("blog-images")
          .upload(filePath, compressedFile as Blob, { upsert: true });

        if (uploadError) {
          console.error("Upload error:", uploadError);
          alert("Gagal upload gambar.");
          setLoading(false);
          return;
        }

        // dapatkan public url (jika bucket public)
        const { data: publicData } = supabase.storage
          .from("blog-images")
          .getPublicUrl(filePath);

        imageUrl = publicData?.publicUrl || filePath;
      } catch (err) {
        console.error("Error kompres/upload:", err);
        alert("Terjadi kesalahan saat proses gambar.");
        setLoading(false);
        return;
      }
    }

    try {
      if (editData?.id) {
        await supabase
          .from("pengumuman")
          .update({ title, description, date, image_url: imageUrl })
          .eq("id", editData.id);
      } else {
        await supabase
          .from("pengumuman")
          .insert([{ title, description, date, image_url: imageUrl }]);
      }
      // reset form
      setTitle("");
      setDescription("");
      setDate("");
      setFile(null);
      setPreview(null);
      onSaved();
    } catch (err) {
      console.error("DB error:", err);
      alert("Gagal menyimpan pengumuman.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      <input
        type="text"
        placeholder="Judul"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border px-3 py-2 rounded w-full"
        required
      />
      <textarea
        placeholder="Deskripsi"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border px-3 py-2 rounded w-full"
        required
      />

      <div>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && (
          <div className="mt-2">
            <p className="text-sm text-gray-500">Preview:</p>
            <div className="relative w-40 h-40 mt-1">
              <Image
                src={preview}
                alt="preview"
                fill
                className="rounded object-cover"
              />
            </div>
          </div>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading
            ? "Menyimpan..."
            : editData?.id
            ? "Update Pengumuman"
            : "Tambah Pengumuman"}
        </button>
      </div>
    </form>
  );
}
