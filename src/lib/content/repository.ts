import type { ContentRepository } from "./content-repository";
import { MockContentRepository } from "./mock-content-repository";
import { WordPressContentRepository } from "./wordpress-content-repository";

export function getContentRepository(): ContentRepository {
  const source = process.env.CONTENT_SOURCE ?? "mock";

  if (source === "mock") {
    return new MockContentRepository();
  }

  if (source === "wordpress") {
    return new WordPressContentRepository();
  }

  throw new Error(`Unsupported CONTENT_SOURCE: ${source}`);
}
