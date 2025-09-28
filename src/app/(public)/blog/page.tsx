import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function BlogPage() {
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("*")
    .order("id", { ascending: false });

  if (error) console.error("❌ Gagal fetch blogs:", error.message);

  if (!blogs || blogs.length === 0)
    return (
      <section className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Semua Artikel
        </h1>
        <p className="text-center text-gray-500 text-lg">Belum ada artikel.</p>
      </section>
    );

  return (
    <section className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">
        Semua Artikel
      </h1>

      <div className="flex flex-col gap-12">
        {blogs.map((blog) => (
          <div className="flex flex-col lg:flex-row gap-6 items-start" key={blog.id}>
            {blog.image_url && (
              <div className="relative w-full lg:w-1/3 h-64 rounded-xl overflow-hidden shadow-md group hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={blog.image_url}
                  alt={blog.title}
                  fill
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            <div className="lg:w-2/3 flex flex-col gap-2">
              <h3 className="text-2xl font-semibold text-gray-900 line-clamp-2">
                {blog.title}
              </h3>

              {/* Tanggal dibuat */}
              {blog.created_at && (
                <p className="text-sm text-gray-500">
                  {new Date(blog.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              )}

              <p className="text-gray-700 text-sm line-clamp-4">{blog.content}</p>

              <Link
                href={`/blog/${blog.id}`}
                className="mt-2 inline-block text-white bg-green-600 hover:bg-green-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Baca Selengkapnya →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
