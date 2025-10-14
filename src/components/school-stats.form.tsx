"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface SchoolStats {
  id?: string;
  guru: number;
  siswa: number;
}

export default function SchoolStatsForm() {
  const [form, setForm] = useState<SchoolStats>({
    guru: 0,
    siswa: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("[INIT] Mounting component, fetching initial stats...");
    fetchStats();
  }, []);

  const fetchStats = async () => {
    console.log("[FETCH] Getting data from Supabase...");
    const { data, error } = await supabase
      .from("school_stats")
      .select("*")
      .limit(1)
      .single();

    if (error) {
      console.error("[FETCH ERROR]", error);
    } else {
      console.log("[FETCH SUCCESS]", data);
      setForm(data);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`[CHANGE] ${name}: ${value}`);
    setForm((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("[SUBMIT] Form data before submit:", form);

    const { id, ...payload } = form;
    try {
      if (id) {
        console.log("[UPDATE] Updating record with id:", id);
        const { error } = await supabase.from("school_stats").update(payload).eq("id", id);
        if (error) throw error;
        console.log("[UPDATE SUCCESS]");
      } else {
        console.log("[INSERT] Inserting new record:", payload);
        const { error } = await supabase.from("school_stats").insert(payload);
        if (error) throw error;
        console.log("[INSERT SUCCESS]");
      }

      alert("Data berhasil disimpan!");
    } catch (error) {
      console.error("[SUBMIT ERROR]", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setLoading(false);
      console.log("[SUBMIT DONE]");
      fetchStats(); // refresh data
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Statistik Sekolah</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Jumlah Guru</label>
          <input
            type="number"
            name="guru"
            value={form.guru}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Jumlah Murid</label>
          <input
            type="number"
            name="siswa"
            value={form.siswa}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}
