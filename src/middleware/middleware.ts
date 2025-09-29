// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;

  // Ambil IP dari header (x-forwarded-for atau x-real-ip)
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  try {
    await supabase.from("visitors").insert([
      {
        path: url,
        user_agent: req.headers.get("user-agent"),
        ip_address: ip,
        created_at: new Date().toISOString(), // supaya aman kalau Supabase pakai timestamptz
      },
    ]);
  } catch (error) {
    console.error("Failed to log visitor:", error);
  }

  return NextResponse.next();
}

// Jalankan di semua route publik
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|admin).*)"],
};
