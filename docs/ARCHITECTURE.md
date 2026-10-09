# Architektura

## Kontekst

Projekt jest niezależnym konceptem portfolio dla strony lokalnej kancelarii prawnej. Priorytetem jest wysoki sygnał inżynierski przy ograniczonym zakresie: dostępny interfejs, świadome strategie renderowania, wyraźna granica CMS i testowane zachowanie.

Projekt nie jest oficjalną stroną kancelarii. Architektura i treści nie mogą sugerować relacji z klientem ani potwierdzać niezweryfikowanych usług lub danych.

## Aktualny zakres

Obecna implementacja obejmuje wyłącznie stronę główną. Pozostałe docelowe strony, formularz kontaktowy, pełne SEO i integracja CMS są planowane.

## Przepływ danych

```text
environment variables
        │
        ▼
getContentRepository()
        │
        ├── CONTENT_SOURCE=mock ──────► MockContentRepository
        │
        └── CONTENT_SOURCE=wordpress ─► WordPressContentRepository
                                              │
                                              ▼
                                       WPGraphQL response
        │                                     │
        └──────────────────┬──────────────────┘
                           ▼
                  application models
                           ▼
                    async Home page
                           ▼
                  presentational sections
```

`ContentRepository` jest granicą aplikacyjną. Komponenty React otrzymują modele `Service` i `FirmProfile`, a nie surowe obiekty WPGraphQL.

## Warstwy

### Routing i kompozycja

`src/app` korzysta z App Routera. `page.tsx` jest asynchronicznym Server Component odpowiedzialnym za:

- wybór repozytorium treści,
- równoległe pobranie usług i profilu kancelarii,
- przekazanie gotowych modeli do synchronicznych komponentów prezentacyjnych.

Strona główna nie wymaga JavaScriptu klienckiego do podstawowego działania.

### Komponenty

`src/components` zawiera małe komponenty powiązane z konkretnymi sekcjami:

- `ConceptNotice` — obowiązkowa informacja o charakterze projektu,
- `SiteHeader` — wordmark i nawigacja kotwicowa,
- `HeroSection` — główny komunikat demonstracyjny,
- `ServicesSection` — lista usług i empty state,
- `ContactSection` — tylko zweryfikowane lub jawnie nieuzupełnione dane.

Komponenty są synchroniczne i otrzymują dane przez props. Pozwala to testować ich zachowanie bez sprzęgania testów z pobieraniem danych.

### Modele i dostęp do treści

`src/lib/content` zawiera:

- modele domenowe niezależne od CMS,
- interfejs `ContentRepository`,
- fabrykę wybierającą źródło na podstawie `CONTENT_SOURCE`,
- adapter mock,
- adapter WordPress/WPGraphQL.

Nieprawidłowa wartość `CONTENT_SOURCE` powoduje jawny błąd zamiast cichego przełączenia źródła.

### Adapter mock

Mock jest domyślnym źródłem. Usługi są oznaczone jako demonstracyjne, a numer telefonu, email i pełny adres nie są fabrykowane. Adapter pozwala rozwijać UI bez udawania działającej integracji CMS.

### Adapter WordPress

Adapter zawiera zapytania i mapowanie dla usług, artykułów oraz profilu kancelarii. Wykorzystuje `fetch` z rewalidacją co 300 sekund i tagiem `wordpress-content`.

Aktualne ograniczenie: adapter nie został jeszcze uruchomiony przeciwko zweryfikowanemu schematowi WordPress + ACF + WPGraphQL. Nazwy typów, pól i relacji są kontraktem koncepcyjnym, nie potwierdzoną integracją produkcyjną.

## Strategia renderowania

Strona główna eksportuje `revalidate = 300`, dlatego build może wygenerować statyczny HTML, a środowisko produkcyjne może odświeżać go maksymalnie co 5 minut.

Ta strategia pasuje do treści kancelarii, które zmieniają się rzadko i nie wymagają renderowania per request. Docelowo webhook z CMS może wywoływać precyzyjną rewalidację po publikacji.

## Styling

- globalne tokeny kolorów, fontów i szerokości znajdują się w `src/app/globals.css`,
- komponenty używają SCSS Modules,
- layout ma breakpoint mobilny przy 700 px,
- animacje są wyłączane dla `prefers-reduced-motion: reduce`,
- globalny `:focus-visible` zapewnia widoczny fokus klawiatury.

Nie istnieje rozbudowany design system. Tokeny i moduły pozostają celowo małe.

## Dostępność

Aktualne podstawy:

- dokument ma `lang="pl"`,
- strona używa `header`, `nav`, `main`, `section`, `article` i `address`,
- sekcje są nazwane przez `aria-labelledby`,
- hierarchia nagłówków jest sprawdzana testem,
- dekoracyjne strzałki są ukryte przez `aria-hidden`,
- fokus jest widoczny,
- UI respektuje reduced motion.

Planowane testy E2E powinny objąć nawigację klawiaturą, kolejność fokusu i krytyczne ścieżki formularza.

## Testowanie

Jest z `next/jest` obsługuje transformacje Next.js, alias `@/` i mockowanie modułów SCSS. React Testing Library sprawdza zachowanie przez role i widoczną treść.

Testy jednostkowe obejmują synchroniczne komponenty oraz repozytorium mocków. Asynchroniczne Server Components zostaną pokryte przez Playwright, ponieważ Jest nie zapewnia jeszcze pełnego wsparcia dla tego wzorca.

## Build

Produkcja jest budowana komendą `next build --webpack`. Webpack jest oficjalnym fallbackiem Next.js i poprawnie kompiluje SCSS w obecnym środowisku. Domyślny Turbopack próbował otworzyć lokalny port podczas ewaluacji loadera SCSS i kończył się błędem środowiskowym `EPERM`.

Konfiguracja `useTypeScriptCli: false` pozostaje tymczasowym obejściem dla zachowania typechecku w procesie Next.js w używanej kombinacji Linux/Node. Oba obejścia powinny zostać ponownie ocenione przy zmianie środowiska.

## Bezpieczeństwo i uczciwość treści

- sekrety nie są potrzebne w przeglądarce,
- endpoint WPGraphQL jest zmienną serwerową,
- nie ma jeszcze formularza ani obsługi danych użytkownika,
- treści mock nie zawierają fikcyjnych kwalifikacji, wyników, opinii ani danych kontaktowych,
- HTML z WordPressa nie jest jeszcze renderowany w UI; przed wdrożeniem treści rich text potrzebna będzie jawna strategia sanitacji.

## Znane ograniczenia

- tylko strona Home jest zaimplementowana,
- brak prawdziwego CMS i testów kontraktowych WPGraphQL,
- brak Playwright i testów E2E,
- brak formularza kontaktowego,
- brak kompletnego SEO i danych strukturalnych,
- brak ustalonego minimalnego Node.js oraz pliku `.nvmrc`,
- alerty `npm audit` dotyczą drzewa narzędzi developerskich; zależności produkcyjne przechodzą `npm audit --omit=dev` bez zgłoszeń.
