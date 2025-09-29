"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Agenda {
  id: number;
  title: string;
  description: string;
  date: string;
}

export default function AgendaAdmin() {
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchAgendas();
  }, []);

  const fetchAgendas = async () => {
    const { data } = await supabase.from("agendas").select("*").order("date", { ascending: true });
    setAgendas(data || []);
  };

  const handleSubmit = async () => {
    if (editingId) {
      await supabase
        .from("agendas")
        .update({ title, description, date })
        .eq("id", editingId);
      setEditingId(null);
    } else {
      await supabase.from("agendas").insert([{ title, description, date }]);
    }
    setTitle("");
    setDescription("");
    setDate("");
    fetchAgendas();
  };

  const handleEdit = (agenda: Agenda) => {
    setTitle(agenda.title);
    setDescription(agenda.description);
    setDate(agenda.date);
    setEditingId(agenda.id);
  };

  const handleDelete = async (id: number) => {
    await supabase.from("agendas").delete().eq("id", id);
    fetchAgendas();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Agenda</h1>

      <div className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update" : "Add"} Agenda
        </button>
      </div>

      <ul className="space-y-2">
        {agendas.map((agenda) => (
          <li key={agenda.id} className="border p-3 rounded flex justify-between items-center">
            <div>
              <h2 className="font-bold">{agenda.title}</h2>
              <p>{agenda.description}</p>
              <p className="text-sm text-gray-500">{agenda.date}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(agenda)} className="text-blue-600">Edit</button>
              <button onClick={() => handleDelete(agenda.id)} className="text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
