import styles from "./ConceptNotice.module.scss";

export function ConceptNotice() {
  return (
    <aside aria-label="Informacja o projekcie" className={styles.notice}>
      <div className={styles.inner}>
        <strong>Koncept portfolio</strong>
        <span>
          To niezależny projekt demonstracyjny. Nie jest oficjalną stroną
          kancelarii i nie powstał na jej zlecenie.
        </span>
      </div>
    </aside>
  );
}
