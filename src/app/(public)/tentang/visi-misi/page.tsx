"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface VisiMisi {
  id: number;
  type: string;
  content: string;
}

export default function VisiMisiPublicPage() {
  const [visi, setVisi] = useState<VisiMisi[]>([]);
  const [misi, setMisi] = useState<VisiMisi[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("visi_misi").select("*");
      if (error) console.error(error);
      else {
        setVisi(data.filter((d) => d.type === "visi"));
        setMisi(data.filter((d) => d.type === "misi"));
      }
    };
    fetchData();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Visi & Misi</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Komitmen kami dalam membentuk generasi unggul dan berkarakter
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Visi Card */}
          <div className="group relative bg-white rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300 border-t-4 border-blue-600 border">
            {/* Icon Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                <svg className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Visi</h2>
            </div>

            {/* Content */}
            <div className="space-y-3">
              {visi.map((item) => (
                <p key={item.id} className="text-gray-700 leading-relaxed text-sm">
                  {item.content}
                </p>
              ))}
            </div>

            {/* Decorative Element */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-50 rounded-tl-full opacity-50 -z-10"></div>
          </div>

          {/* Misi Card */}
          <div className="group relative bg-white rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300 border-t-4 border-green-600 border">
            {/* Icon Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-600 transition-colors duration-300">
                <svg className="w-7 h-7 text-green-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Misi</h2>
            </div>

            {/* Content */}
            <ul className="space-y-4">
              {misi.map((item) => (
                <li key={item.id} className="flex items-start gap-3 group/item">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-green-600 transition-colors duration-200">
                    <svg className="w-3.5 h-3.5 text-green-600 group-hover/item:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 leading-relaxed">
                    {item.content}
                  </span>
                </li>
              ))}
            </ul>

            {/* Decorative Element */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-50 rounded-tl-full opacity-50 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}