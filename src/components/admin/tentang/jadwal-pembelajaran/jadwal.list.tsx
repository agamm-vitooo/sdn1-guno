"use client";

import { useEffect, useState } from "react";
import Image from "next/image"; // import Image dari next/image

interface Jadwal {
  _id: string;
  image_url: string;
  created_at: string;
}

export default function JadwalList() {
  const [data, setData] = useState<Jadwal[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const getData = async () => {
    const res = await fetch("/api/jadwal_pembelajaran");
    const json = await res.json();
    setData(json.data);
  };

  useEffect(() => { getData(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus data ini?")) return;
    await fetch(`/api/jadwal_pembelajaran/${id}`, { method: "DELETE" });
    getData();
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !editId) return;
    const formData = new FormData();
    formData.append("file", file);
    await fetch(`/api/jadwal_pembelajaran/${editId}`, { method: "PUT", body: formData });
    setEditId(null);
    setFile(null);
    getData();
  };

  return (
    <div className="grid gap-4 mt-4">
      {data.map((item) => (
        <div key={item._id} className="border p-4 rounded">
          <div className="w-40 h-40 relative">
            <Image
              src={item.image_url}
              alt="jadwal"
              fill
              className="object-cover rounded"
              sizes="160px"
            />
          </div>
          <div className="flex gap-2 mt-2">
            <button onClick={() => setEditId(item._id)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
            <button onClick={() => handleDelete(item._id)} className="bg-red-600 text-white px-3 py-1 rounded">Hapus</button>
          </div>
          {editId === item._id && (
            <form onSubmit={handleUpdate} className="mt-3 flex flex-col gap-2">
              <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Simpan</button>
            </form>
          )}
        </div>
      ))}
    </div>
  );
}
