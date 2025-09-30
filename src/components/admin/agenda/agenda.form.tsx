"use client";

import { useState } from "react";
import imageCompression from "browser-image-compression";
import { supabase } from "@/lib/supabaseClient";
import { Agenda } from "./agenda.list";

interface AgendaFormProps {
  onSaved: () => void;
  editData?: Agenda;
}

export default function AgendaForm({ onSaved, editData }: AgendaFormProps) {
  const [title, setTitle] = useState(editData?.title || "");
  const [description, setDescription] = useState(editData?.description || "");
  const [createdAt, setCreatedAt] = useState(
    editData?.created_at?.split("T")[0] || ""
  );
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = editData?.image_url || null;

    if (image) {
      try {
        const options = { maxSizeMB: 0.2, maxWidthOrHeight: 1200 };
        const compressedFile = await imageCompression(image, options);

        if (compressedFile.size > 200 * 1024) {
          alert("Ukuran gambar masih lebih dari 200KB. Upload dibatalkan.");
          return;
        }

        const fileExt = image.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `agendas/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("blog-images")
          .upload(filePath, compressedFile, { upsert: true });

        if (uploadError) {
          alert("Gagal upload gambar");
          return;
        }

        imageUrl = filePath;
      } catch (err) {
        console.error("Upload gagal:", err);
        return;
      }
    }

    if (editData?.id) {
      await supabase
        .from("agendas")
        .update({
          title,
          description,
          created_at: createdAt ? new Date(createdAt).toISOString() : null,
          image_url: imageUrl,
        })
        .eq("id", editData.id);
    } else {
      await supabase.from("agendas").insert([
        {
          title,
          description,
          created_at: createdAt ? new Date(createdAt).toISOString() : null,
          image_url: imageUrl,
        },
      ]);
    }

    setTitle("");
    setDescription("");
    setCreatedAt("");
    setImage(null);
    onSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-6">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border px-3 py-2 rounded w-full"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      />
      <input
        type="date"
        value={createdAt}
        onChange={(e) => setCreatedAt(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="border px-3 py-2 rounded w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {editData ? "Update" : "Add"} Agenda
      </button>
    </form>
  );
}
