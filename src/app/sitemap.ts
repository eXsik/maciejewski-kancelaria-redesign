import type { MetadataRoute } from "next";
import { getContentRepository } from "@/lib/content/repository";
import { absoluteUrl, isMockContent } from "@/lib/seo/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (isMockContent) return [];

  const repository = getContentRepository();
  const [services, articles] = await Promise.all([
    repository.getServices(),
    repository.getArticles(),
  ]);

  return [
    { url: absoluteUrl("/") },
    { url: absoluteUrl("/uslugi") },
    { url: absoluteUrl("/artykuly") },
    { url: absoluteUrl("/kontakt") },
    { url: absoluteUrl("/o-kancelarii") },
    { url: absoluteUrl("/polityka-prywatnosci") },
    ...services.map((service) => ({
      url: absoluteUrl(`/uslugi/${service.slug}`),
    })),
    ...articles.map((article) => ({
      url: absoluteUrl(`/artykuly/${article.slug}`),
      lastModified: article.updatedAt ?? article.publishedAt,
    })),
  ];
}
