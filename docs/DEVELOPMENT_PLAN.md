# Plan rozwoju

## Cel

Zbudować 5–7 dopracowanych przepływów pokazujących umiejętności potrzebne na stanowisku Frontend Developer: Next.js, React, TypeScript, WordPress, ACF, WPGraphQL, SCSS, dostępność, testy, SEO i wydajność.

Priorytetem nie jest liczba podstron, lecz jakość architektury, zachowania i dokumentacji.

## Stan obecny

### Ukończone

- scaffold Next.js 16 z App Routerem,
- vertical slice Home,
- responsywny layout desktop/mobile,
- widoczny disclaimer konceptu portfolio,
- modele domenowe i `ContentRepository`,
- jawny adapter mock,
- wstępny adapter WordPress/WPGraphQL,
- SSG/ISR Home z rewalidacją co 5 minut,
- SCSS Modules i podstawowe wymagania dostępności,
- Jest + React Testing Library,
- 8 testów zachowania,
- powtarzalny build Webpack,
- podstawowa dokumentacja projektu.

### Częściowo przygotowane

- integracja WordPress: istnieją zapytania i mapowanie, brak zweryfikowanego CMS,
- modele artykułów: istnieją typy i metody repozytorium, brak UI oraz danych,
- SEO: istnieją podstawowe metadane, brak pełnej strategii.

### Niezaimplementowane

- About,
- Services index,
- Service detail,
- Articles index,
- Article detail,
- Contact page i formularz,
- Privacy Policy,
- Playwright/E2E,
- sitemap, robots, canonical i structured data,
- CI/CD i deployment.

## Następne etapy

### Etap 4: Services flow

**Cel:** Pierwszy pełny przepływ treści domenowej poza Home.

Zakres:

- `/uslugi` z listą usług,
- `/uslugi/[slug]` z `generateStaticParams`,
- metadata per usługa,
- stany `notFound` i pusta lista,
- komponenty współdzielone tylko tam, gdzie istnieje realne reuse,
- testy repozytorium oraz zachowania listy i detailu.

Definition of Done:

- mock i modele obsługują cały przepływ,
- linki z Home prowadzą do istniejących tras,
- klawiatura i focus są sprawdzone,
- lint, typecheck, testy i build przechodzą,
- dokumentacja odzwierciedla implementację.

### Etap 5: Articles flow

**Cel:** Pokazać relacje treści, daty publikacji i bezpieczne renderowanie contentu.

Zakres:

- `/artykuly`,
- `/artykuly/[slug]`,
- kategorie, autor i data,
- relacje artykuł–usługa,
- strategia sanitacji HTML z CMS,
- metadata i dane strukturalne `Article`.

Najważniejsze ryzyko: renderowanie HTML pochodzącego z WordPressa wymaga jawnej sanitacji i nie może zostać wdrożone przez niekontrolowane `dangerouslySetInnerHTML`.

### Etap 6: Contact flow

**Cel:** Zaimplementować najważniejszą interakcję użytkownika.

Zakres:

- osobna strona kontaktowa,
- klientowa i serwerowa walidacja,
- dostępne komunikaty błędów,
- loading, success i failure state,
- zabezpieczenia przed spamem i nadużyciem,
- brak realnej wysyłki email bez jawnej konfiguracji.

Testy powinny obejmować klawiaturę, błędne dane, sukces, błąd serwera oraz ponowną próbę.

### Etap 7: Informational pages i SEO

**Cel:** Domknąć wiarygodny zakres strony kancelarii.

Zakres:

- About,
- Privacy Policy,
- sitemap i robots,
- canonical URLs,
- Open Graph,
- LocalBusiness/LegalService structured data wyłącznie dla zweryfikowanych informacji.

Nie wolno dodawać fikcyjnych kwalifikacji, lat doświadczenia, wyników spraw, opinii ani nagród.

### Etap 8: WordPress integration

**Cel:** Zastąpić mock rzeczywistym, zweryfikowanym kontraktem CMS.

Zakres:

- konfiguracja custom post types i ACF,
- potwierdzenie schematu WPGraphQL,
- testy kontraktowe mapowania,
- obsługa błędów, timeoutów i pustych odpowiedzi,
- webhook do rewalidacji,
- udokumentowany fallback lokalny.

Ten etap wymaga działającej instancji CMS. Do tego czasu mock pozostaje oficjalnym źródłem developerskim.

### Etap 9: E2E, performance i delivery

**Cel:** Przygotować projekt do prezentacji portfolio.

Zakres:

- Playwright dla krytycznych ścieżek,
- audyt dostępności,
- Core Web Vitals i optymalizacja obrazów/fontów,
- CI uruchamiające lint, typecheck, testy i build,
- deployment portfolio,
- końcowy przegląd uczciwości treści.

## Najbliższy krok

Po zaakceptowaniu obecnej dokumentacji należy przygotować pierwszy focused commit obejmujący fundament Home, warstwę treści, testy i dokumentację. Commit i push wymagają osobnej zgody.

Następnie rekomendowany jest Etap 4 — Services flow — ponieważ wykorzystuje istniejące modele i repozytorium, a jednocześnie pokazuje routing dynamiczny, SSG/ISR i metadata bez dokładania nowej infrastruktury.
