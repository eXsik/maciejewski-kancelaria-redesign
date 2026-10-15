import { MockContentRepository } from "./mock-content-repository";

describe("MockContentRepository", () => {
  const repository = new MockContentRepository();

  it("identifies itself as the mock content source", () => {
    expect(repository.source).toBe("mock");
  });

  it("returns a service by slug and null for an unknown slug", async () => {
    await expect(repository.getServiceBySlug("prawo-cywilne")).resolves.toMatchObject({
      id: "mock-service-civil",
      title: "Prawo cywilne",
    });
    await expect(repository.getServiceBySlug("nie-istnieje")).resolves.toBeNull();
  });

  it("returns demo articles and resolves them by slug", async () => {
    const articles = await repository.getArticles();

    expect(articles).toHaveLength(3);
    expect(articles[0]).toMatchObject({
      id: "mock-article-testament",
      slug: "dziedziczenie-testamentowe-czym-jest-testament",
      relatedServiceSlugs: ["prawo-cywilne"],
    });

    await expect(
      repository.getArticleBySlug("dziedziczenie-testamentowe-czym-jest-testament"),
    ).resolves.toMatchObject({
      title: "Dziedziczenie testamentowe – czym jest testament?",
    });

    await expect(
      repository.getArticleBySlug("dowolny-artykul"),
    ).resolves.toBeNull();
  });
});
