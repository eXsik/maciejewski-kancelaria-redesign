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

  it("keeps unimplemented article content empty", async () => {
    await expect(repository.getArticles()).resolves.toEqual([]);
    await expect(repository.getArticleBySlug("dowolny-artykul")).resolves.toBeNull();
  });
});
