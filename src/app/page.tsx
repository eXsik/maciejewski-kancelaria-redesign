import { ContactSection } from "@/components/home/ContactSection";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import Link from "next/link";
import styles from "@/components/home/HomeSections.module.scss";
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
      <main id="main-content">
        <HeroSection />
        <section className={styles.approach} aria-labelledby="approach-title">
          <div className={styles.approachMain}>
            <p className={styles.eyebrow}>Indywidualne podejście</p>
            <h2 id="approach-title">
              Złożone sprawy wymagają uwagi. Wyjaśnienia powinny być proste.
            </h2>
          </div>
          <div className={styles.approachAside}>
            <p className={styles.approachCopy}>
              Koncept komunikacji oparty na uważności, dostępności i poczuciu,
              że klient wie, co wydarzy się dalej.
            </p>
            <ul className={styles.approachPrinciples}>
              <li>Jasny język</li>
              <li>Pełny kontekst</li>
              <li>Kolejny krok</li>
            </ul>
          </div>
        </section>
        <ServicesSection services={services} isDemoContent={isDemoContent} />
        <section className={styles.process} aria-labelledby="process-title">
          <div className={styles.processHeading}>
            <p className={styles.eyebrow}>Jak pracuję</p>
            <h2 id="process-title">Spokojnie. Konkretnie. Po Twojej stronie.</h2>
          </div>
          <div className={styles.processGrid}>
            {[
              ["01", "Rozmowa", "Poznaję Twoją sytuację i potrzeby. Słucham, zadaję pytania, wyjaśniam możliwości."],
              ["02", "Analiza", "Dokładnie analizuję dokumenty i przedstawiam jasne rozwiązania oraz możliwe scenariusze."],
              ["03", "Działanie", "Reprezentuję Cię i prowadzę sprawę z zaangażowaniem, informując o każdym etapie."],
            ].map(([number, title, copy]) => (
              <article key={number} className={styles.processItem}>
                <span className={styles.processNumber}>{number}</span>
                <div className={styles.processCopy}><h3>{title}</h3><p>{copy}</p></div>
              </article>
            ))}
          </div>
          <Link className={styles.textLink} href="#kontakt">Przejdź do kontaktu</Link>
        </section>
        <ContactSection firm={firm} isDemoContent={isDemoContent} />
      </main>
    </>
  );
}
