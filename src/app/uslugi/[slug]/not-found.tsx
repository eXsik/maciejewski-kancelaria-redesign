import Link from "next/link";
import styles from "./ServiceDetail.module.scss";

export default function ServiceNotFound() {
  return (
    <main className={styles.page}>
      <article className={styles.content}>
        <p className={styles.eyebrow}>Nie znaleziono usługi</p>
        <h1 className={styles.title}>Ta usługa nie jest dostępna.</h1>
        <p className={styles.lead}>
          Wróć do listy usług i wybierz inną pozycję.
        </p>
        <Link className={styles.backLink} href="/uslugi">
          ← Wszystkie usługi
        </Link>
      </article>
    </main>
  );
}
