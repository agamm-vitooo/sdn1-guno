"use client";

import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import BlogForm from "./blog.form";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Blog {
  id: number;
  title: string;
  content: string;
  image_url: string | null;
  is_featured: boolean;
}

interface BlogListProps {
  refresh: number;
}

export default function BlogList({ refresh }: BlogListProps) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [editBlog, setEditBlog] = useState<Blog | null>(null);

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from<Blog>("blogs")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("❌ Gagal load artikel:", error.message);
    } else {
      setBlogs(data || []);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [refresh]);

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin mau hapus artikel ini?")) return;

    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) console.error("❌ Gagal hapus artikel:", error.message);
    else fetchBlogs();
  };

  const handleFeatureToggle = async (id: number, checked: boolean) => {
    const { error } = await supabase
      .from("blogs")
      .update({ is_featured: checked })
      .eq("id", id);

    if (error) console.error("❌ Gagal update featured:", error.message);
    else
      setBlogs((prev) =>
        prev.map((b) => (b.id === id ? { ...b, is_featured: checked } : b))
      );
  };

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="p-4 border rounded-lg shadow-sm bg-white flex flex-col"
        >
          {blog.image_url && (
            <Image
              src={blog.image_url}
              alt={blog.title}
              width={500}
              height={300}
              className="rounded-md mb-3"
            />
          )}
          <h3 className="font-semibold text-lg">{blog.title}</h3>
          <p className="text-gray-700 flex-1">{blog.content}</p>

          <div className="flex items-center mt-3 justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={blog.is_featured}
                onChange={(e) =>
                  handleFeatureToggle(blog.id, e.target.checked)
                }
                className="w-4 h-4"
              />
              <span className="text-sm">Tampilkan di BlogSection</span>
            </label>

            <div className="flex space-x-2">
              <button
                onClick={() => setEditBlog(blog)}
                className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(blog.id)}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Modal / inline form edit */}
      {editBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50">
          <BlogForm
            editData={editBlog}
            onAdded={fetchBlogs}
            onClose={() => setEditBlog(null)}
          />
        </div>
      )}
    </div>
  );
}
