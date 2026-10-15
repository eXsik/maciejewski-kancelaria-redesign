import { render, screen, within } from "@testing-library/react";
import { MockContentRepository } from "@/lib/content/mock-content-repository";
import { ContactSection } from "./ContactSection";
import { HeroSection } from "./HeroSection";
import { ServicesSection } from "./ServicesSection";

const repository = new MockContentRepository();

describe("Home sections", () => {
  it("renders the expected heading hierarchy for demo content", async () => {
    const [services, firm] = await Promise.all([
      repository.getServices(),
      repository.getFirmProfile(),
    ]);

    render(
      <main>
        <HeroSection />
        <ServicesSection services={services} isDemoContent />
        <ContactSection firm={firm} isDemoContent />
      </main>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Prawo, które daje jasność." }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(2);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(4);
  });

  it("discloses demo content once instead of repeating demo labels", async () => {
    const services = await repository.getServices();

    render(<ServicesSection services={services} isDemoContent />);

    expect(screen.getAllByRole("article")).toHaveLength(4);
    expect(screen.queryByText("Treść demonstracyjna")).not.toBeInTheDocument();
    expect(
      screen.getByText(
        "Poniższe nazwy i opisy są treściami demonstracyjnymi opartymi na publicznie dostępnych informacjach. Nie stanowią potwierdzonej oferty kancelarii.",
      ),
    ).toBeInTheDocument();
  });

  it("links every service to its detail page", async () => {
    const services = await repository.getServices();

    render(<ServicesSection services={services} isDemoContent />);

    const detailLinks = screen.getAllByRole("link", {
      name: /Poznaj obszar|Dowiedz się więcej/,
    });

    expect(detailLinks).toHaveLength(4);
    expect(detailLinks.map((link) => link.getAttribute("href"))).toEqual([
      "/uslugi/prawo-cywilne",
      "/uslugi/prawo-rodzinne",
      "/uslugi/obsluga-przedsiebiorcow",
      "/uslugi/prawo-pracy",
    ]);
  });

  it("renders an explicit empty state when no services are available", () => {
    render(<ServicesSection services={[]} isDemoContent={false} />);

    expect(screen.getByText("Brak opublikowanych usług.")).toBeInTheDocument();
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });

  it("uses a page heading hierarchy in the standalone services variant", async () => {
    const services = await repository.getServices();

    render(
      <ServicesSection services={services} isDemoContent standalone />,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Wsparcie dopasowane do Twojej sytuacji.",
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(4);
  });

  it("renders public contact data as demo content", async () => {
    const firm = await repository.getFirmProfile();

    render(<ContactSection firm={firm} isDemoContent />);

    const contactSection = screen.getByRole("region", {
      name: "Miejsce na zweryfikowane dane kancelarii.",
    });

    expect(
      within(contactSection).getByText(
        "ul. Gimnazjalna 2/1, 63-400 Ostrów Wielkopolski",
      ),
    ).toBeInTheDocument();
    expect(
      within(contactSection).getByRole("link", { name: /62 736 81 09/ }),
    ).toHaveAttribute("href", "tel:627368109574630770");
    expect(
      within(contactSection).getByRole("link", { name: /kancelaria@/ }),
    ).toHaveAttribute("href", "mailto:kancelaria@radcaprawny-ostrow.pl");
  });
});
