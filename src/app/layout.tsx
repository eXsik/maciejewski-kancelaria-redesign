import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kancelaria Radcy Prawnego — koncept portfolio",
  description: "Koncepcyjny redesign strony lokalnej kancelarii radcy prawnego.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
