export const siteName = "Kancelaria Radcy Prawnego — koncept portfolio";

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
);

export const isMockContent = process.env.CONTENT_SOURCE !== "wordpress";

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, siteUrl).toString();
}
