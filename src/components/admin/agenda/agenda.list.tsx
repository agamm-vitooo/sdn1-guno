"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

export interface Agenda {
  id: number;
  title: string;
  description: string;
  created_at: string;
  image_url: string | null;
}

interface AgendaListProps {
  onEdit: (agenda: Agenda) => void;
  refresh: boolean;
}

export default function AgendaList({ onEdit, refresh }: AgendaListProps) {
  const [agendas, setAgendas] = useState<Agenda[]>([]);

  useEffect(() => {
    fetchAgendas();
  }, [refresh]);

  const fetchAgendas = async () => {
    const { data } = await supabase
      .from("agendas")
      .select("*")
      .order("created_at", { ascending: true });
    setAgendas(data || []);
  };

  const handleDelete = async (id: number) => {
    await supabase.from("agendas").delete().eq("id", id);
    fetchAgendas();
  };

  return (
    <ul className="space-y-2">
      {agendas.map((agenda) => (
        <li
          key={agenda.id}
          className="border p-3 rounded flex justify-between items-center"
        >
          <div>
            <h2 className="font-bold">{agenda.title}</h2>
            <p>{agenda.description}</p>
            <p className="text-sm text-gray-500">
              {new Date(agenda.created_at).toLocaleDateString("id-ID")}
            </p>
            {agenda.image_url && (
              <div className="mt-2 w-32 relative aspect-square">
                <Image
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-images/agendas/${agenda.image_url?.split('/').pop()}`}
                  alt={agenda.title}
                  fill
                  className="rounded object-cover"
                />
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={() => onEdit(agenda)} className="text-blue-600">
              Edit
            </button>
            <button
              onClick={() => handleDelete(agenda.id)}
              className="text-red-600"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
