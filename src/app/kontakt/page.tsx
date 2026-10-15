import type { Metadata } from "next";
import { getContentRepository } from "@/lib/content/repository";
import { ContactForm } from "@/components/contact/ContactForm";
import styles from "./ContactPage.module.scss";

export const metadata: Metadata = {
  title: "Kontakt - Kancelaria Radcy Prawnego",
  description:
    "Skontaktuj się z kancelarią i opisz sprawę, w której potrzebujesz wsparcia.",
};

export default async function ContactPage() {
  const repository = getContentRepository();
  const firm = await repository.getFirmProfile();
  const isDemoContent = repository.source === "mock";

  return (
    <main id="main-content" className={styles.page}>
      <section className={styles.intro} aria-labelledby="contact-page-title">
        <p className={styles.eyebrow}>Kontakt</p>
        <div className={styles.introGrid}>
          <h1 id="contact-page-title">Porozmawiajmy o Twojej sprawie.</h1>
          <p>
            Napisz krótko, czego dotyczy sprawa. Wrócimy do Ciebie z informacją
            o możliwym kolejnym kroku.
          </p>
        </div>
      </section>

      <section className={styles.contactLayout} aria-label="Dane i formularz kontaktowy">
        <aside className={styles.details}>
          <p className={styles.detailsLabel}>Kancelaria</p>
          <h2>{firm?.name ?? "Kancelaria Radcy Prawnego"}</h2>
          <p className={styles.location}>{firm?.address ?? "Ostrów Wielkopolski"}</p>

          {isDemoContent ? (
            <p className={styles.demoNote}>
              Dane pochodzą z publicznie dostępnych materiałów i wymagają
              potwierdzenia przed użyciem produkcyjnym.
            </p>
          ) : (
            <address className={styles.address}>
              {firm?.phone ? <a href={`tel:${firm.phone.replace(/[^+\d]/g, "")}`}>{firm.phone}</a> : null}
              {firm?.email ? <a href={`mailto:${firm.email}`}>{firm.email}</a> : null}
              {firm?.openingHours ? <span>{firm.openingHours}</span> : null}
            </address>
          )}
        </aside>

        <div className={styles.formPanel}>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
