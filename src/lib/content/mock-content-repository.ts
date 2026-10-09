import type { ContentRepository } from "./content-repository";
import type { Article, FirmProfile, Service } from "./models";

const placeholderSeo = {
  title: null,
  description: null,
};

const services: Service[] = [
  {
    id: "mock-service-civil",
    title: "Prawo cywilne",
    slug: "prawo-cywilne",
    shortDescription:
      "Przykładowy opis obszaru praktyki. Rzeczywisty zakres usług wymaga potwierdzenia przez kancelarię.",
    description:
      "Treść demonstracyjna przygotowana wyłącznie na potrzeby konceptu portfolio.",
    category: "Treść demonstracyjna",
    cta: null,
    image: null,
    relatedArticleSlugs: [],
    seo: placeholderSeo,
  },
  {
    id: "mock-service-family",
    title: "Prawo rodzinne",
    slug: "prawo-rodzinne",
    shortDescription:
      "Przykładowy opis pokazujący sposób prezentacji złożonych tematów prostym, spokojnym językiem.",
    description:
      "Treść demonstracyjna przygotowana wyłącznie na potrzeby konceptu portfolio.",
    category: "Treść demonstracyjna",
    cta: null,
    image: null,
    relatedArticleSlugs: [],
    seo: placeholderSeo,
  },
  {
    id: "mock-service-business",
    title: "Obsługa przedsiębiorców",
    slug: "obsluga-przedsiebiorcow",
    shortDescription:
      "Przykładowy opis miejsca na informacje o bieżącym wsparciu prawnym dla lokalnych firm.",
    description:
      "Treść demonstracyjna przygotowana wyłącznie na potrzeby konceptu portfolio.",
    category: "Treść demonstracyjna",
    cta: null,
    image: null,
    relatedArticleSlugs: [],
    seo: placeholderSeo,
  },
  {
    id: "mock-service-employment",
    title: "Prawo pracy",
    slug: "prawo-pracy",
    shortDescription:
      "Przykładowy opis karty usługi. Nazwa i zakres nie stanowią potwierdzonej oferty kancelarii.",
    description:
      "Treść demonstracyjna przygotowana wyłącznie na potrzeby konceptu portfolio.",
    category: "Treść demonstracyjna",
    cta: null,
    image: null,
    relatedArticleSlugs: [],
    seo: placeholderSeo,
  },
];
const articles: Article[] = [];

const firmProfile: FirmProfile = {
  id: "mock-firm",
  name: "Kancelaria Radcy Prawnego Jerzego Maciejewskiego",
  address: "Ostrów Wielkopolski",
  phone: null,
  email: null,
  openingHours: null,
};

export class MockContentRepository implements ContentRepository {
  readonly source = "mock" as const;

  async getServices(): Promise<Service[]> {
    return services;
  }

  async getServiceBySlug(slug: string): Promise<Service | null> {
    return services.find((service) => service.slug === slug) ?? null;
  }

  async getArticles(): Promise<Article[]> {
    return articles;
  }

  async getArticleBySlug(slug: string): Promise<Article | null> {
    return articles.find((article) => article.slug === slug) ?? null;
  }

  async getFirmProfile(): Promise<FirmProfile> {
    return firmProfile;
  }
}
