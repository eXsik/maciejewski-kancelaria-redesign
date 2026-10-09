import Link from "next/link";
import type { Service } from "@/lib/content/models";
import styles from "./HomeSections.module.scss";

type ServicesSectionProps = {
  services: Service[];
  isDemoContent: boolean;
};

export function ServicesSection({
  services,
  isDemoContent,
}: ServicesSectionProps) {
  return (
    <section
      className={styles.section}
      id="uslugi"
      aria-labelledby="services-title"
    >
      <div className={styles.sectionIntro}>
        <p className={styles.eyebrow}>Zakres praktyki</p>
        <h2 id="services-title">Obszary, w których kancelaria może pomagać</h2>
        {isDemoContent ? (
          <p className={styles.demoCopy}>
            Poniższe nazwy i opisy są placeholderami demonstracyjnymi. Nie
            stanowią potwierdzonej oferty kancelarii.
          </p>
        ) : null}
      </div>

      {services.length > 0 ? (
        <div className={styles.serviceGrid}>
          {services.map((service) => (
            <article className={styles.serviceCard} key={service.id}>
              {service.category ? (
                <p className={styles.cardLabel}>{service.category}</p>
              ) : null}
              <h3>{service.title}</h3>
              <p>{service.shortDescription}</p>
              <Link href={`/uslugi/${service.slug}`}>
                Dowiedz się więcej <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p className={styles.emptyState}>Brak opublikowanych usług.</p>
      )}
    </section>
  );
}
