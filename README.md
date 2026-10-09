# Maciejewski Kancelaria — portfolio redesign concept

Niezależny koncept redesignu strony lokalnej kancelarii radcy prawnego z Ostrowa Wielkopolskiego. Projekt służy wyłącznie jako portfolio frontendowe.

> [!IMPORTANT]
> Projekt nie został zamówiony, zatwierdzony ani zweryfikowany przez kancelarię i nie jest jej oficjalną stroną. Nazwy usług oraz pozostałe niezweryfikowane treści są oznaczone jako demonstracyjne. Projekt nie przedstawia prawdziwych wyników, opinii klientów ani danych biznesowych.

## Aktualny stan

Zaimplementowany jest pierwszy kompletny vertical slice strony głównej:

- responsywny nagłówek, hero, sekcja usług i sekcja kontaktowa,
- widoczna informacja o charakterze projektu,
- przykładowe dane dostarczane przez jawny adapter mock,
- domenowe modele `Service`, `Article` i `FirmProfile`,
- granica `ContentRepository` oddzielająca UI od struktur CMS,
- wstępny adapter WordPress/WPGraphQL,
- statyczne generowanie strony z rewalidacją co 5 minut,
- SCSS Modules, semantyczny HTML i obsługa reduced motion,
- testy jednostkowe i komponentowe w Jest oraz React Testing Library.

Adapter WordPress jest przygotowany koncepcyjnie, ale nie został jeszcze zweryfikowany z działającą instancją WordPressa i nie powinien być traktowany jako ukończona integracja.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript w trybie strict
- Sass / SCSS Modules
- Jest 30
- React Testing Library
- ESLint

## Architektura w skrócie

```text
WordPress + ACF + WPGraphQL (planowane źródło produkcyjne)
                         │
                         ▼
                ContentRepository
                    ┌────┴────┐
                    ▼         ▼
             Mock adapter   WordPress adapter
                    │
                    ▼
               modele domenowe
                    │
                    ▼
            Server Components + UI
```

Komponenty nie korzystają bezpośrednio z odpowiedzi WPGraphQL. Mapowanie danych CMS do modeli aplikacji pozostaje w `src/lib/content`.

Więcej informacji:

- [Architektura](docs/ARCHITECTURE.md)
- [Decyzje techniczne](docs/DECISIONS.md)
- [Plan rozwoju](docs/DEVELOPMENT_PLAN.md)

## Uruchomienie lokalne

Projekt został zweryfikowany na Node.js `24.16.0` i npm `11.13.0`. Repozytorium nie definiuje jeszcze oficjalnej minimalnej wersji Node.js.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Następnie otwórz [http://localhost:3000](http://localhost:3000).

## Źródło treści

Domyślnie aplikacja używa danych demonstracyjnych:

```env
CONTENT_SOURCE=mock
```

Jawne przełączenie na adapter WordPress wymaga obu wartości:

```env
CONTENT_SOURCE=wordpress
WORDPRESS_GRAPHQL_URL=http://example.local/graphql
```

Tryb WordPress wymaga zgodnego schematu WPGraphQL/ACF. Integracja nie została jeszcze przetestowana end-to-end z realnym CMS.

## Komendy

```bash
npm run dev          # serwer deweloperski
npm test             # testy uruchamiane jednokrotnie
npm run test:watch   # testy w trybie obserwowania zmian
npm run lint         # ESLint
npx tsc --noEmit     # kontrola typów
npm run build        # produkcyjny build przez Webpack
npm start            # uruchomienie istniejącego buildu
```

Webpack jest obecnie wybrany jawnie dla produkcyjnego builda, ponieważ Turbopack nie mógł uruchomić pomocniczego procesu SCSS w używanym środowisku wykonawczym. Decyzja jest opisana w `docs/DECISIONS.md` i powinna zostać ponownie oceniona przy aktualizacji środowiska lub Next.js.

## Weryfikacja

Aktualny zestaw testów sprawdza:

- widoczność informacji o koncepcie portfolio,
- hierarchię nagłówków na Home,
- oznaczenie demonstracyjnych usług,
- pusty stan listy usług,
- brak fikcyjnych linków `tel:` i `mailto:`,
- podstawowe zachowanie repozytorium mocków.

Asynchroniczny Server Component strony głównej nie jest testowany bezpośrednio w Jest. Zgodnie z dokumentacją Next.js takie scenariusze będą pokrywane testami E2E w późniejszym etapie.

## Zakres planowany

- strony About, Services i Service detail,
- strony Articles i Article detail,
- formularz kontaktowy z walidacją po obu stronach,
- Privacy Policy,
- pełniejsze SEO, dane strukturalne, sitemap i robots,
- testy E2E krytycznych ścieżek,
- zweryfikowana integracja WordPress + ACF + WPGraphQL,
- CI/CD i wdrożenie portfolio.

Funkcje z tej listy nie są jeszcze zaimplementowane.
