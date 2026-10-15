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
      aria-label="Miejsce na zweryfikowane dane kancelarii."
    >
      <div>
        <p className={styles.eyebrow}>Kontakt</p>
        <h2 id="contact-title">Porozmawiajmy o Twojej sprawie.</h2>
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
            Dane pochodzą z publicznie dostępnych materiałów i wymagają
            potwierdzenia przed użyciem produkcyjnym.
          </p>
        ) : !hasContactDetails ? (
          <p className={styles.emptyState}>Dane kontaktowe nie są dostępne.</p>
        ) : null}
      </div>
    </section>
  );
}
