import type { Metadata } from "next";
import "./globals.css";
import { ConceptNotice } from "@/components/concept-notice/ConceptNotice";
import { SiteHeader } from "@/components/site-header/SiteHeader";

export const metadata: Metadata = {
  title: "Kancelaria Radcy Prawnego — koncept portfolio",
  description:
    "Koncepcyjny redesign strony lokalnej kancelarii radcy prawnego.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl">
      <body>
        <ConceptNotice />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
