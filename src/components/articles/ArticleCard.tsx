import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/content/models";
import styles from "./ArticleCard.module.scss";

type ArticleCardProps = {
  article: Article;
  isDemoContent: boolean;
  featured?: boolean;
};

const dateFormatter = new Intl.DateTimeFormat("pl-PL", {
  dateStyle: "long",
});

export function ArticleCard({
  article,
  isDemoContent,
  featured = false,
}: ArticleCardProps) {
  return (
    <article
      className={`${styles.card} ${featured ? styles.featured : ""}`}
    >
      {article.image ? (
        <div className={styles.media}>
          <Image
            src={article.image.src}
            alt={article.image.alt}
            fill
            sizes="(max-width: 700px) 100vw, 34vw"
          />
        </div>
      ) : null}
      <div className={styles.content}>
        <div className={styles.meta}>
          {article.category ? <span>{article.category}</span> : null}
          <time dateTime={article.publishedAt}>
            {dateFormatter.format(new Date(article.publishedAt))}
          </time>
        </div>

        <div className={styles.copy}>
          <h2>{article.title}</h2>
          <p className={styles.excerpt}>{article.excerpt}</p>

          {isDemoContent ? (
            <p className={styles.demoNote}>Treść demonstracyjna</p>
          ) : null}
        </div>

        <Link className={styles.link} href={`/artykuly/${article.slug}`}>
          Czytaj artykuł
        </Link>
      </div>
    </article>
  );
}
