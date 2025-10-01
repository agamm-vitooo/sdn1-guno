"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface VisiMisi {
  id: number;
  type: string;
  content: string;
}

export default function VisiMisi() {
  const [visi, setVisi] = useState<VisiMisi[]>([]);
  const [misi, setMisi] = useState<VisiMisi[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("visi_misi")
        .select("id, type, content")
        .order("id", { ascending: true });
      if (error) {
        console.error(error);
      } else if (data) {
        setVisi(data.filter((d) => d.type === "visi"));
        setMisi(data.filter((d) => d.type === "misi"));
      }
    };
    fetchData();
  }, []);

  return (
    <section
      id="visi-misi"
      className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Judul */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Visi & Misi
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Komitmen kami dalam membentuk generasi unggul dan berkarakter
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Visi */}
          <div className="group relative bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-blue-100">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-2xl"></div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                <svg
                  className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Visi</h3>
            </div>

            <div className="text-gray-700 leading-relaxed space-y-2">
              {visi.length > 0 ? (
                visi.map((item) =>                   <li key={item.id} className="flex items-start gap-3 group/item">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-blue-500 transition-colors duration-200">
                      <svg
                        className="w-3 h-3 text-blue-500 group-hover/item:text-white transition-colors duration-200"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700 leading-relaxed">
                      {item.content}
                    </span>
                  </li>)
              ) : (
                <p className="italic text-gray-400">Belum ada data visi</p>
              )}
            </div>

            <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-50 rounded-tl-full opacity-50 -z-10"></div>
          </div>

          {/* Misi */}
          <div className="group relative bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-green-100">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-t-2xl"></div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-600 transition-colors duration-300">
                <svg
                  className="w-6 h-6 text-green-600 group-hover:text-white transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Misi</h3>
            </div>

            <ul className="space-y-4">
              {misi.length > 0 ? (
                misi.map((item) => (
                  <li key={item.id} className="flex items-start gap-3 group/item">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-green-600 transition-colors duration-200">
                      <svg
                        className="w-3 h-3 text-green-600 group-hover/item:text-white transition-colors duration-200"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700 leading-relaxed">
                      {item.content}
                    </span>
                  </li>
                ))
              ) : (
                <li className="italic text-gray-400">Belum ada data misi</li>
              )}
            </ul>

            <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-50 rounded-tl-full opacity-50 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
