import Image from "next/image";
import Link from "next/link";
import styles from "./HomeSections.module.scss";

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroVisual}>
        <Image
          alt="Spokojne wnętrze z widokiem na historyczną zabudowę miasta"
          fill
          priority
          sizes="(max-width: 700px) 100vw, 64vw"
          src="/images/hero-editorial.webp"
        />
        <p className={styles.imageNote}>
          Autorska ilustracja koncepcyjna — nie przedstawia siedziby kancelarii.
        </p>
      </div>

      <div className={styles.heroContent}>
        <p className={styles.location}>Ostrów Wielkopolski</p>
        <h1 id="hero-title">Prawo, które daje jasność.</h1>
        <p className={styles.lead}>
          Spokojna rozmowa, rzetelna analiza i konkretny plan dalszego działania.
        </p>
        <Link className={styles.button} href="#uslugi">
          Poznaj obszary praktyki
        </Link>
        <blockquote className={styles.quote}>
          <span>„Najpierw trzeba dobrze zrozumieć sprawę.”</span>
          <cite>Jerzy Maciejewski</cite>
        </blockquote>
      </div>
    </section>
  );
}
