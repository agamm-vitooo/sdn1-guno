import BlogSection from "@/components/sections/blog.section";
import ContactSection from "@/components/sections/contact.section";
import Hero from "@/components/sections/hero.section";
import VisiMisi from "@/components/sections/visimisi.section";

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <VisiMisi />
      <BlogSection />
      <ContactSection />
    </main>
  );
}
