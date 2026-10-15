import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getContentRepository } from "@/lib/content/repository";
import styles from "./AboutPage.module.scss";

export const metadata: Metadata = {
  title: "O kancelarii - Kancelaria Radcy Prawnego",
  description:
    "Poznaj sposób pracy i wartości prezentowane w koncepcyjnym redesignie kancelarii.",
};

export default async function AboutPage() {
  const repository = getContentRepository();
  const firm = await repository.getFirmProfile();
  const isDemoContent = repository.source === "mock";

  return (
    <main id="main-content" className={styles.page}>
      <section className={styles.intro} aria-labelledby="about-title">
        <p className={styles.eyebrow}>O kancelarii</p>
        <div className={styles.introGrid}>
          <h1 id="about-title">Spokojna rozmowa. Jasny kierunek.</h1>
          <p>
            Dobra pomoc prawna zaczyna się od uważnego poznania sytuacji i
            wyjaśnienia, co może wydarzyć się dalej.
          </p>
        </div>
      </section>

      <section className={styles.statement} aria-labelledby="statement-title">
        <p className={styles.sectionLabel}>Sposób pracy</p>
        <h2 id="statement-title">
          Prawo powinno pomagać podejmować decyzje, a nie dodawać kolejnych
          niewiadomych.
        </h2>
        <figure className={styles.statementMedia}>
          <Image
            src="/images/about-editorial.png"
            alt="Stół konsultacyjny w spokojnym, naturalnie oświetlonym wnętrzu"
            fill
            sizes="(max-width: 800px) 100vw, 28vw"
          />
          <figcaption>Obraz koncepcyjny — kierunek wizualny marki.</figcaption>
        </figure>
        <p className={styles.statementCopy}>
          Ta strona jest koncepcją komunikacji kancelarii radcy prawnego z
          Ostrowa Wielkopolskiego. Jej zadaniem jest mówić o sprawach prawnych
          prostym, spokojnym językiem.
        </p>
      </section>

      <section className={styles.principles} aria-labelledby="principles-title">
        <div>
          <p className={styles.sectionLabel}>W praktyce</p>
          <h2 id="principles-title">Trzy rzeczy, od których zaczyna się dobra współpraca.</h2>
        </div>
        <div className={styles.principleList}>
          <article>
            <span>01</span>
            <h3>Rozmowa bez pośpiechu</h3>
            <p>Najpierw trzeba dobrze zrozumieć sytuację i pytania, z którymi przychodzisz.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Jasne wyjaśnienia</h3>
            <p>Informacje powinny pomagać ocenić możliwości, ryzyka i następne kroki.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Konkretny plan</h3>
            <p>Po rozmowie łatwiej ustalić, co należy zrobić teraz i jakie decyzje zostawić na później.</p>
          </article>
        </div>
      </section>

      <section className={styles.firm} aria-labelledby="firm-title">
        <div className={styles.firmPanel}>
          <p className={styles.sectionLabel}>Lokalnie</p>
          <h2 id="firm-title">{firm?.name ?? "Kancelaria Radcy Prawnego"}</h2>
          <p>{firm?.address ?? "Ostrów Wielkopolski"}</p>
        </div>
        <div className={styles.firmCopy}>
          {isDemoContent ? (
            <p>
              Szczegółowe informacje o kancelarii, kwalifikacjach i zakresie
              pracy wymagają uzupełnienia na podstawie zweryfikowanych źródeł.
            </p>
          ) : (
            <p>
              Skontaktuj się, aby opisać sprawę i ustalić możliwy kolejny krok.
            </p>
          )}
          <Link className={styles.textLink} href="/kontakt">Przejdź do kontaktu</Link>
        </div>
      </section>
    </main>
  );
}
