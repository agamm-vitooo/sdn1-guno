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
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <Link
          href="/kabar/berita"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium mb-8 transition-colors duration-200 group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Kembali ke Semua Artikel</span>
        </Link>

        {/* Article Container */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Image Header */}
          {blog.image_url && (
            <div className="relative w-full h-96 bg-gray-100">
              <Image
                src={blog.image_url}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Date Badge */}
            {blog.created_at && (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium">
                    {new Date(blog.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              {blog.title}
            </h1>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-lg whitespace-pre-line leading-relaxed">
                {blog.content}
              </p>
            </div>
          </div>
        </article>

        {/* Bottom Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <Link
            href="/kabar/berita"
            className="inline-flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Lihat Artikel Lainnya</span>
          </Link>
        </div>
      </div>
    </section>
  );
}