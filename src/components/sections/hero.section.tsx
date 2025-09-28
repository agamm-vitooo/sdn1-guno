"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen relative w-screen h-[80vh] overflow-hidden">
      {/* Background image full */}
      <Image
        src="/assets/hero.webp"
        alt="Ilustrasi sekolah"
        fill
        className="absolute top-0 left-0 object-cover"
        priority
      />

      {/* Overlay gelap supaya teks lebih jelas */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30" />

      {/* Text content */}
      <div className="relative z-10 max-w-3xl px-6 md:px-16 h-full flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
          Selamat Datang di <br />
          <span className="text-white">SDN 1 Guno</span>
        </h1>
        <p className="mt-4 text-lg text-gray-200">
          Mencetak generasi yang cerdas, berkarakter, dan berprestasi.
        </p>
        <div className="mt-6 flex gap-4">
          <a
            href="/profil"
            className="px-6 py-3 bg-yellow-400 text-blue-900 font-semibold rounded-lg shadow hover:bg-yellow-300 transition"
          >
            Tentang Kami
          </a>
          <a
            href="/kontak"
            className="px-6 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </section>
  );
}
