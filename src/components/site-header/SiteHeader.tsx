import Link from "next/link";
import styles from "./SiteHeader.module.scss";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Link className={styles.wordmark} href="/" aria-label="Strona główna">
        Kancelaria Radcy Prawnego
        <span>Jerzego Maciejewskiego</span>
      </Link>

      <nav aria-label="Główna nawigacja" className={styles.nav}>
        <Link href="/uslugi">Usługi</Link>
        <Link href="/#kontakt">Kontakt</Link>
        <Link className={styles.navButton} href="/#kontakt">
          Zobacz kontakt
        </Link>
      </nav>
    </header>
  );
}
