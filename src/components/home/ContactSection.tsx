import type { FirmProfile } from "@/lib/content/models";
import styles from "./HomeSections.module.scss";

type ContactSectionProps = {
  firm: FirmProfile | null;
  isDemoContent: boolean;
};

export function ContactSection({ firm, isDemoContent }: ContactSectionProps) {
  const hasContactDetails = Boolean(
    firm?.address || firm?.phone || firm?.email || firm?.openingHours,
  );

  return (
    <section
      className={styles.contact}
      id="kontakt"
      aria-labelledby="contact-title"
    >
      <div>
        <p className={styles.eyebrow}>Kontakt</p>
        <h2 id="contact-title">Miejsce na zweryfikowane dane kancelarii.</h2>
      </div>

      <div className={styles.contactDetails}>
        {firm && hasContactDetails ? (
          <address className={styles.address}>
            <p className={styles.firmName}>{firm.name}</p>
            {firm.address ? <p>{firm.address}</p> : null}
            {firm.phone ? (
              <p>
                <a href={`tel:${firm.phone.replace(/[^+\d]/g, "")}`}>
                  {firm.phone}
                </a>
              </p>
            ) : null}
            {firm.email ? (
              <p>
                <a href={`mailto:${firm.email}`}>{firm.email}</a>
              </p>
            ) : null}
            {firm.openingHours ? <p>{firm.openingHours}</p> : null}
          </address>
        ) : null}

        {isDemoContent ? (
          <p className={styles.contactNote}>
            Telefon, adres i godziny otwarcia pozostają celowo nieuzupełnione
            do czasu weryfikacji w wiarygodnym źródle.
          </p>
        ) : !hasContactDetails ? (
          <p className={styles.emptyState}>Dane kontaktowe nie są dostępne.</p>
        ) : null}
      </div>
    </section>
  );
}
