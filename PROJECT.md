# Kystopplevelser — Project Guide

Marketing & booking website for **Kystopplevelser AS**, a Bergen-based coastal
experience company offering RIB tours, boat rental, and floating sauna. This
document orients new developers and AI agents to the codebase.

> Production: https://kystopplevelser.no — deployed on **Vercel**.

---

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | **Next.js 16** (App Router, React 19) |
| Language | TypeScript (strict) |
| i18n | **next-intl** v4 — Norwegian (`nb`, default) + English (`en`) |
| Styling | Hand-written CSS in `src/css/` (no Tailwind/CSS-in-JS) |
| Fonts | `next/font/google` — Fraunces, DM Serif Display, Inter |
| Images / video | **Uploadcare CDN** (`ucarecdn.com`) via the `uc()` helper |
| Booking form | Posts to **Basin** (`usebasin.com`) — no backend |
| Visuals | `@paper-design/shaders-react` (animated WebGL hero background) |
| Analytics | **Google Tag Manager** (`GTM-M8KCC74Q`) |
| Other widget | BusinessBooster agent (chat/booster script) |

There is **no database and no API layer** — this is a static/SSG marketing site.
All copy lives in JSON translation files; all media is served from Uploadcare.

---

## Commands

```bash
npm run dev     # local dev server (next dev)
npm run build   # production build
npm run start   # serve the production build
npx tsc --noEmit  # typecheck (no test suite exists)
```

---

## Directory layout

```
src/
├── app/
│   ├── layout.tsx              # ROOT layout: <html>, <head>, SEO metadata,
│   │                           #   JSON-LD, GTM, BusinessBooster, ThemeScript
│   └── [locale]/               # all localized pages live here
│       ├── layout.tsx          # NextIntlClientProvider, Nav, Footer, fonts
│       ├── page.tsx            # home
│       ├── rib-tur-bergen/     # RIB tours (en: /rib-tour-bergen)
│       ├── baatutleie-bergen/  # boat rental (en: /boat-rental-bergen)
│       ├── sauna-badstue-bergen/ # sauna (en: /sauna-bergen)
│       ├── opplevelser/        # experiences overview (en: /experiences)
│       ├── bestilling/         # booking form page (en: /booking)
│       ├── om-oss/             # about (en: /about)
│       ├── galleri/            # gallery (en: /gallery)
│       └── personvern/         # privacy (en: /privacy)
├── components/                 # presentational React components (see below)
├── css/                        # global stylesheets, imported in [locale]/layout
│   ├── design-system.css       # CSS variables: colors, spacing, type scale
│   ├── layout.css
│   ├── components.css
│   ├── animations.css
│   └── services.css
├── i18n/
│   ├── routing.ts              # locales + localized pathnames (single source of truth)
│   ├── request.ts              # loads messages/{locale}.json per request
│   └── navigation.ts           # locale-aware Link/redirect/useRouter wrappers
├── lib/
│   └── uploadcare.ts           # uc() — builds Uploadcare transform URLs
└── proxy.ts                    # next-intl middleware + legacy URL redirects
messages/
├── nb.json                     # Norwegian copy (default)
└── en.json                     # English copy
public/                         # favicon, icons, webmanifest, llms.txt
```

---

## Key concepts

### Internationalization
- **`src/i18n/routing.ts` is the source of truth** for locales and URL slugs.
  Norwegian and English have *different* slugs (e.g. `/rib-tur-bergen` ↔
  `/rib-tour-bergen`) mapped via the `pathnames` table.
- `localePrefix: 'as-needed'` → Norwegian URLs have **no prefix**, English URLs
  are prefixed with `/en`.
- Always import navigation helpers (`Link`, `useRouter`, `redirect`) from
  **`@/i18n/navigation`**, never from `next/link` / `next/navigation`, so locale
  routing works.
- Copy is read with `useTranslations('namespace')` (client/sync) or
  `getTranslations({ locale, namespace })` (server/async, e.g. in
  `generateMetadata`). Namespaces: `nav`, `footer`, `home`, `rib`, `boat`,
  `sauna`, `booking`, `gallery`, `metadata`, `aboutPage`, `experiences`,
  `privacy`. Add new strings to **both** `messages/nb.json` and `messages/en.json`.

### Routing / redirects
- `src/proxy.ts` is the Next.js middleware. It first maps **legacy URLs** (old
  Webflow / old site paths) to new ones via a 308 redirect, then delegates to the
  next-intl middleware. The same legacy redirects are also declared in
  `next.config.ts` (`redirects()`) as a build-level safety net — keep the two in
  sync if you change them.

### Images & media
- All media is on Uploadcare. Use the **`uc(url, { width, quality })`** helper
  (`src/lib/uploadcare.ts`) to append CDN transforms (`-/format/auto`,
  `-/quality/smart`, `-/resize/{width}x`). `next.config.ts` whitelists
  `ucarecdn.com` for `next/image`.

### Theming
- Light/dark theme toggle. `src/components/ThemeScript.tsx` is an inline script in
  `<head>` that reads `localStorage['kyst-theme']` and sets `data-theme` on
  `<html>` *before* hydration to avoid a flash. `ThemeToggle.tsx` flips it.

### SEO
- Rich metadata + Open Graph live in `src/app/layout.tsx`, with JSON-LD
  structured data (`TouristAttraction`, `WebSite`, `TouristTrip`, `Product`).
  Per-page metadata (incl. canonical + `hreflang` alternates) is generated in each
  page's `generateMetadata`.

### Analytics — Google Tag Manager
- Container **`GTM-M8KCC74Q`** is installed in `src/app/layout.tsx`:
  the loader `<Script id="gtm" strategy="afterInteractive">` in `<head>` and the
  `<noscript>` iframe fallback at the top of `<body>`.

---

## Components (`src/components/`)

| Component | Role |
| --- | --- |
| `Nav` / `NavDrawer` | Top nav (transparent→scrolled via IntersectionObserver), mobile drawer, locale switch, theme toggle. **client** |
| `Footer` | Site footer, social links. |
| `Hero` | Page hero; optional video or `WarpShaderBg` animated background. |
| `WarpShaderBg` | WebGL animated gradient (paper-design shaders). **client** |
| `ServiceHubCard` | Linked card for a service (home grid). |
| `FeatureSplit` | Alternating image/text content block (`reversed` prop). |
| `CtaBlock` | Full-width call-to-action band. |
| `Gallery` | Image grid for the gallery page. |
| `BookingForm` | Booking form; posts to Basin, prefills from `?` query params. **client** |
| `ScrollReveal` | Adds reveal-on-scroll animations to `.reveal` elements. **client** |
| `ThemeScript` / `ThemeToggle` | Theme persistence + toggle. |
| `CheckIcon` | Small inline SVG checkmark. |

---

## Conventions & gotchas

- **No tests, no linter config** beyond `tsc`. Verify changes with `npx tsc --noEmit`
  and `npm run build`.
- New copy must be added to **both** locale JSON files or `next-intl` will throw on
  the missing key.
- New routes must be added to the `pathnames` map in `src/i18n/routing.ts` (with
  both `nb` and `en` slugs) to be reachable and properly localized.
- Use `@/` import alias for `src/` (configured in `tsconfig.json`).
- Security headers are set in `vercel.json`.
- `public/llms.txt` exists for AI crawlers — update it if site structure changes.
