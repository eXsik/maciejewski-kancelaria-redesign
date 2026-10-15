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
      "Roszczenia o zapłatę, odszkodowania, sprawy spadkowe, najem, umowy i opinie prawne.",
    description:
      "Pomoc w sprawach cywilnych obejmuje między innymi dochodzenie należności i odszkodowań, sprawy spadkowe, zasiedzenie, służebności, zniesienie współwłasności, najem lokali oraz przygotowywanie i opiniowanie umów.",
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
      "Sprawy dotyczące kontaktów z dzieckiem, alimentów, władzy rodzicielskiej i podziału majątku.",
    description:
      "Zakres obejmuje sprawy rodzinne, w których znaczenie mają zarówno przepisy, jak i spokojne uporządkowanie sytuacji: kontakty z dzieckiem, alimenty, władza rodzicielska, podział majątku, opieka i kuratela.",
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
      "Bieżące wsparcie firm, windykacja należności oraz przygotowywanie i opiniowanie umów.",
    description:
      "Wsparcie przedsiębiorców może obejmować bieżące konsultacje, windykację należności oraz pomoc przy tworzeniu i ocenie umów związanych z działalnością gospodarczą.",
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
      "Sprawy dotyczące stosunku pracy, wypowiedzeń oraz świadczeń emerytalnych i społecznych.",
    description:
      "W tym obszarze mieszczą się między innymi sprawy o ustalenie istnienia stosunku pracy, odwołania od wypowiedzeń oraz sprawy dotyczące emerytur, rent i ubezpieczeń społecznych.",
    category: "Treść demonstracyjna",
    cta: null,
    image: null,
    relatedArticleSlugs: [],
    seo: placeholderSeo,
  },
];

const articles: Article[] = [
  {
    id: "mock-article-testament",
    title: "Dziedziczenie testamentowe – czym jest testament?",
    slug: "dziedziczenie-testamentowe-czym-jest-testament",
    excerpt:
      "Na przykładzie testamentu porządkujemy najważniejsze pytania dotyczące jego formy, ważności i odwołania.",
    content:
      "Testament pozwala rozporządzić majątkiem na wypadek śmierci, ale jego forma i treść mają znaczenie dla ważności rozrządzeń. Warto zwrócić uwagę między innymi na zdolność do świadomego podjęcia decyzji, wpływ błędu lub groźby oraz możliwość odwołania wcześniejszego testamentu.\n\nMateriał jest demonstracyjnym opracowaniem opartym na tematyce publikowanej na stronie kancelarii. Nie zastępuje indywidualnej analizy prawnej.",
    image: {
      src: "/images/services-editorial.png",
      alt: "Pusty papier na kamiennym parapecie przy starym oknie",
      width: 1536,
      height: 1024,
    },
    category: "Prawo cywilne",
    publishedAt: "2026-01-15",
    updatedAt: "2026-01-22",
    author: "Zespół redakcyjny",
    relatedServiceSlugs: ["prawo-cywilne"],
    seo: placeholderSeo,
  },
  {
    id: "mock-article-law-and-more",
    title: "Dlaczego prawo to coś więcej niż tylko przepisy?",
    slug: "dlaczego-prawo-to-cos-wiecej-niz-tylko-przepisy",
    excerpt:
      "Każda sprawa ma własny kontekst, dlatego sama znajomość przepisów nie zawsze wystarcza do znalezienia dobrego rozwiązania.",
    content:
      "Prawo działa w konkretnych ludzkich sytuacjach. Demonstracyjny tekst rozwija myśl, że obok procedury ważne są także zrozumienie sprawy, jej konsekwencji i możliwych dróg wyjścia.\n\nTreść oparta na tematyce publikowanej na stronie kancelarii. Nie stanowi porady prawnej ani oficjalnej publikacji kancelarii.",
    image: null,
    category: "Podejście do prawa",
    publishedAt: "2026-02-03",
    updatedAt: null,
    author: "Zespół redakcyjny",
    relatedServiceSlugs: ["prawo-cywilne"],
    seo: placeholderSeo,
  },
  {
    id: "mock-article-individual-approach",
    title: "Indywidualne podejście do każdej sprawy",
    slug: "indywidualne-podejscie-do-kazdej-sprawy",
    excerpt:
      "O tym, dlaczego różne historie wymagają innego sposobu rozmowy, analizy i działania.",
    content:
      "Demonstracyjny tekst rozwijający zobowiązanie do uważnego poznania problemu i dopasowania kolejnego kroku do konkretnej sytuacji.\n\nTreść oparta na komunikacji dostępnej na stronie kancelarii i wymaga redakcyjnego potwierdzenia przed publikacją.",
    image: null,
    category: "Sposób pracy",
    publishedAt: "2026-02-20",
    updatedAt: null,
    author: "Zespół redakcyjny",
    relatedServiceSlugs: ["obsluga-przedsiebiorcow"],
    seo: placeholderSeo,
  },
];

const firmProfile: FirmProfile = {
  id: "mock-firm",
  name: "Kancelaria Radcy Prawnego Jerzego Maciejewskiego",
  address: "ul. Gimnazjalna 2/1, 63-400 Ostrów Wielkopolski",
  phone: "62 736 81 09, 574 630 770",
  email: "kancelaria@radcaprawny-ostrow.pl",
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
