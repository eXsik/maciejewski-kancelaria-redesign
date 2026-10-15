import type { Article } from "@/lib/content/models";

type ArticleJsonLdProps = {
  article: Article;
  url: string;
};

export function ArticleJsonLd({ article, url }: ArticleJsonLdProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    url,
    datePublished: article.publishedAt,
    ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
    ...(article.author
      ? { author: { "@type": "Person", name: article.author } }
      : {}),
    ...(article.image ? { image: [article.image.src] } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
