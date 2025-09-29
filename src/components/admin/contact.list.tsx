"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

interface ContactListProps {
  setSelectedContact: (c: Contact | null) => void;
  refreshTrigger: number;
}

export default function ContactList({ setSelectedContact, refreshTrigger }: ContactListProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    fetchContacts();
  }, [refreshTrigger]);

  const fetchContacts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error(error);
    else setContacts(data as Contact[]);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus pesan ini?")) return;
    const { error } = await supabase.from("contacts").delete().eq("id", id);
    if (error) console.error(error);
    fetchContacts();
  };

  const filteredContacts = filterDate
    ? contacts.filter((c) => c.created_at.startsWith(filterDate))
    : contacts;

  return (
    <div>
      {/* Filter Tanggal */}
      <div className="mb-4 flex items-center gap-3">
        <label className="font-medium">Filter tanggal:</label>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg"
        />
        {filterDate && (
          <button
            onClick={() => setFilterDate("")}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
          >
            Reset
          </button>
        )}
      </div>

      {/* Tabel Data */}
      {loading ? (
        <p>Memuat data...</p>
      ) : filteredContacts.length === 0 ? (
        <p className="text-gray-600">Tidak ada pesan.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 border-b">Nama</th>
                <th className="p-4 border-b">Email</th>
                <th className="p-4 border-b">Pesan</th>
                <th className="p-4 border-b">Tanggal</th>
                <th className="p-4 border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="p-4 border-b">{c.name}</td>
                  <td className="p-4 border-b">{c.email}</td>
                  <td className="p-4 border-b">{c.message}</td>
                  <td className="p-4 border-b">
                    {new Date(c.created_at).toLocaleString("id-ID")}
                  </td>
                  <td className="p-4 border-b flex gap-2">
                    <button
                      onClick={() => setSelectedContact(c)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
