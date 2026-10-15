"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SiteHeader.module.scss";

export function SiteHeader() {
  const pathname = usePathname();

  const isCurrentSection = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={styles.header}>
      <Link className={styles.wordmark} href="/" aria-label="Strona główna">
        <span className={styles.monogram}>JM</span>
        <span className={styles.wordmarkText}>
          <strong>Kancelaria Radcy Prawnego</strong>
          <span>Jerzego Maciejewskiego</span>
        </span>
      </Link>

      <nav aria-label="Główna nawigacja" className={styles.nav}>
        <Link
          aria-current={isCurrentSection("/o-kancelarii") ? "page" : undefined}
          href="/o-kancelarii"
        >
          O kancelarii
        </Link>
        <Link
          aria-current={isCurrentSection("/uslugi") ? "page" : undefined}
          href="/uslugi"
        >
          Usługi
        </Link>
        <Link
          aria-current={isCurrentSection("/artykuly") ? "page" : undefined}
          href="/artykuly"
        >
          Artykuły
        </Link>
        <Link
          aria-current={isCurrentSection("/kontakt") ? "page" : undefined}
          href="/kontakt"
        >
          Kontakt
        </Link>
        <Link className={styles.navButton} href="/kontakt">
          Umów rozmowę
        </Link>
      </nav>
    </header>
  );
}
