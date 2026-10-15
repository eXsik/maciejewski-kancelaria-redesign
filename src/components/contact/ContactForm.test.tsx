import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  afterEach(() => {
    Object.defineProperty(globalThis, "fetch", { value: undefined, writable: true });
    jest.restoreAllMocks();
  });

  it("shows server validation errors without submitting incomplete data", async () => {
    const fetchMock = jest.fn().mockResolvedValue(
      {
        ok: false,
        json: async () => ({
          errors: {
            name: "Podaj imię i nazwisko.",
            message: "Opisz sprawę w co najmniej 20 znakach.",
          },
        }),
      },
    );
    Object.defineProperty(globalThis, "fetch", { value: fetchMock, writable: true });

    render(<ContactForm />);
    fireEvent.submit(screen.getByRole("button", { name: "Wyślij zapytanie" }));

    await waitFor(() => {
      expect(screen.getByText("Podaj imię i nazwisko.")).toBeInTheDocument();
    });
    expect(screen.getByText("Opisz sprawę w co najmniej 20 znakach.")).toBeInTheDocument();
  });

  it("shows the demo success state after a valid response", async () => {
    const fetchMock = jest.fn().mockResolvedValue(
      { ok: true, json: async () => ({ ok: true, demo: true }) },
    );
    Object.defineProperty(globalThis, "fetch", { value: fetchMock, writable: true });

    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText("Imię i nazwisko"), {
      target: { value: "Jan Kowalski" },
    });
    fireEvent.change(screen.getByLabelText("Adres e-mail"), {
      target: { value: "jan@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Krótki opis sprawy"), {
      target: { value: "Potrzebuję konsultacji w sprawie umowy." },
    });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.submit(screen.getByRole("button", { name: "Wyślij zapytanie" }));

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent("wiadomość nie została wysłana");
    });
  });
});
