import { ServicesSection } from "@/components/home/ServicesSection";
import { getContentRepository } from "@/lib/content/repository";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Usługi - Kancelaria Radcy Prawnego",
  description:
    "Obszary praktyki prezentowane w koncepcyjnym redesignie kancelarii.",
};

export const revalidate = 300;

export default async function ServicesPage() {
  const repository = getContentRepository();
  const services = await repository.getServices();

  return (
    <main id="main-content">
      <ServicesSection
        services={services}
        isDemoContent={repository.source === "mock"}
        standalone
      />
    </main>
  );
}
