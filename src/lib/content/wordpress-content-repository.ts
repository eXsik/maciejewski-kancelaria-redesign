import type { Article, ContentImage, FirmProfile, Service } from "./models";
import type { ContentRepository } from "./content-repository";

type WordPressImage = {
  sourceUrl?: string | null;
  altText?: string | null;
  mediaDetails?: { width?: number | null; height?: number | null } | null;
};

type WordPressNode = {
  id: string;
  title?: string | null;
  slug?: string | null;
  content?: string | null;
  excerpt?: string | null;
  date?: string | null;
  author?: { node?: { name?: string | null } | null } | null;
  featuredImage?: { node?: WordPressImage | null } | null;
};

type ServiceNode = WordPressNode & {
  serviceCategories?: { nodes?: Array<{ name?: string | null }> } | null;
  serviceFields?: {
    shortDescription?: string | null;
    ctaLabel?: string | null;
    ctaUrl?: string | null;
    relatedArticles?: { nodes?: Array<{ slug?: string | null }> } | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
  } | null;
};

type ArticleNode = WordPressNode & {
  categories?: { nodes?: Array<{ name?: string | null }> } | null;
  articleFields?: {
    relatedServices?: { nodes?: Array<{ slug?: string | null }> } | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
  } | null;
};

type FirmNode = WordPressNode & {
  firmFields?: {
    address?: string | null;
    phone?: string | null;
    email?: string | null;
    openingHours?: string | null;
  } | null;
};

type Connection<T> = { nodes?: T[] | null } | null;

type WordPressResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

const SERVICES_QUERY = `
  query Services($slug: String) {
    services(first: 100, where: { name: $slug }) {
      nodes {
        id title slug content featuredImage { node { sourceUrl altText mediaDetails { width height } } }
        serviceCategories { nodes { name } }
        serviceFields {
          shortDescription ctaLabel ctaUrl seoTitle seoDescription
          relatedArticles { nodes { slug } }
        }
      }
    }
  }
`;

const ARTICLES_QUERY = `
  query Articles($slug: String) {
    posts(first: 100, where: { name: $slug }) {
      nodes {
        id title slug excerpt content date author { node { name } }
        featuredImage { node { sourceUrl altText mediaDetails { width height } } }
        categories { nodes { name } }
        articleFields {
          seoTitle seoDescription
          relatedServices { nodes { slug } }
        }
      }
    }
  }
`;

const FIRM_PROFILE_QUERY = `
  query FirmProfile {
    firmProfiles(first: 1) {
      nodes { id title firmFields { address phone email openingHours } }
    }
  }
`;

function imageFromWordPress(image?: WordPressImage | null): ContentImage | null {
  if (!image?.sourceUrl) return null;

  return {
    src: image.sourceUrl,
    alt: image.altText ?? "",
    width: image.mediaDetails?.width ?? undefined,
    height: image.mediaDetails?.height ?? undefined,
  };
}

function clean(value: string | null | undefined): string {
  return value?.trim() ?? "";
}

function cleanOptional(value: string | null | undefined): string | null {
  const cleaned = clean(value);
  return cleaned || null;
}

function mapService(node: ServiceNode): Service {
  const fields = node.serviceFields;
  const category = node.serviceCategories?.nodes?.[0]?.name ?? null;

  return {
    id: node.id,
    title: clean(node.title),
    slug: clean(node.slug),
    shortDescription: clean(fields?.shortDescription),
    description: clean(node.content),
    category,
    cta: fields?.ctaLabel && fields.ctaUrl
      ? { label: clean(fields.ctaLabel), href: clean(fields.ctaUrl) }
      : null,
    image: imageFromWordPress(node.featuredImage?.node),
    relatedArticleSlugs: (fields?.relatedArticles?.nodes ?? [])
      .map((article) => clean(article.slug))
      .filter(Boolean),
    seo: {
      title: fields?.seoTitle ? clean(fields.seoTitle) : null,
      description: fields?.seoDescription ? clean(fields.seoDescription) : null,
    },
  };
}

function mapArticle(node: ArticleNode): Article {
  const fields = node.articleFields;

  return {
    id: node.id,
    title: clean(node.title),
    slug: clean(node.slug),
    excerpt: clean(node.excerpt),
    content: clean(node.content),
    image: imageFromWordPress(node.featuredImage?.node),
    category: node.categories?.nodes?.[0]?.name ?? null,
    publishedAt: node.date ?? "",
    author: node.author?.node?.name ?? null,
    relatedServiceSlugs: (fields?.relatedServices?.nodes ?? [])
      .map((service) => clean(service.slug))
      .filter(Boolean),
    seo: {
      title: fields?.seoTitle ? clean(fields.seoTitle) : null,
      description: fields?.seoDescription ? clean(fields.seoDescription) : null,
    },
  };
}

export class WordPressContentRepository implements ContentRepository {
  readonly source = "wordpress" as const;
  private readonly endpoint: string;

  constructor(endpoint = process.env.WORDPRESS_GRAPHQL_URL) {
    if (!endpoint) {
      throw new Error("WORDPRESS_GRAPHQL_URL is not configured.");
    }
    this.endpoint = endpoint;
  }

  private async query<T>(query: string, variables?: Record<string, string | undefined>): Promise<T> {
    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 300, tags: ["wordpress-content"] },
    });

    if (!response.ok) {
      throw new Error(`WordPress GraphQL request failed with status ${response.status}.`);
    }

    const payload = (await response.json()) as WordPressResponse<T>;
    if (payload.errors?.length) {
      throw new Error(payload.errors.map((error) => error.message).join("; "));
    }
    if (!payload.data) {
      throw new Error("WordPress GraphQL response did not contain data.");
    }

    return payload.data;
  }

  async getServices(): Promise<Service[]> {
    const data = await this.query<{ services: Connection<ServiceNode> }>(SERVICES_QUERY);
    return (data.services?.nodes ?? []).map(mapService);
  }

  async getServiceBySlug(slug: string): Promise<Service | null> {
    const data = await this.query<{ services: Connection<ServiceNode> }>(SERVICES_QUERY, { slug });
    const service = data.services?.nodes?.[0];
    return service ? mapService(service) : null;
  }

  async getArticles(): Promise<Article[]> {
    const data = await this.query<{ posts: Connection<ArticleNode> }>(ARTICLES_QUERY);
    return (data.posts?.nodes ?? []).map(mapArticle);
  }

  async getArticleBySlug(slug: string): Promise<Article | null> {
    const data = await this.query<{ posts: Connection<ArticleNode> }>(ARTICLES_QUERY, { slug });
    const article = data.posts?.nodes?.[0];
    return article ? mapArticle(article) : null;
  }

  async getFirmProfile(): Promise<FirmProfile | null> {
    const data = await this.query<{ firmProfiles: Connection<FirmNode> }>(FIRM_PROFILE_QUERY);
    const profile = data.firmProfiles?.nodes?.[0];
    if (!profile) return null;

    return {
      id: profile.id,
      name: clean(profile.title),
      address: cleanOptional(profile.firmFields?.address),
      phone: cleanOptional(profile.firmFields?.phone),
      email: cleanOptional(profile.firmFields?.email),
      openingHours: cleanOptional(profile.firmFields?.openingHours),
    };
  }
}
