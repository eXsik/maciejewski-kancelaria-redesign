import { NextResponse } from "next/server";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  topic?: unknown;
  message?: unknown;
  consent?: unknown;
  website?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe dane." }, { status: 400 });
  }

  if (text(payload.website)) {
    return NextResponse.json({ ok: true });
  }

  const name = text(payload.name);
  const email = text(payload.email);
  const message = text(payload.message);
  const errors: Record<string, string> = {};

  if (name.length < 2 || name.length > 80) {
    errors.name = "Podaj imię i nazwisko.";
  }

  if (!emailPattern.test(email) || email.length > 160) {
    errors.email = "Podaj prawidłowy adres e-mail.";
  }

  if (message.length < 20 || message.length > 2000) {
    errors.message = "Opisz sprawę w co najmniej 20 znakach.";
  }

  if (payload.consent !== true) {
    errors.consent = "Zaznacz zgodę na kontakt w sprawie zapytania.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  return NextResponse.json({
    ok: true,
    demo: true,
    message: "Formularz działa w trybie demonstracyjnym.",
  });
}
