import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function BlogSection() {
  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .order("id", { ascending: false });

  if (!blogs || blogs.length === 0) {
    return (
      <section className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Artikel Sekolah
        </h2>
        <p className="text-center text-gray-500 text-lg">Belum ada artikel.</p>
      </section>
    );
  }

  // Ambil 3 artikel terbaru
  const latestBlogs = blogs.slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Artikel Sekolah
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {latestBlogs.map((blog) => (
          <div
            key={blog.id}
            className="group relative bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            {blog.image_url && (
              <div className="relative w-full h-56 sm:h-64 md:h-48 lg:h-56">
                <Image
                  src={blog.image_url}
                  alt={blog.title}
                  fill
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-semibold mb-1 line-clamp-2 text-gray-900">
                {blog.title}
              </h3>

              {/* Tampilkan created_at */}
              {blog.created_at && (
                <p className="text-gray-500 text-sm mb-2">
                  {new Date(blog.created_at).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              )}

              <p className="text-gray-700 text-sm flex-1 line-clamp-3">
                {blog.content}
              </p>

<Link
  href={`/blog/${blog.id}`}
  className="mt-4 inline-block text-white bg-green-600 hover:bg-green-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-center"
>
  Baca Selengkapnya →
</Link>


            </div>

            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl"></div>
          </div>
        ))}
      </div>

      {blogs.length > 3 && (
        <div className="text-center mt-8">
          <Link
            href="/blog"
            className="text-green-600 hover:underline font-semibold text-lg"
          >
            Lihat semua artikel →
          </Link>
        </div>
      )}
    </section>
  );
}
