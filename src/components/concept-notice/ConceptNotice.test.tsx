import { render, screen } from "@testing-library/react";
import { ConceptNotice } from "./ConceptNotice";

describe("ConceptNotice", () => {
  it("clearly identifies the website as an independent portfolio concept", () => {
    render(<ConceptNotice />);

    const notice = screen.getByRole("complementary", {
      name: "Informacja o projekcie",
    });

    expect(notice).toHaveTextContent("Koncept portfolio");
    expect(notice).toHaveTextContent("Nie jest oficjalną stroną kancelarii");
    expect(notice).toHaveTextContent("nie powstał na jej zlecenie");
  });
});
