"use client";

import { useState } from "react";
import BlogForm from "@/components/admin/blog.form";
import BlogList from "@/components/admin/blog.list";

export default function AdminBlogPage() {
  const [refresh, setRefresh] = useState(0);

  return (
    <section className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Manajemen Artikel</h1>
      <BlogForm onAdded={() => setRefresh((prev) => prev + 1)} />
      <BlogList refresh={refresh} />
    </section>
  );
}
