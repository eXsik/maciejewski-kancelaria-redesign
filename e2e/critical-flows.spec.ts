import { expect, test } from "@playwright/test";

test.describe("critical portfolio flows", () => {
  test("navigates from the home page to services and an article", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: /złożone sprawy wymagają uwagi/i }),
    ).toBeVisible();

    const mainNavigation = page.getByRole("navigation", { name: "Główna nawigacja" });
    await mainNavigation.getByRole("link", { name: "Usługi", exact: true }).click();
    await expect(page).toHaveURL(/\/uslugi$/);
    await expect(
      page.getByRole("heading", { name: /wsparcie dopasowane/i }),
    ).toBeVisible();

    await mainNavigation.getByRole("link", { name: "Artykuły", exact: true }).click();
    await expect(page).toHaveURL(/\/artykuly$/);
    await expect(
      page.getByRole("heading", { name: "Artykuły i informacje" }),
    ).toBeVisible();
  });

  test("opens a service detail page from the services list", async ({ page }) => {
    await page.goto("/uslugi");

    const serviceLink = page
      .getByRole("link", { name: /Poznaj obszar|Dowiedz się więcej/i })
      .first();
    await expect(serviceLink).toBeVisible();
    await serviceLink.click();

    await expect(page).toHaveURL(/\/uslugi\/[^/]+$/);
    await expect(page.locator("main h1")).toBeVisible();
  });

  test("shows accessible validation errors for an incomplete contact form", async ({ page }) => {
    await page.goto("/kontakt");

    await page.getByRole("button", { name: "Wyślij zapytanie" }).click();

    await expect(page.getByText("Sprawdź zaznaczone pola i spróbuj ponownie.")).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Imię i nazwisko" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    await expect(page.getByText("Podaj imię i nazwisko.")).toBeVisible();
  });

  test("submits the demonstrational contact form successfully", async ({ page }) => {
    await page.goto("/kontakt");

    await page.getByRole("textbox", { name: "Imię i nazwisko" }).fill("Jan Kowalski");
    await page.getByRole("textbox", { name: "Adres e-mail" }).fill("jan@example.com");
    await page.getByRole("textbox", { name: "Krótki opis sprawy" }).fill(
      "Potrzebuję informacji o możliwym kolejnym kroku.",
    );
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Wyślij zapytanie" }).click();

    await expect(page.getByRole("status")).toContainText(
      "wiadomość nie została wysłana",
    );
  });
});
