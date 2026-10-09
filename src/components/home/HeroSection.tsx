import Link from "next/link";
import styles from "./HomeSections.module.scss";

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <p className={styles.eyebrow}>Koncept strony · Ostrów Wielkopolski</p>
      <h1 id="hero-title">Prawo po ludzku</h1>
      <p className={styles.lead}>
        Demonstracyjna koncepcja spokojnej, przejrzystej komunikacji dla
        lokalnej kancelarii prawnej — z naciskiem na dostępność i zaufanie.
      </p>
      <Link className={styles.button} href="#uslugi">
        Zobacz przykładowe obszary <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
