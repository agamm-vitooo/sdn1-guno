"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Jadwal {
  _id: string;
  image_url: string;
  created_at: string;
}

export default function JadwalPembelajaranPage() {
  const [data, setData] = useState<Jadwal[]>([]);

  useEffect(() => {
    fetch("/api/jadwal_pembelajaran")
      .then((res) => res.json())
      .then((json) => setData(json.data))
      .catch(console.error);
  }, []);

  return (
    <section className="min-h-screen py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 text-white px-4 py-2 rounded-full mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-semibold">Jadwal Pembelajaran</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Jadwal Pelajaran</h1>
          <p className="text-gray-600 text-lg">Jadwal kegiatan belajar mengajar</p>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-xl">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-500 text-xl font-semibold">Belum ada jadwal tersedia</p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {data.map((item) => (
              <article
                key={item._id}
                className="bg-white rounded-2xl border border-gray-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-2">
                  <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                    <Image
                      src={item.image_url}
                      alt="jadwal"
                      width={1200}
                      height={700}
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-3 rounded-lg">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">
                      Diupload pada {new Date(item.created_at).toLocaleString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
