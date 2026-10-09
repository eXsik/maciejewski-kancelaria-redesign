# Decyzje techniczne

Dokument zapisuje decyzje, które mają wpływ na dalszy rozwój projektu. Datą początkowego zestawu decyzji jest 2026-10-09.

## ADR-001: Next.js App Router i Server Components

**Status:** zaakceptowana

**Problem:** Projekt ma demonstrować współczesny Next.js, dobrą wydajność i minimalny JavaScript po stronie klienta.

**Decyzja:** Używamy App Routera. Pobieranie treści i kompozycja Home odbywają się w asynchronicznym Server Component, a sekcje prezentacyjne pozostają synchroniczne.

**Konsekwencje:**

- podstawowa strona może być statycznie renderowana,
- dane CMS i zmienne środowiskowe pozostają na serwerze,
- interaktywne fragmenty będą wymagały jawnej granicy `"use client"`,
- async Server Components będą docelowo testowane przez E2E zamiast bezpośrednio w Jest.

## ADR-002: Repozytorium treści jako granica CMS

**Status:** zaakceptowana

**Problem:** Bezpośrednie używanie odpowiedzi WordPressa w całym UI utrudniłoby testowanie i zmianę źródła danych.

**Decyzja:** UI zależy od `ContentRepository` oraz modeli domenowych. Każde źródło mapuje własne dane przed przekazaniem ich komponentom.

**Alternatywa:** Pobieranie WPGraphQL bezpośrednio w każdej stronie.

**Trade-off:** Powstaje dodatkowa warstwa i kod mapujący, ale CMS nie przenika do komponentów i można rozwijać frontend na kontrolowanym mocku.

## ADR-003: Mock jako jawne źródło domyślne

**Status:** zaakceptowana

**Problem:** Nie ma potwierdzonej, stabilnej instancji CMS, a projekt nie może udawać realnej integracji.

**Decyzja:** Brak `CONTENT_SOURCE` oznacza `mock`. WordPress jest wybierany wyłącznie przez `CONTENT_SOURCE=wordpress`; sam endpoint nie przełącza adaptera.

**Konsekwencje:**

- lokalny development i build są deterministyczne,
- przypadkowo pozostawiony endpoint nie powoduje połączenia z CMS,
- niezweryfikowane treści muszą pozostać oznaczone jako demonstracyjne.

## ADR-004: SSG/ISR z rewalidacją 300 sekund

**Status:** zaakceptowana dla Home

**Problem:** Treści informacyjne zmieniają się rzadko, więc SSR per request byłby zbędnym kosztem.

**Decyzja:** Home eksportuje `revalidate = 300`. Zapytania adaptera WordPress używają tego samego okna oraz tagu `wordpress-content`.

**Alternatywy:**

- pełne SSG bez rewalidacji — prostsze, ale wymaga redeployu po zmianie treści,
- SSR — świeże dane na każde żądanie, ale większy koszt i wolniejsza odpowiedź,
- Cache Components — do ponownej oceny, gdy projekt będzie tego potrzebował.

**Trade-off:** Zmiana w CMS może być widoczna z opóźnieniem do 5 minut. Docelowy webhook może skrócić to opóźnienie.

## ADR-005: SCSS Modules i mały zestaw tokenów

**Status:** zaakceptowana

**Problem:** Projekt ma pokazywać Sass, utrzymywalne style i izolację komponentów bez budowania dużego design systemu.

**Decyzja:** Globalne tokeny i reset pozostają w `globals.css`, a komponenty korzystają z `.module.scss`.

**Trade-off:** Część stylów sekcji Home jest współdzielona w jednym module, co jest wystarczające dla obecnego zakresu. Rozdzielenie modułu będzie zasadne dopiero wtedy, gdy komponenty zaczną ewoluować niezależnie.

## ADR-006: Webpack dla produkcyjnego builda

**Status:** tymczasowa

**Problem:** Turbopack w używanym środowisku nie może związać lokalnego portu podczas ewaluacji loadera SCSS i kończy build błędem `EPERM`. Sam Sass oraz build Webpack działają poprawnie.

**Decyzja:** Skrypt `build` używa `next build --webpack`.

**Alternatywy:**

- pozostawienie domyślnego Turbopacka i akceptacja niedziałającego lokalnego builda,
- zmiana lub aktualizacja środowiska bez potwierdzonego rozwiązania,
- rezygnacja z SCSS, sprzeczna z celem projektu.

**Trade-off:** Nie korzystamy obecnie z domyślnego bundlera Next.js 16. Decyzję należy ponownie ocenić po zmianie środowiska lub wersji frameworka.

## ADR-007: Jest i React Testing Library dla synchronicznych granic

**Status:** zaakceptowana

**Problem:** Projekt potrzebuje testów zachowania, ale Jest nie obsługuje w pełni asynchronicznych Server Components.

**Decyzja:** Jest testuje synchroniczne komponenty i repozytoria. Testy używają ról, nagłówków i treści zamiast klas CSS lub snapshotów. Async strony będą testowane przez Playwright.

**Trade-off:** Obecny zestaw nie sprawdza całej strony jako jednej jednostki. Zachowujemy za to szybkie i stabilne testy właściwych granic.

## ADR-008: Stałe oznaczenie konceptu portfolio

**Status:** zaakceptowana

**Problem:** Projekt wykorzystuje nazwę realnej kancelarii, ale nie może sugerować zlecenia ani aprobaty.

**Decyzja:** Informacja o niezależnym koncepcie jest widoczna na stronie niezależnie od źródła treści. Mockowe usługi otrzymują dodatkowe oznaczenie demonstracyjne, a niezweryfikowane dane kontaktowe pozostają puste.

**Konsekwencje:** Uczciwość portfolio ma pierwszeństwo przed pozorem kompletnej strony produkcyjnej.

## ADR-009: Tymczasowe wyłączenie TypeScript CLI w Next.js

**Status:** tymczasowa

**Problem:** W używanej kombinacji Linux/Node proces CLI TypeScript tracił wynik `--showConfig`.

**Decyzja:** `experimental.useTypeScriptCli` pozostaje ustawione na `false`, a niezależna kontrola typów działa przez `npx tsc --noEmit`.

**Trade-off:** Korzystamy z eksperymentalnej opcji konfiguracyjnej. Należy ją usunąć, gdy środowisko lub Next.js nie będzie już wymagać obejścia.
