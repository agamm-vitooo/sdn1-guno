"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full h-[80vh] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/hero.webp"
          alt="Halaman depan SD Negeri 1 Guno"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 md:px-16 h-full flex flex-col justify-center">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white mb-6">
          Selamat Datang di <br />
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
            SDN 1 Guno
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed mb-8">
          Mencetak generasi yang cerdas, berkarakter, dan berprestasi untuk masa
          depan Indonesia yang gemilang.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="#visi-misi"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-bold rounded-xl shadow-md hover:shadow-lg hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105"
          >
            <span>Visi Misi</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>

          <Link
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/30 text-white rounded-xl font-bold hover:bg-white hover:text-blue-900 hover:border-white transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>Hubungi Kami</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
