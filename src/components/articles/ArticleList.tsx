import type { Article } from "@/lib/content/models";
import { ArticleCard } from "./ArticleCard";
import styles from "./ArticleList.module.scss";

type ArticleListProps = {
  articles: Article[];
  isDemoContent: boolean;
};

export function ArticleList({ articles, isDemoContent }: ArticleListProps) {
  if (articles.length === 0) {
    return <p className={styles.emptyState}>Brak opublikowanych artykułów.</p>;
  }

  const [featuredArticle, ...remainingArticles] = articles;

  return (
    <div className={styles.feed}>
      <ArticleCard
        article={featuredArticle}
        isDemoContent={isDemoContent}
        featured
      />

      <div className={styles.list}>
        {remainingArticles.map((article) => (
          <ArticleCard
            article={article}
            isDemoContent={isDemoContent}
            key={article.id}
          />
        ))}
      </div>
    </div>
  );
}
