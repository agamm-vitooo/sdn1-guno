"use client";
import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";

interface Sejarah {
  _id?: string;
  title?: string;
  description?: string;
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
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Isi data saat edit
  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title || "");
      setDescription(editItem.description || "");
      setPreview(editItem.image_url || "");
    } else {
      setTitle("");
      setDescription("");
      setFile(null);
      setPreview("");
    }
  }, [editItem]);

  // Preview gambar
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview("");
    }
  };

  // Submit ke backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return alert("Lengkapi semua field!");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (file) formData.append("file", file);

      const url = editItem ? `/api/sejarah/${editItem._id}` : "/api/sejarah";
      const method = editItem ? "PUT" : "POST";

      const res = await fetch(url, { method, body: formData });
      const data = await res.json();

      if (!res.ok || !data.success) throw new Error(data.message || "Gagal menyimpan");

      // Reset
      setTitle("");
      setDescription("");
      setFile(null);
      setPreview("");
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan. Lihat console log.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="text-lg font-semibold">{editItem ? "Edit Sejarah" : "Tambah Sejarah"}</h2>

      <input
        type="text"
        placeholder="Judul sejarah"
        className="w-full border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Deskripsi sejarah"
        className="w-full border p-2 rounded"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <div>
        <label className="block mb-1 font-medium">Gambar</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && (
          <div className="relative mt-3 w-full max-h-64 h-64 overflow-hidden border rounded">
            <Image src={preview} alt="Preview" fill className="object-cover" />
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Menyimpan..." : editItem ? "Simpan Perubahan" : "Simpan"}
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
