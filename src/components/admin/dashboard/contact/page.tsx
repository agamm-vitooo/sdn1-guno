"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export default function ContactSection() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  // Ambil data kontak
  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setContacts(data || []);
    }
  };

  // Hapus data
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus pesan ini?")) return;

    setLoadingId(id);
    const { error } = await supabase.from("contacts").delete().eq("id", id);
    setLoadingId(null);

    if (error) {
      alert("Gagal menghapus pesan.");
      console.error(error);
    } else {
      setContacts((prev) => prev.filter((item) => item.id !== id));
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <section className="py-10 px-5 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Pesan Pengunjung
        </h2>

        {contacts.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada pesan.</p>
        ) : (
          <ul className="space-y-4">
            {contacts.map((item) => (
              <li
                key={item.id}
                className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-start"
              >
                <div className="flex-1 pr-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-gray-800">{item.name}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(item.created_at).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{item.message}</p>
                  <p className="text-xs text-gray-500 mt-2">{item.email}</p>
                </div>

                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={loadingId === item.id}
                  className={`text-red-600 hover:text-red-800 font-semibold text-sm px-2 ${
                    loadingId === item.id ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loadingId === item.id ? "..." : "Hapus"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
