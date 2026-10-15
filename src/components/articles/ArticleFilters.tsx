import Link from "next/link";
import styles from "./ArticleFilters.module.scss";

type ArticleFiltersProps = {
  categories: string[];
  activeCategory?: string;
};

export function ArticleFilters({
  categories,
  activeCategory,
}: ArticleFiltersProps) {
  if (categories.length === 0) return null;

  return (
    <nav aria-label="Filtrowanie artykułów" className={styles.filters}>
      <Link
        aria-current={!activeCategory ? "page" : undefined}
        className={!activeCategory ? styles.active : ""}
        href="/artykuly"
      >
        Wszystkie
      </Link>
      {categories.map((category) => (
        <Link
          aria-current={activeCategory === category ? "page" : undefined}
          className={activeCategory === category ? styles.active : ""}
          href={`/artykuly?category=${encodeURIComponent(category)}`}
          key={category}
        >
          {category}
        </Link>
      ))}
    </nav>
  );
}
