// app/api/visitors/landing/route.ts
import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET() {
  // ambil semua data path "/" dikelompokkan per hari
  const { data, error } = await supabase
    .from("visitors")
    .select("created_at")
    .eq("path", "/")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // kelompokkan per tanggal
  const counts: Record<string, number> = {};
  data?.forEach((v) => {
    const date = new Date(v.created_at).toISOString().split("T")[0];
    counts[date] = (counts[date] || 0) + 1;
  });

  return NextResponse.json(counts);
}
