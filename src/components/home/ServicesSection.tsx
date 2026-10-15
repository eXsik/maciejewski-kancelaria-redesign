import Link from "next/link";
import Image from "next/image";
import type { Service } from "@/lib/content/models";
import styles from "./HomeSections.module.scss";

type ServicesSectionProps = {
  services: Service[];
  isDemoContent: boolean;
  standalone?: boolean;
};

export function ServicesSection({
  services,
  isDemoContent,
  standalone = false,
}: ServicesSectionProps) {
  const SectionHeading = standalone ? "h1" : "h2";
  const CardHeading = standalone ? "h2" : "h3";
  const [leadService, ...secondaryServices] = services;

  const renderService = (service: Service, isLead = false) => (
    <article
      className={`${styles.serviceCard} ${isLead ? styles.serviceCardLead : ""}`}
      key={service.id}
    >
      <Link
        className={styles.serviceCardLink}
        href={`/uslugi/${service.slug}`}
      >
        <div>
          {service.category && !isDemoContent ? (
            <p className={styles.cardLabel}>{service.category}</p>
          ) : null}
          <CardHeading>{service.title}</CardHeading>
        </div>
        <p>{service.shortDescription}</p>
        <span className={styles.serviceLinkLabel}>
          {isLead ? "Poznaj obszar" : "Dowiedz się więcej"}
        </span>
      </Link>
    </article>
  );

  return (
    <section
      className={`${styles.section} ${standalone ? styles.standaloneSection : ""}`}
      id="uslugi"
      aria-labelledby="services-title"
    >
      <div className={styles.sectionIntro}>
        <p className={styles.eyebrow}>Zakres praktyki</p>
        <SectionHeading id="services-title">
          Wsparcie dopasowane do Twojej sytuacji.
        </SectionHeading>
        {isDemoContent ? (
          <p className={styles.demoCopy}>
            Poniższe nazwy i opisy są treściami demonstracyjnymi opartymi na
            publicznie dostępnych informacjach. Nie stanowią potwierdzonej
            oferty kancelarii.
          </p>
        ) : null}
        <figure className={styles.sectionMedia}>
          <Image
            src="/images/services-editorial.png"
            alt="Światło wpadające przez stare okno na kamienny parapet i pusty papier"
            fill
            priority={standalone}
            sizes="(max-width: 700px) 100vw, 25vw"
          />
        </figure>
      </div>

      {services.length > 0 ? (
        <div className={styles.serviceGrid}>
          {leadService ? renderService(leadService, true) : null}
          {secondaryServices.length > 0 ? (
            <div className={styles.serviceSecondaryGrid}>
              {secondaryServices.map((service) => renderService(service))}
            </div>
          ) : null}
        </div>
      ) : (
        <p className={styles.emptyState}>Brak opublikowanych usług.</p>
      )}
    </section>
  );
}
