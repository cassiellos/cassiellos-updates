import EditorialGallery from "@/components/EditorialGallery";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Founder from "@/components/Founder";
import Hero from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
import MaclenyExperience from "@/components/MaclenyExperience";
import Services from "@/components/Services";
import { faqItems } from "@/lib/content";
import { buildFaqJsonLd } from "@/lib/seo";

export default function HomePage() {
  // O MESMO array alimenta a renderizacao e o FAQPage JSON-LD.
  const faqJsonLd = buildFaqJsonLd(faqItems);

  return (
    <>
      <Hero />
      <Services />
      <MaclenyExperience />
      <EditorialGallery />
      <Founder />
      <FAQ items={faqItems} />
      <FinalCTA />

      <FloatingWhatsApp />
      {faqJsonLd ? <JsonLd id="ld-faq" data={faqJsonLd} /> : null}
    </>
  );
}
