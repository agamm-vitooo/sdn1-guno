// src/app/(public)/tentang/sejarah/page.tsx
import { connectDB } from "@/lib/mongodb";
import Sejarah from "@/models/Sejarah";
import Image from "next/image";

interface ISejarah {
  _id: string;
  title: string;
  description: string;
  image_url?: string;
  created_at: Date;
}

export default async function SejarahPublicPage() {
  await connectDB();
  const rawItems = await Sejarah.find().sort({ created_at: -1 }).lean();
  
  // Convert _id to string and map to ISejarah type
  const items: ISejarah[] = rawItems.map((item) => ({
    _id: item._id.toString(),
    title: item.title,
    description: item.description,
    image_url: item.image_url,
    created_at: item.created_at,
  }));

  return (
    <section className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-6">
        {items.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-gray-500 text-lg">
              Belum ada sejarah yang ditambahkan.
            </p>
          </div>
        ) : (
          items.map((item) => (
            <article
              key={item._id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-12"
            >
              {/* Gambar di atas */}
              {item.image_url && (
                <div className="relative w-full h-[400px] bg-gray-100">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Konten teks di bawah */}
              <div className="p-8">
                <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                  {item.title}
                </h2>
                <p className="text-gray-700 leading-relaxed text-justify whitespace-pre-line">
                  {item.description}
                </p>

                <div className="text-sm text-gray-400 mt-6">
                  Diterbitkan:{" "}
                  {new Date(item.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}