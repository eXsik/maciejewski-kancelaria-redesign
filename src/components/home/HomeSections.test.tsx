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
      screen.getByRole("heading", { level: 1, name: "Prawo po ludzku" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(2);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(4);
  });

  it("labels all mock services as demonstrative content", async () => {
    const services = await repository.getServices();

    render(<ServicesSection services={services} isDemoContent />);

    expect(screen.getAllByRole("article")).toHaveLength(4);
    expect(screen.getAllByText("Treść demonstracyjna")).toHaveLength(4);
    expect(
      screen.getByText(
        "Poniższe nazwy i opisy są placeholderami demonstracyjnymi. Nie stanowią potwierdzonej oferty kancelarii.",
      ),
    ).toBeInTheDocument();
  });

  it("renders an explicit empty state when no services are available", () => {
    render(<ServicesSection services={[]} isDemoContent={false} />);

    expect(screen.getByText("Brak opublikowanych usług.")).toBeInTheDocument();
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });

  it("does not create fake phone or email links for mock contact data", async () => {
    const firm = await repository.getFirmProfile();

    render(<ContactSection firm={firm} isDemoContent />);

    const contactSection = screen.getByRole("region", {
      name: "Miejsce na zweryfikowane dane kancelarii.",
    });

    expect(within(contactSection).getByText("Ostrów Wielkopolski")).toBeInTheDocument();
    expect(within(contactSection).queryByRole("link")).not.toBeInTheDocument();
    expect(contactSection.querySelector('a[href^="tel:"]')).toBeNull();
    expect(contactSection.querySelector('a[href^="mailto:"]')).toBeNull();
  });
});
