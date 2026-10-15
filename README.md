# Maciejewski Kancelaria — redesign concept

To jest niezależny koncept strony internetowej lokalnej kancelarii radcy prawnego z Ostrowa Wielkopolskiego. Zrobiłem go jako projekt do portfolio, żeby pokazać sposób pracy z Next.js, TypeScript, SCSS i treścią, która docelowo mogłaby być zarządzana w WordPressie.

Projekt nie jest oficjalną stroną kancelarii. Nie został przez nią zamówiony, zatwierdzony ani zweryfikowany. Dane i opisy, których nie dało się potwierdzić, są w aplikacji oznaczone jako demonstracyjne.

## Co znajduje się w projekcie

Strona ma kilka podstawowych ścieżek, które zwykle są potrzebne na stronie kancelarii:

- strona główna, informacje o kancelarii i polityka prywatności,
- lista usług oraz osobne strony poszczególnych usług,
- lista artykułów i strony pojedynczych artykułów,
- formularz kontaktowy z walidacją po stronie przeglądarki i serwera,
- stany błędu, sukcesu i pustych list,
- responsywny layout oraz podstawy dostępności,
- metadata, Open Graph, sitemap, robots i dane strukturalne.

Treści są obecnie dostarczane z lokalnego adaptera mock. Dzięki temu aplikację można uruchomić bez przygotowywania WordPressa, a jednocześnie interfejs nie jest bezpośrednio zależny od struktur odpowiedzi CMS.

## WordPress i architektura

Docelowy przepływ danych wygląda tak:

```text
WordPress + ACF + WPGraphQL
            ↓
      adapter treści
            ↓
      modele aplikacji
            ↓
      strony i komponenty Next.js
```

W kodzie tę granicę reprezentuje `ContentRepository`. Jest dostępny adapter mock oraz przygotowany adapter WordPress/WPGraphQL.

## Technologie

- Next.js 16 z App Routerem,
- React 19,
- TypeScript w trybie strict,
- Sass i SCSS Modules,
- Jest, React Testing Library i Playwright,
- ESLint,
- WordPress, ACF i WPGraphQL jako planowane źródło treści.

Strony korzystają z Server Components tam, gdzie nie jest potrzebna interakcja po stronie klienta. Dane są generowane statycznie i odświeżane co pięć minut. Formularz kontaktowy jest jedynym większym fragmentem wymagającym własnej logiki klienckiej.

## Uruchomienie

Projekt był sprawdzany na Node.js `24.16.0` i npm `11.13.0`.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Aplikacja będzie dostępna pod adresem [http://localhost:3000](http://localhost:3000).

Domyślnie używany jest adapter mock:

```env
CONTENT_SOURCE=mock
```

Adapter WordPress można wybrać jawnie:

```env
CONTENT_SOURCE=wordpress
WORDPRESS_GRAPHQL_URL=http://example.local/graphql
```

Do działania tego trybu potrzebna jest instancja WordPressa z odpowiednim schematem WPGraphQL i polami ACF.

## Przydatne komendy

```bash
npm run dev          # serwer developerski
npm test             # testy Jest
npm run test:e2e     # testy Playwright
npm run lint         # ESLint
npx tsc --noEmit     # sprawdzenie typów
npm run build        # produkcyjny build
npm start            # uruchomienie gotowego buildu
```

Testy E2E wymagają zainstalowanej przeglądarki Chromium:

```bash
npx playwright install chromium
```

## Weryfikacja

Obecnie przechodzą:

- 12 testów Jest,
- 4 testy Playwright obejmujące nawigację, usługę i formularz kontaktowy,
- ESLint,
- kontrola typów TypeScript,
- produkcyjny build Next.js.

CI uruchamia te same kontrole przy zmianach na głównej gałęzi.

## Co jeszcze można rozwinąć

Najważniejszym kolejnym krokiem byłoby podłączenie projektu do rzeczywistego WordPressa i potwierdzenie kontraktu WPGraphQL/ACF. Formularz pozostaje demonstracyjny — nie wysyła prawdziwych wiadomości i nie zawiera konfiguracji zewnętrznej usługi mailingowej.

Wdrożenie online portfolio również nie jest częścią tego repozytorium. Projekt ma przede wszystkim pokazać sposób myślenia, strukturę kodu i podejście do jakości frontendowej.
