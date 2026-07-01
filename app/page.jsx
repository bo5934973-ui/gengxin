import { Footer } from "@/components/Footer";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { FeaturedWorks } from "@/sections/FeaturedWorks";
import { Hero } from "@/sections/Hero";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedWorks />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
