// src/app/(public)/blog/[id]/page.tsx
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface BlogPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { id } = await params; // Await the params Promise

  // Ambil artikel berdasarkan id
  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !blog) {
    notFound(); // jika tidak ada artikel, arahkan ke 404
  }

 return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>

      {blog.created_at && (
        <p className="text-sm text-gray-500 mb-4">
          {new Date(blog.created_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      )}

      {blog.image_url && (
        <div className="relative w-full h-96 mb-6 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={blog.image_url}
            alt={blog.title}
            fill
            className="object-cover w-full h-full"
            priority
          />
        </div>
      )}

      <p className="text-gray-700 text-lg whitespace-pre-line leading-relaxed">
        {blog.content}
      </p>

      <div className="mt-6">
        <Link
          href="/blog"
          className="text-green-600 hover:underline font-medium"
        >
          ← Kembali ke Semua Artikel
        </Link>
      </div>
    </section>
  );
}


