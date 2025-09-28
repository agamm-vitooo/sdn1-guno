import type { Metadata } from "next";
import "../globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SD Negeri 1 Guno",
  description: "SD Negeri 1 Guno",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body className="antialiased font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
