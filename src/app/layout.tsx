import type { Metadata } from "next";
import "./globals.css";
import { ConceptNotice } from "@/components/concept-notice/ConceptNotice";
import { SiteFooter } from "@/components/site-footer/SiteFooter";
import { SiteHeader } from "@/components/site-header/SiteHeader";
import { isMockContent, siteName, siteUrl } from "@/lib/seo/site";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: siteName,
  description:
    "Koncepcyjny redesign strony lokalnej kancelarii radcy prawnego.",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName,
    title: siteName,
    description:
      "Koncepcyjny redesign strony lokalnej kancelarii radcy prawnego.",
  },
  robots: isMockContent
    ? { index: false, follow: false }
    : { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" data-scroll-behavior="smooth">
      <body>
        <a className="skipLink" href="#main-content">
          Przejdź do treści
        </a>
        <ConceptNotice />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
