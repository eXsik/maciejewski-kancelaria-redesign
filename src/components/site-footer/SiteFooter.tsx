import Link from "next/link";
import styles from "./SiteFooter.module.scss";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <p className={styles.title}>JM</p>
          <p className={styles.firm}>Kancelaria Radcy Prawnego<br />Jerzego Maciejewskiego</p>
          <p className={styles.note}>
            Niezależny projekt demonstracyjny przygotowany jako portfolio
            frontendowe.
          </p>
        </div>

        <nav aria-label="Nawigacja w stopce" className={styles.nav}>
          <Link href="/">Strona główna</Link>
          <Link href="/o-kancelarii">O kancelarii</Link>
          <Link href="/uslugi">Usługi</Link>
          <Link href="/artykuly">Artykuły</Link>
          <Link href="/kontakt">Kontakt</Link>
          <Link href="/polityka-prywatnosci">Polityka prywatności</Link>
        </nav>
      </div>

      <div className={styles.bottom}>
        <span>Ostrów Wielkopolski — projekt koncepcyjny</span>
        <span>© {new Date().getFullYear()} Portfolio concept</span>
      </div>
    </footer>
  );
}
