"use client";

import { useState, useEffect } from "react";
import SejarahForm from "@/components/admin/tentang/sejarah/sejarah.form";

interface Sejarah {
  _id: string;
  title: string;
  description: string;
  image_url?: string;
}

export default function AdminSejarahPage() {
  const [editItem, setEditItem] = useState<Sejarah | null>(null);
  const [items, setItems] = useState<Sejarah[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/sejarah");
      const data = await res.json();
      if (data.success) {
        setItems(data.data);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    setEditItem(null);
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus?")) return;
    
    try {
      const res = await fetch(`/api/sejarah/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchItems();
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Kelola Sejarah</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div>
          <h2 className="font-semibold mb-3">
            {editItem ? "Edit Sejarah" : "Tambah Sejarah"}
          </h2>
          <SejarahForm
            editItem={editItem}
            onSuccess={handleSuccess}
            onCancel={() => setEditItem(null)}
          />
        </div>

        {/* List */}
        <div>
          <h2 className="font-semibold mb-3">Daftar Sejarah</h2>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item._id} className="border p-4 rounded">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => setEditItem(item)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}