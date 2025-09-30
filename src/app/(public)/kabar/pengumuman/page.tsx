import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

interface Pengumuman {
  id: number;
  title: string;
  description: string;
  date: string;
  image_url?: string | null;
}

export default async function PengumumanPublicPage() {
  const { data: items } = await supabase
    .from("pengumuman")
    .select("*")
    .order("date", { ascending: true });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Pengumuman</h1>

      <ul className="space-y-4">
        {items?.map((it: Pengumuman) => {
          const imgSrc = it.image_url?.startsWith("http")
            ? it.image_url
            : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-images/${it.image_url}`;

          return (
            <li key={it.id} className="border p-4 rounded shadow-sm">
              <h2 className="font-semibold text-xl">{it.title}</h2>
              <p className="text-gray-700">{it.description}</p>
              <p className="text-sm text-gray-500 mt-1">{it.date}</p>

              {it.image_url && (
                <div className="mt-2">
                  <Image
                    src={imgSrc}
                    alt={it.title}
                    width={256} // w-64
                    height={256}
                    className="rounded object-cover"
                  />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
