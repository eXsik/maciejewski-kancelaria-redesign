import type { Metadata } from "next";
import styles from "./PrivacyPage.module.scss";

export const metadata: Metadata = {
  title: "Polityka prywatności - Kancelaria Radcy Prawnego",
  description: "Informacje o prywatności w koncepcyjnym formularzu kontaktowym.",
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Dokument informacyjny</p>
        <h1>Polityka prywatności</h1>
        <p className={styles.lead}>
          Poniższy tekst jest elementem projektu koncepcyjnego i wymaga
          uzupełnienia oraz weryfikacji przed uruchomieniem produkcyjnej strony.
        </p>
      </header>

      <div className={styles.content}>
        <aside className={styles.index} aria-label="Spis treści">
          <span>W tym dokumencie</span>
          <a href="#administrator">Administrator danych</a>
          <a href="#formularz">Formularz kontaktowy</a>
          <a href="#prawa">Prawa użytkownika</a>
        </aside>

        <article className={styles.article}>
          <section id="administrator">
            <h2>Administrator danych</h2>
            <p>
              Wersja demonstracyjna nie wskazuje zweryfikowanych danych
              administratora. Przed wdrożeniem należy uzupełnić nazwę podmiotu,
              adres kontaktowy oraz właściwy adres e-mail.
            </p>
          </section>

          <section id="formularz">
            <h2>Formularz kontaktowy</h2>
            <p>
              Formularz na stronie służy do zebrania danych potrzebnych do
              odpowiedzi na zapytanie: imienia i nazwiska, adresu e-mail,
              opcjonalnego telefonu, tematu oraz opisu sprawy.
            </p>
            <p>
              Obecna wersja działa wyłącznie demonstracyjnie. Dane nie są
              zapisywane ani przekazywane do kancelarii. W produkcyjnej wersji
              należy opisać rzeczywisty czas przechowywania, odbiorców danych i
              podstawę prawną przetwarzania.
            </p>
          </section>

          <section id="prawa">
            <h2>Prawa użytkownika</h2>
            <p>
              W docelowej wersji dokument powinien opisywać prawa osoby,
              której dane dotyczą, w tym dostęp do danych, ich sprostowanie,
              usunięcie, ograniczenie przetwarzania oraz wniesienie skargi do
              właściwego organu nadzorczego.
            </p>
          </section>

          <p className={styles.note}>
            To nie jest porada prawna ani gotowy dokument do wykorzystania w
            działalności kancelarii. Treść wymaga sprawdzenia przez właściwą
            osobę przed publikacją.
          </p>
        </article>
      </div>
    </main>
  );
}
