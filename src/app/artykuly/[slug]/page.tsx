import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { getContentRepository } from "@/lib/content/repository";
import { absoluteUrl, siteName } from "@/lib/seo/site";
import styles from "./ArticleDetail.module.scss";

type ArticleDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const dateFormatter = new Intl.DateTimeFormat("pl-PL", {
  dateStyle: "long",
});

export const revalidate = 300;

export async function generateStaticParams() {
  const repository = getContentRepository();
  const articles = await repository.getArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const repository = getContentRepository();
  const article = await repository.getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Artykuł nie znaleziony — Kancelaria Radcy Prawnego",
    };
  }

  return {
    title: article.seo.title ?? `${article.title} — Kancelaria Radcy Prawnego`,
    description: article.seo.description ?? article.excerpt,
    alternates: { canonical: `/artykuly/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `/artykuly/${article.slug}`,
      siteName,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: article.author ? [article.author] : undefined,
      images: article.image
        ? [{ url: article.image.src, alt: article.image.alt }]
        : undefined,
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const { slug } = await params;
  const repository = getContentRepository();

  const [article, services, articles] = await Promise.all([
    repository.getArticleBySlug(slug),
    repository.getServices(),
    repository.getArticles(),
  ]);

  if (!article) {
    notFound();
  }

  const relatedServices = services.filter((service) =>
    article.relatedServiceSlugs.includes(service.slug),
  );
  const relatedArticles = articles
    .filter(
      (candidate) =>
        candidate.slug !== article.slug &&
        candidate.relatedServiceSlugs.some((serviceSlug) =>
          article.relatedServiceSlugs.includes(serviceSlug),
        ),
    )
    .slice(0, 2);

  return (
    <main className={styles.page} id="main-content">
      <BreadcrumbJsonLd
        items={[
          { name: "Strona główna", url: absoluteUrl("/") },
          { name: "Artykuły", url: absoluteUrl("/artykuly") },
          { name: article.title, url: absoluteUrl(`/artykuly/${article.slug}`) },
        ]}
      />
      <ArticleJsonLd
        article={article}
        url={absoluteUrl(`/artykuly/${article.slug}`)}
      />
      <nav aria-label="Okruszki" className={styles.breadcrumbs}>
        <Link href="/">Strona główna</Link>
        <span aria-hidden="true">/</span>
        <Link href="/artykuly">Artykuły</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{article.title}</span>
      </nav>

      <article className={styles.article}>
        <div className={styles.hero}>
          <header className={styles.header}>
            {article.category ? (
              <p className={styles.eyebrow}>{article.category}</p>
            ) : null}

            <h1>{article.title}</h1>

            <div className={styles.meta}>
              <time dateTime={article.publishedAt}>
                {dateFormatter.format(new Date(article.publishedAt))}
              </time>
              {article.updatedAt ? (
                <time dateTime={article.updatedAt}>
                  Aktualizacja: {dateFormatter.format(new Date(article.updatedAt))}
                </time>
              ) : null}
              {article.author ? <span>{article.author}</span> : null}
            </div>
          </header>

          <div className={styles.media}>
            {article.image ? (
              <Image
                className={styles.mediaImage}
                src={article.image.src}
                alt={article.image.alt}
                fill
                sizes="(max-width: 700px) 100vw, 40vw"
              />
            ) : (
              <span className={styles.mediaStatement}>
                Jasny kontekst przed decyzją.
              </span>
            )}
          </div>
        </div>

        <p className={styles.excerpt}>{article.excerpt}</p>

        <div className={styles.content}>
          {article.content.split(/\n{2,}/).map((paragraph, index) => (
            <p key={`${article.id}-paragraph-${index}`}>{paragraph}</p>
          ))}
        </div>

        {relatedServices.length > 0 ? (
          <aside className={styles.related}>
            <div>
              <p className={styles.eyebrow}>Powiązany obszar</p>
              <p className={styles.relatedIntro}>
                Zobacz także informacje dotyczące tego obszaru praktyki.
              </p>
            </div>
            {relatedServices.map((service) => (
              <Link key={service.id} href={`/uslugi/${service.slug}`}>
                {service.title}
              </Link>
            ))}
          </aside>
        ) : null}

        {relatedArticles.length > 0 ? (
          <section aria-labelledby="related-articles-title" className={styles.relatedArticles}>
            <p className={styles.eyebrow} id="related-articles-title">
              Czytaj dalej
            </p>
            <div className={styles.relatedArticleList}>
              {relatedArticles.map((relatedArticle) => (
                <Link
                  href={`/artykuly/${relatedArticle.slug}`}
                  key={relatedArticle.id}
                >
                  <span>{relatedArticle.title}</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {repository.source === "mock" ? (
          <p className={styles.demoNotice}>
            Ten artykuł jest treścią demonstracyjną. Nie stanowi porady prawnej.
          </p>
        ) : null}
      </article>
    </main>
  );
}
