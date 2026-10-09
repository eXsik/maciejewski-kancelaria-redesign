import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContentRepository } from "@/lib/content/repository";
import styles from "./ServiceDetail.module.scss";

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 300;

export async function generateStaticParams() {
  const repository = getContentRepository();
  const services = await repository.getServices();

  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const repository = getContentRepository();
  const service = await repository.getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Usługa nie znaleziona — Kancelaria Radcy Prawnego",
    };
  }

  return {
    title: service.seo.title ?? `${service.title} — Kancelaria Radcy Prawnego`,
    description: service.seo.description ?? service.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const repository = getContentRepository();
  const service = await repository.getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <Link className={styles.backLink} href="/uslugi">
        ← Wszystkie usługi
      </Link>

      <article className="styles.content">
        {service.category ? (
          <p className={styles.eyebrow}>{service.category}</p>
        ) : null}

        <h1 className={styles.title}>{service.title}</h1>

        <p className={styles.lead}>{service.shortDescription}</p>

        <div className={styles.description}>
          <p>{service.description}</p>
        </div>

        {repository.source === "mock" ? (
          <p className={styles.demoNotice}>
            Treść demonstracyjna przygotowana na potrzeby portfolio concept
            redesignu. Nie stanowi potwierdzonej oferty kancelarii.
          </p>
        ) : null}
      </article>
    </main>
  );
}
