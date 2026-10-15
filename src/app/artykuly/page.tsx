import type { Metadata } from "next";
import { ArticleFilters } from "@/components/articles/ArticleFilters";
import { ArticleList } from "@/components/articles/ArticleList";
import { getContentRepository } from "@/lib/content/repository";
import styles from "./ArticlesPage.module.scss";

export const metadata: Metadata = {
  title: "Artykuły — Kancelaria Radcy Prawnego",
  description:
    "Demonstracyjna sekcja artykułów w koncepcyjnym redesignie kancelarii.",
};

export const revalidate = 300;

type ArticlesPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ArticlesPage({
  searchParams,
}: ArticlesPageProps) {
  const repository = getContentRepository();
  const [{ category }, articles] = await Promise.all([
    searchParams,
    repository.getArticles(),
  ]);
  const categories = Array.from(
    new Set(
      articles
        .map((article) => article.category)
        .filter((category): category is string => Boolean(category)),
    ),
  );
  const filteredArticles = category
    ? articles.filter((article) => article.category === category)
    : articles;

  return (
    <main className={styles.page} id="main-content">
      <div className={styles.hero}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Strefa wiedzy</p>
          <h1>Artykuły i informacje</h1>
          <p>
            Demonstracyjna przestrzeń na spokojnie wyjaśnione treści związane z
            codziennymi pytaniami prawnymi.
          </p>
        </header>

        <div className={styles.heroStatement} aria-hidden="true">
          <p>Prawo w praktyce.</p>
          <p>Jasny kontekst przed decyzją.</p>
        </div>
      </div>

      {repository.source === "mock" ? (
        <p className={styles.demoNotice}>
          Treści na tej stronie są demonstracyjną prezentacją materiałów
          opartych na publicznie dostępnych informacjach. Nie stanowią porady
          prawnej ani oficjalnych publikacji kancelarii.
        </p>
      ) : null}

      <ArticleFilters categories={categories} activeCategory={category} />

      <ArticleList
        articles={filteredArticles}
        isDemoContent={repository.source === "mock"}
      />
    </main>
  );
}
