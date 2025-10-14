"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface SchoolStats {
  teachers: number;
  students: number;
  extracurriculars: number;
}

export default function SchoolStatsDisplay() {
  const [stats, setStats] = useState<SchoolStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase
          .from("school_stats")
          .select("guru, siswa")
          .limit(1)
          .single();

        if (error) console.error("[Supabase ERROR]", error);

        const res = await fetch("/api/school-stats");
        const extraData = await res.json();

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
      <div className="inline-flex items-center gap-2 backdrop-blur-md bg-white/5 px-4 py-2 rounded-full border border-white/10">
        <div className="w-3 h-3 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-white/70 text-sm font-medium">Memuat statistik...</span>
      </div>
    );

  const items = [
    { label: "Guru", value: stats.teachers },
    { label: "Murid", value: stats.students },
    { label: "Ekstrakurikuler", value: stats.extracurriculars },
  ];

  return (
    <div className="inline-flex items-center backdrop-blur-xs rounded-2xl px-6 py-4">
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10">
        {items.map((item, index) => (
          <div key={item.label} className="flex items-center gap-6 sm:gap-8">
            {index > 0 && (
              <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
            )}
            <div className="text-center group">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-yellow-300 to-yellow-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                {item.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-100 font-semibold mt-1 tracking-wide uppercase">
                {item.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
