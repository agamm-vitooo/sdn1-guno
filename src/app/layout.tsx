import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SD Negeri 1 Guno",
  description: "SD Negeri 1 Guno",
  icons: {
    icon: "/icon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jakartaSans.variable} antialiased bg-gradient-to-br from-blue-50 via-white to-blue-50`}
      >
        {/* 🔹 Header dengan logo */}
        <header className="flex items-center justify-between px-6 py-4 shadow-sm bg-white">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/icon.jpg"
              alt="Logo SD Negeri 1 Guno"
              width={48}
              height={48}
              className="rounded-full"
            />
            <h1 className="text-lg font-semibold text-gray-800">
              SD Negeri 1 Guno
            </h1>
          </Link>
        </header>

        {/* 🔹 Halaman utama */}
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
