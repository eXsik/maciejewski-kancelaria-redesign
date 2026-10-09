export type ContentImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type Service = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string | null;
  cta: {
    label: string;
    href: string;
  } | null;
  image: ContentImage | null;
  relatedArticleSlugs: string[];
  seo: {
    title: string | null;
    description: string | null;
  };
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: ContentImage | null;
  category: string | null;
  publishedAt: string;
  author: string | null;
  relatedServiceSlugs: string[];
  seo: {
    title: string | null;
    description: string | null;
  };
};

export type FirmProfile = {
  id: string;
  name: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  openingHours: string | null;
};
