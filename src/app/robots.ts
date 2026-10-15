import type { MetadataRoute } from "next";
import { absoluteUrl, isMockContent } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  if (isMockContent) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
