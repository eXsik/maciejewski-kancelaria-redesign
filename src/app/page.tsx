import { ContactSection } from "@/components/home/ContactSection";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { getContentRepository } from "@/lib/content/repository";

export const revalidate = 300;

export default async function Home() {
  const repository = getContentRepository();
  const [services, firm] = await Promise.all([
    repository.getServices(),
    repository.getFirmProfile(),
  ]);
  const isDemoContent = repository.source === "mock";

  return (
    <>
      <main>
        <HeroSection />
        <ServicesSection services={services} isDemoContent={isDemoContent} />
        <ContactSection firm={firm} isDemoContent={isDemoContent} />
      </main>
    </>
  );
}
