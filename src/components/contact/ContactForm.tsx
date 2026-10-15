"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import styles from "./ContactForm.module.scss";

type FieldErrors = Partial<Record<"name" | "email" | "message" | "consent", string>>;

type FormStatus = "idle" | "submitting" | "success" | "error";

function validatePayload(payload: {
  name: string;
  email: string;
  message: string;
  consent: boolean;
}): FieldErrors {
  const validationErrors: FieldErrors = {};

  if (payload.name.length < 2 || payload.name.length > 80) {
    validationErrors.name = "Podaj imię i nazwisko.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) || payload.email.length > 160) {
    validationErrors.email = "Podaj prawidłowy adres e-mail.";
  }

  if (payload.message.length < 20 || payload.message.length > 2000) {
    validationErrors.message = "Opisz sprawę w co najmniej 20 znakach.";
  }

  if (!payload.consent) {
    validationErrors.consent = "Zaznacz zgodę na kontakt w sprawie zapytania.";
  }

  return validationErrors;
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      topic: String(form.get("topic") ?? ""),
      message: String(form.get("message") ?? ""),
      consent: form.get("consent") === "on",
      website: String(form.get("website") ?? ""),
    };

    const clientErrors = validatePayload(payload);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setStatus("error");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        errors?: FieldErrors;
      };

      if (!response.ok) {
        setErrors(result.errors ?? {});
        setStatus("error");
        return;
      }

      formElement.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.formHeader}>
        <p className={styles.formLabel}>Pierwszy krok</p>
        <h2>Opisz, czego potrzebujesz.</h2>
        <p>Im więcej kontekstu podasz, tym łatwiej będzie wskazać właściwy kierunek rozmowy.</p>
      </div>

      {status === "error" ? (
        <p className={styles.formAlert} role="alert">
          {Object.keys(errors).length > 0
            ? "Sprawdź zaznaczone pola i spróbuj ponownie."
            : "Nie udało się wysłać formularza. Spróbuj ponownie."}
        </p>
      ) : null}
      {status === "success" ? (
        <p className={styles.formSuccess} role="status">Dziękujemy. To demonstracyjny formularz — wiadomość nie została wysłana.</p>
      ) : null}

      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor="contact-name">Imię i nazwisko</label>
          <input id="contact-name" name="name" autoComplete="name" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} />
          {errors.name ? <span id="contact-name-error" className={styles.error}>{errors.name}</span> : null}
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-email">Adres e-mail</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} />
          {errors.email ? <span id="contact-email-error" className={styles.error}>{errors.email}</span> : null}
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-phone">Telefon <span>(opcjonalnie)</span></label>
          <input id="contact-phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-topic">Temat rozmowy <span>(opcjonalnie)</span></label>
          <select id="contact-topic" name="topic" defaultValue="">
            <option value="">Wybierz temat</option>
            <option value="osoba-prywatna">Sprawa prywatna</option>
            <option value="firma">Wsparcie firmy</option>
            <option value="inne">Inny temat</option>
          </select>
        </div>
        <div className={`${styles.field} ${styles.fieldWide}`}>
          <label htmlFor="contact-message">Krótki opis sprawy</label>
          <textarea id="contact-message" name="message" rows={6} required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} />
          {errors.message ? <span id="contact-message-error" className={styles.error}>{errors.message}</span> : null}
        </div>
      </div>

      <div className={styles.formFooter}>
        <label className={styles.consent}>
          <input name="consent" type="checkbox" required aria-invalid={Boolean(errors.consent)} />
          <span>
            Zgadzam się na kontakt w sprawie przesłanego zapytania. {" "}
            <Link href="/polityka-prywatnosci">Polityka prywatności</Link>
          </span>
        </label>
        {errors.consent ? <span className={styles.error}>{errors.consent}</span> : null}
        <button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Wysyłanie…" : "Wyślij zapytanie"}
        </button>
      </div>

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="contact-website">Strona internetowa</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
    </form>
  );
}
