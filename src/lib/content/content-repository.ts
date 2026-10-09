import type { Article, FirmProfile, Service } from "./models";

export type ContentSource = "mock" | "wordpress";

export interface ContentRepository {
  readonly source: ContentSource;
  getServices(): Promise<Service[]>;
  getServiceBySlug(slug: string): Promise<Service | null>;
  getArticles(): Promise<Article[]>;
  getArticleBySlug(slug: string): Promise<Article | null>;
  getFirmProfile(): Promise<FirmProfile | null>;
}
