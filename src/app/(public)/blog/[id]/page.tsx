import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Blog {
  id: number;
  title: string;
  content: string;
  image_url: string | null;
  created_at?: string | null;
}

export default async function BlogDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  // cast id ke number supaya cocok dengan tipe bigint
  const blogId = Number(id);

  // fetch blog berdasarkan id
  const { data: blog, error } = await supabase
    .from<Blog>("blogs")
    .select("*")
    .eq("id", blogId)
    .single();

  if (error || !blog) {
    console.error("❌ Gagal fetch blog:", error?.message);
    notFound(); // halaman 404 jika blog tidak ditemukan
  }

  return (
    <section className="max-w-4xl mx-auto p-6">
      {/* Judul */}
      <h1 className="text-3xl font-bold mb-2">
        {blog.title || "Judul tidak tersedia"}
      </h1>

      {/* Tanggal dibuat */}
      {blog.created_at && (
        <p className="text-sm text-gray-500 mb-4">
          {new Date(blog.created_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      )}

      {/* Gambar */}
      {blog.image_url && (
        <div className="relative w-full h-96 mb-6 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={blog.image_url}
            alt={blog.title}
            fill
            className="object-cover w-full h-full"
          />
        </div>
      )}

      {/* Konten */}
      <p className="text-gray-700 text-lg whitespace-pre-line leading-relaxed">
        {blog.content || "Konten tidak tersedia"}
      </p>

      {/* Link kembali ke semua artikel */}
      <div className="mt-6">
        <a
          href="/blog"
          className="text-green-600 hover:underline font-medium"
        >
          ← Kembali ke Semua Artikel
        </a>
      </div>
    </section>
  );
}
