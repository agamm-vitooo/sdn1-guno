// src/components/ContactSection.tsx
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    const { error } = await supabase.from("contacts").insert([
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      },
    ]);

    if (error) {
      console.error(error);
      setSuccess("Gagal mengirim pesan.");
    } else {
      setSuccess("Pesan berhasil dikirim!");
      setFormData({ name: "", email: "", message: "" });
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="w-full py-16 text-gray-500">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 px-6">
        {/* Form */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-black">Hubungi Kami</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Nama"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />
            <textarea
              name="message"
              placeholder="Pesan"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full border p-3 rounded-lg"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Mengirim..." : "Kirim"}
            </button>
            {success && (
              <p className="mt-2 text-sm text-green-600">{success}</p>
            )}
          </form>
        </div>

        {/* Maps */}
        <div className="w-full h-[400px] flex flex-col">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-black">Alamat</h3>
            <p className="text-gray-700">
              4557+7CG, Mloko Legi, Guno, Kec. Jatiroto, Kabupaten Wonogiri, Jawa Tengah 57692
            </p>
          </div>
          <div className="flex-1">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.03113213559!2d111.16098957455566!3d-7.891811778508897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7981bda304c7a1%3A0x5f3d1acff9ef1a03!2sSDN%201%20GUNO!5e0!3m2!1sid!2sid!4v1758978978514!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
