import { supabase } from "@/lib/supabaseClient";

export const revalidate = 60; // optional: cache 1 menit

export default async function SekolahPenggerakPage() {
  const { data } = await supabase.from("sekolah_penggerak").select("*").order("created_at", { ascending: false });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Sekolah Penggerak</h1>
      {data?.length ? (
        data.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg mb-4 shadow">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="mt-2 text-gray-700">{item.description}</p>
            <p className="text-sm text-gray-500 mt-1">
              Diperbarui: {new Date(item.updated_at).toLocaleString("id-ID")}
            </p>
          </div>
        ))
      ) : (
        <p>Tidak ada data.</p>
      )}
    </div>
  );
}
