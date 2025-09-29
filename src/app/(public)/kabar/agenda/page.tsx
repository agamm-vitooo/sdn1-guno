import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function AgendaPage() {
  const { data: agendas } = await supabase
    .from("agendas")
    .select("*")
    .order("date", { ascending: true });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Agenda</h1>
      <ul className="space-y-4">
        {agendas?.map((agenda) => (
          <li key={agenda.id} className="border p-4 rounded shadow-sm">
            <h2 className="font-semibold text-xl">{agenda.title}</h2>
            <p className="text-gray-700">{agenda.description}</p>
            <p className="text-sm text-gray-500 mt-1">{agenda.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
