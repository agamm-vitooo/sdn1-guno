"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface SchoolStats {
  teachers: number;
  students: number;
  extracurriculars: number;
}

interface DebugData {
  supabase: { guru?: number; siswa?: number } | null;
  api: { extracurriculars?: number } | null;
}

export default function SchoolStatsDisplay() {
  const [stats, setStats] = useState<SchoolStats | null>(null);
  const [debug, setDebug] = useState<DebugData>({ supabase: null, api: null });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log("[DEBUG] Fetching Supabase data...");
        const { data, error } = await supabase
          .from("school_stats")
          .select("guru, siswa")
          .limit(1)
          .single();

        if (error) console.error("[Supabase ERROR]", error);
        console.log("[Supabase DATA]", data);

        console.log("[DEBUG] Fetching API data...");
        const res = await fetch("/api/school-stats");
        const extraData = await res.json();
        console.log("[API DATA]", extraData);

        setDebug({ supabase: data, api: extraData });

        setStats({
          teachers: data?.guru || 0,
          students: data?.siswa || 0,
          extracurriculars: extraData?.extracurriculars || 0,
        });
      } catch (err) {
        console.error("[FETCH ERROR]", err);
      }
    };

    fetchStats();
  }, []);

  if (!stats)
    return (
      <div className="flex flex-col items-center mt-10 text-white/70">
        <p>Memuat data statistik sekolah...</p>
        <pre className="text-xs mt-2 bg-black/20 p-2 rounded">
          {JSON.stringify(debug, null, 2)}
        </pre>
      </div>
    );

  const items = [
    { label: "Guru", value: stats.teachers },
    { label: "Murid", value: stats.students },
    { label: "Ekstrakurikuler", value: stats.extracurriculars },
  ];

  return (
    <div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        {items.map((item) => (
          <div
            key={item.label}
            className="backdrop-blur-sm bg-white/10 rounded-xl p-6 border border-white/20"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-yellow-400">
              {item.value.toLocaleString("id-ID")}
            </h3>
            <p className="text-gray-200 mt-2 font-medium">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
