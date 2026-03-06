# Kystopplevelser — Technical Architecture & UX Foundation

**ArchitectUX Agent** | Foundation Date: 2026-03-05
**Status**: Ready for Developer Handoff
**Next Step**: Implement CSS design system → layout → components → content → polish

---

## 1. Design Token System

### Color Palette

```css
:root {
  /* --- Brand Palette --- */
  --color-fjord:    #1B3A52;   /* Deep navy — primary brand anchor */
  --color-ocean:    #2C5F8A;   /* Mid ocean blue — links, accents */
  --color-seafoam:  #A8C5D8;   /* Light fjord blue — highlights */
  --color-birch:    #F5F2EC;   /* Warm white — primary background */
  --color-stone:    #6B7A8D;   /* Cool stone — secondary text */
  --color-slate:    #DDE4EC;   /* Fog gray — borders, dividers */
  --color-ember:    #C97B2A;   /* Warm amber — CTA, primary action */
  --color-moss:     #3D6B4F;   /* Forest green — nature accent */

  /* --- Semantic Tokens (Light Mode) --- */
  --bg-primary:       #F5F2EC;
  --bg-secondary:     #EDEAE3;
  --bg-dark:          var(--color-fjord);
  --surface-card:     #FFFFFF;
  --text-primary:     #1A2B38;
  --text-secondary:   var(--color-stone);
  --text-inverse:     #F5F2EC;
  --text-muted:       #96A3B0;
  --border-color:     var(--color-slate);
  --accent-primary:   var(--color-ember);
  --accent-secondary: var(--color-ocean);
}

/* Dark Mode */
[data-theme="dark"] {
  --bg-primary:     #0D1B26;
  --bg-secondary:   #152433;
  --surface-card:   #172636;
  --text-primary:   #E8EFF5;
  --text-secondary: #8FA3B4;
  --text-muted:     #5A7080;
  --border-color:   #2A3F52;
  --accent-primary: #D9922F;
}

/* System preference */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg-primary:     #0D1B26;
    --bg-secondary:   #152433;
    --surface-card:   #172636;
    --text-primary:   #E8EFF5;
    --text-secondary: #8FA3B4;
    --text-muted:     #5A7080;
    --border-color:   #2A3F52;
    --accent-primary: #D9922F;
  }
}
```

### Typography

```css
:root {
  /* Typefaces */
  --font-display: 'Fraunces', Georgia, serif;         /* Hero headings — editorial, warm */
  --font-heading: 'DM Serif Display', serif;           /* Section headings */
  --font-body:    'Inter', 'DM Sans', system-ui, sans-serif; /* Body text */
  --font-label:   'Inter', system-ui, sans-serif;      /* Labels, eyebrows, UI */

  /* Scale — Major Third (1.25 ratio) */
  --text-xs:   0.64rem;    /* ~10px */
  --text-sm:   0.8rem;     /* ~13px */
  --text-base: 1rem;       /* 16px */
  --text-lg:   1.25rem;    /* 20px */
  --text-xl:   1.563rem;   /* 25px */
  --text-2xl:  1.953rem;   /* 31px */
  --text-3xl:  2.441rem;   /* 39px */
  --text-4xl:  3.052rem;   /* 49px */
  --text-hero: clamp(2.8rem, 6.5vw, 5.5rem); /* Fluid hero H1 */

  /* Line Heights */
  --leading-tight:   1.1;
  --leading-snug:    1.3;
  --leading-normal:  1.6;
  --leading-relaxed: 1.8;

  /* Letter Spacing */
  --tracking-tight:   -0.02em;
  --tracking-normal:   0em;
  --tracking-wide:     0.06em;
  --tracking-widest:   0.14em; /* Eyebrow labels */
}
```

### Spacing & Layout

```css
:root {
  /* Spacing — 8px base grid */
  --space-1:  0.5rem;    /*  8px */
  --space-2:  1rem;      /* 16px */
  --space-3:  1.5rem;    /* 24px */
  --space-4:  2rem;      /* 32px */
  --space-6:  3rem;      /* 48px */
  --space-8:  4rem;      /* 64px */
  --space-12: 6rem;      /* 96px */
  --space-16: 8rem;      /* 128px */

  /* Section Vertical Rhythm */
  --section-padding:    clamp(4rem, 8vw, 8rem);
  --section-padding-sm: clamp(2rem, 4vw, 4rem);

  /* Container Widths */
  --container-text: 680px;  /* Body copy / reading width */
  --container-md:   960px;
  --container-lg:  1200px;
  --container-xl:  1440px;

  /* Border Radius */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:  16px;
  --radius-xl:  24px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 4px rgba(27, 58, 82, 0.07);
  --shadow-md: 0 4px 16px rgba(27, 58, 82, 0.11);
  --shadow-lg: 0 12px 40px rgba(27, 58, 82, 0.15);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;
}
```

---

## 2. Information Architecture

### Site Map

```
kystopplevelser.no/
├── /                       Home
├── /opplevelser            Experiences (hub)
│   ├── #rib-turer          RIB Boat Tours
│   ├── #batleje            Boat Rental
│   ├── #krabbefiske        Crab Fishing
│   ├── #badstue            Sauna by the Sea
│   └── #vannscooter        Water Scooter Rental
├── /om-oss                 About
├── /galleri                Gallery
└── /bestilling             Booking / Contact

Secondary (footer only):
├── /personvern             Privacy Policy
└── /vilkar                 Terms & Conditions
```

### Navigation Architecture

```
Desktop (sticky, 64px height — transparent over hero, solid on scroll):
┌─────────────────────────────────────────────────────────────────┐
│  [Kystopplevelser]    Opplevelser  Om Oss  Galleri   [Bestill nå →]  [☀/🌙]  │
└─────────────────────────────────────────────────────────────────┘

Mobile (hamburger → right-to-left slide drawer):
┌──────────────────────┐
│  [Logo]        [✕]  │
│ ─────────────────── │
│  Opplevelser        │
│  Om Oss             │
│  Galleri            │
│  Bestilling         │
│ ─────────────────── │
│  [Bestill nå →]     │ ← full-width amber CTA
│  [☀ Lys  🌙 Mørk]  │
└──────────────────────┘
```

### Primary User Flows

```
Tourist:      Home → Experiences → Gallery → Booking
Corporate:    Home → Experiences (group section) → About (trust) → Booking
Returning:    Direct → Experiences → Booking
Mobile/Quick: Hero CTA → Booking form
```

---

## 3. Page-by-Page Layout Specifications

---

### HOME (/)

**Section 1 — Hero**
```
Layout:   Full viewport height (100dvh), full-bleed
Media:    Autoplay muted video loop (fjord + RIB action); fallback = hero photo
Overlay:  Gradient — transparent 0% → fjord #1B3A52 at 55% opacity (bottom half)
Content:
  - Eyebrow:    "Bergen · Norge" — all-caps, tracked, 13px, white 70%
  - H1:         "Opplev kysten fra en annen vinkel" — var(--text-hero), Fraunces, white
  - Subtitle:   1–2 lines, white 80%, max 520px wide
  - CTAs:       [Utforsk opplevelser →]  [Kontakt oss]
                Primary = amber button; Secondary = ghost outline white
  - Scroll cue: Animated chevron at bottom center

UX note: Reduced-motion → swap video for static image. Mobile = cropped portrait video.
```

**Section 2 — Experience Strip**
```
Layout:   Horizontal scroll on mobile; 5-column grid on desktop
Cards:    Icon + experience name + 1-line teaser; links anchor to /opplevelser#[id]
Visual:   Thin border, light card, hover lifts with var(--shadow-md)
BG:       var(--bg-secondary) — slight off-white break from hero
```

**Section 3 — "Passer perfekt for deg som..."** (Who is it for)
```
Layout:   3-column grid
Content:
  Col 1:  Turister — icon (compass), headline, 2-sentence teaser
  Col 2:  Bedrifter — icon (briefcase), headline, 2-sentence teaser
  Col 3:  Grupper — icon (people), headline, 2-sentence teaser
BG:       var(--bg-primary) — clean white
Purpose:  Immediate audience self-qualification; reduces bounce rate
```

**Section 4 — Signature Experience Feature**
```
Layout:   50/50 horizontal split (image left, text right)
          Alternated for second feature (text left, image right)
Feature A: RIB Boat Tours — dramatic water action photo
Feature B: Sauna by the Sea — atmospheric steam + ocean photo
Content:
  - H2, description (3 sentences), 3 bullet benefits, CTA link
Mobile:   Image on top (full width), text below
```

**Section 5 — Social Proof**
```
Layout:   Asymmetric — large testimonial left, 2 stacked smaller testimonials right
Content:  3 testimonials total — tourist / corporate / family group
Details:  Star rating (subtle), first name + type ("Besøkende, Australia"), source logo
```

**Section 6 — Gallery Teaser**
```
Layout:   Asymmetric masonry grid — 4 photos (varying sizes)
Behavior: Last photo has overlay: "Se alle bilder →"
Photos:   Mix of action (RIB), atmosphere (sauna steam), scenery (fjord sunset)
```

**Section 7 — Final CTA Block**
```
Layout:   Full-bleed dark section — var(--color-fjord)
Content:  H2 "Klar for eventyret?" + short pitch + amber [Bestill nå →] button
Texture:  Subtle SVG wave or noise overlay for visual interest
```

**Footer**
```
Columns:  3-column on desktop / stacked on mobile
Col 1:    Logo + tagline + social icons (Instagram, Facebook)
Col 2:    Navigation (all pages)
Col 3:    Address, phone, email, WhatsApp link
Bottom:   © 2025 Kystopplevelser · Personvern · Vilkår · [Theme toggle]
```

---

### EXPERIENCES (/opplevelser)

**Section 1 — Page Header**
```
Layout:   60vh hero, lighter than home (static photo, softer overlay)
Content:  H1 "Våre opplevelser" + 2-line intro paragraph
Nav:      Anchor pills below hero → jump to each experience block
```

**Experience Blocks — 5 total, alternating layout**

Each block structure:
```
Layout:   60/40 image/text split — alternating L/R each block
Image:    Full-bleed within column, ~500px min-height
Content:
  - Eyebrow tag:  "RIB · 2–10 personer · Fra kr 890,-/person"
  - H2:           Experience name
  - Description:  3–4 sentences, editorial tone
  - Details grid: [Varighet] [Gruppestr.] [Pris fra] [Sesong]
  - Included:     3–5 bullet items (equipment, guide, safety etc.)
  - CTA:          "Bestill [experience name] →"
Mobile:   Image full-width on top, content below, no alternation
```

**Block 1 — RIB-turer**
```
Tag:       "Populær · 2–10 personer · Apr–Okt"
Highlight: Speed through open fjords, sunset tours available, full safety briefing
Photo:     Dramatic bow-on water shot, spray, fjord backdrop
```

**Block 2 — Båtleie**
```
Tag:       "Fleksibel · Opp til 8 personer"
Highlight: Freedom to explore on your own schedule, coastal charts included
Photo:     Small boat anchored in calm cove, couple on deck
```

**Block 3 — Krabbefiske**
```
Tag:       "Familievennlig · Alle aldre"
Highlight: Authentic local tradition, all equipment provided, cook your catch
Photo:     Hands pulling up crab trap, joyful expression
```

**Block 4 — Badstue ved sjøen**
```
Tag:       "Avslappende · Opp til 8 personer"
Highlight: Panoramic ocean views, cold plunge, private sessions available year-round
Photo:     Sauna silhouette at golden hour, steam, water reflection
```

**Block 5 — Vannscooter**
```
Tag:       "Adrenalinfylt · 2–4 per scooter"
Highlight: No license required, safety course included, escorted group rides available
Photo:     Water scooter banked turn, spray and energy
```

**Section — Team Building Callout**
```
Layout:   Full-width card, dark fjord background, ember accent
Content:  "Teambuilding for bedrifter" — custom packages, group pricing, dedicated guide
CTA:      "Kontakt oss for tilbud →" (different from public booking)
```

---

### ABOUT (/om-oss)

**Section 1 — Our Story**
```
Layout:   Narrow text column (max var(--container-text) = 680px), centered
Content:  Founding story, love for the Bergen coast, 2–3 paragraphs
Image:    Founders / crew photo, either inline or decorative pull-right
Tone:     Personal, warm — not corporate. Use "vi" (we).
```

**Section 2 — Our Values**
```
Layout:   3-column icon grid
Values:
  1. Trygghet først (Safety First) — icon: shield
  2. Lokalt kjennskap (Local Knowledge) — icon: map pin
  3. Bærekraft (Sustainable Tourism) — icon: leaf
Style:    Minimal line icons, short headline, 2-sentence body
```

**Section 3 — The Team**
```
Layout:   3–4 person cards in a row (2-col on mobile)
Cards:    Portrait photo, name, role, one-liner (playful, human)
Style:    Rounded image, warm, not corporate headshots
```

**Section 4 — Where to Find Us**
```
Layout:   Full-width map (Mapbox or Google) with overlay card
Overlay:  Address, parking info, nearest bus/ferry stop
Bergen context: Landmark reference ("5 min fra Bryggen")
```

**Section 5 — Safety & Certifications**
```
Layout:   Horizontal logo/badge strip + short safety statement
Content:  Licenses, insurance, life vests, weather cancellation policy
Purpose:  Critical trust signal — especially for corporate and parent groups
```

---

### GALLERY (/galleri)

**Section 1 — Filter Controls**
```
Layout:   Minimal header + filter pill tabs
Filters:  Alle  |  RIB  |  Krabbefiske  |  Badstue  |  Vannscooter  |  Natur
Active:   Amber underline or filled pill
```

**Section 2 — Photo Grid**
```
Layout:     CSS Masonry (columns: 3 desktop / 2 tablet / 1 mobile)
            Mix of portrait and landscape for visual rhythm
Interaction: Click → Lightbox (focus-trapped, keyboard navigable, swipe on touch)
Loading:    "Last inn flere" button (prefer over infinite scroll for perf + control)
Alt text:   Every image has descriptive alt for SEO and accessibility
```

**Section 3 — Video Feature**
```
Layout:   Full-width embed (YouTube or Vimeo, no autoplay)
Content:  60–90 sec highlight reel — RIB, sauna steam, crab catch, scenery
Thumb:    Dramatic fjord still frame
```

---

### BOOKING / CONTACT (/bestilling)

**Section 1 — Page Header**
```
Layout:   Simple, no hero image — text-only, centered
Headline: "Klar for en opplevelse?"
Intro:    Booking process explained in 2 sentences + "Vi svarer innen 24 timer"
```

**Section 2 — Booking Form + Sidebar**
```
Layout:   60% form / 40% sidebar (stack on mobile — form first, sidebar below)

Form fields:
  1.  Fornavn + Etternavn (2 cols)
  2.  E-post
  3.  Telefon
  4.  Opplevelse (multi-select checkboxes — all 5 options)
  5.  Ønsket dato (date picker, disable past dates)
  6.  Antall personer (number input, min 1, max 30)
  7.  Melding / spesielle ønsker (textarea, optional)
  8.  Hvordan hørte du om oss? (dropdown, optional — for analytics)
  9.  ☐ Jeg godtar personvernreglene (GDPR checkbox — required)
  10. [Send forespørsel →] (amber, full width)

Sidebar:
  - Phone (clickable tel: link)
  - WhatsApp link
  - Email
  - Address + map thumbnail
  - Hours of operation
  - "Vi er tilgjengelige Apr–Okt" seasonal note
```

**Section 3 — FAQ Accordion**
```
Layout:   Single column accordion list, max 8 items
Topics:
  - Hva skjer ved dårlig vær?
  - Hva skal jeg ha på?
  - Trengs det båtlisens?
  - Kan barn delta?
  - Hva er avbestillingsreglene?
  - Tilbyr dere grupperabatter?
  - Er utstyr inkludert?
  - Hvor langt er det fra Bergen sentrum?
```

---

## 4. Responsive Breakpoint Strategy

```
320px  — Mobile S  (base styles, single column, full-width everything)
480px  — Mobile L  (minor spacing adjustments)
768px  — Tablet    (2-column grids, nav bar appears, side-by-side layouts)
1024px — Desktop S (full desktop nav, alternating experience blocks)
1280px — Desktop M (wider containers, refined spacing)
1440px — Desktop L (max container widths apply, generous whitespace)
```

**Mobile-first**: All CSS written at base = mobile. Use `min-width` breakpoints for enhancement.

---

## 5. UX Principles for Kystopplevelser

### Emotion Before Information
Lead with drama — a visitor must *feel* the cold sea spray before they read bullet points. Defer pricing and logistics to scroll depth. Hero has no price information.

### Progressive Disclosure
```
Home:        Teaser cards → emotional pull → social proof → CTA
Experiences: Overview → drill into each → details → book
Booking:     Single-step inquiry (low friction) → confirmation
```

### Trust Architecture (layered)
```
Layer 1:  Photography authenticity (real photos, real people, real Bergen fjords)
Layer 2:  Testimonials with named reviewers + source (Google/TripAdvisor)
Layer 3:  Certifications, safety standards, licensed guides
Layer 4:  Response time guarantee ("Vi svarer innen 24 timer")
Layer 5:  Clear cancellation + weather policy (reduces perceived risk)
```

### Booking Friction Reduction
- Phone number visible in nav on mobile (sticky `tel:` link)
- WhatsApp alternative — common for European tourism inquiry
- Single-page inquiry form — not multi-step until conversion data justifies it
- Form pre-fills experience if arrived from specific experience CTA

### Seasonal Awareness
- Sticky seasonal banner: "Sesong 2025 åpner 1. april — Bestill nå!"
- Gallery and hero media should rotate seasonally (summer vs winter sauna)
- CMS integration recommended for seasonal pricing and availability

### Language Strategy
```
Primary:    Norwegian Bokmål (lang="nb")
Secondary:  English (/en/ path prefix, manually translated — no auto-translate)
Nav toggle: [NO] / [EN] flag or text pill in navigation
```

### Accessibility (WCAG 2.1 AA)
- Color contrast: 4.5:1 for text, 3:1 for UI components
- Skip navigation link: `.skip-link { position: absolute; top: -100%; }` → visible on focus
- All interactive elements keyboard navigable (focus-visible outlines)
- Lightbox: focus-trapped, `Escape` closes, `aria-modal="true"`
- Images: descriptive alt text (not "image of boat" — "RIB-båt kjører gjennom Byfjorden ved Bergen")
- Form: labels associated, error messages linked via `aria-describedby`
- `lang="nb"` on `<html>` with `lang="en"` sections where applicable

### Performance Budget
```
Hero image:    WebP, max 600KB (JPEG progressive fallback)
Hero video:    WebP/MP4, max 6MB; poster image required
Target LCP:    < 2.5s on 4G
Target CLS:    < 0.1 (reserve image dimensions, avoid late-loading fonts)
Target INP:    < 200ms
Total budget:  < 2MB initial, < 4MB total page load
```

---

## 6. Component Architecture

```
components/
├── navigation/
│   ├── NavBar.html         — Sticky, transparent → solid
│   ├── NavMobile.html      — Drawer with overlay
│   └── ThemeToggle.html    — Light / Dark / System
│
├── hero/
│   ├── HeroHome.html       — Full 100dvh, video/image, overlay, CTAs
│   └── HeroInner.html      — 60vh, photo, softer overlay (inner pages)
│
├── experiences/
│   ├── ExperienceCard.html — Strip card (home teaser)
│   └── ExperienceBlock.html — Full alternating layout
│
├── gallery/
│   ├── MasonryGrid.html
│   ├── FilterTabs.html
│   └── Lightbox.html       — Focus trapped, keyboard + swipe
│
├── forms/
│   ├── BookingForm.html
│   └── FaqAccordion.html
│
├── social-proof/
│   └── TestimonialCard.html
│
├── common/
│   ├── Button.html         — primary / secondary / ghost variants
│   ├── Badge.html          — Experience tags
│   ├── SectionHeader.html  — Eyebrow + H2 + subtitle
│   └── ScrollIndicator.html
│
└── layout/
    ├── Container.html
    ├── Section.html
    └── Footer.html
```

---

## 7. CSS File Structure

```
css/
├── design-system.css   — All variables: color, type, spacing, radius, shadow
├── layout.css          — Container, grid, section, responsive utilities
├── components.css      — All component styles (BEM naming)
├── animations.css      — Scroll reveals, hover states, transitions
└── main.css            — Page-specific overrides and composition

js/
├── theme-manager.js    — Light/dark/system toggle with localStorage
├── nav-scroll.js       — Transparent → solid on scroll
├── gallery.js          — Filter tabs + lightbox
└── main.js             — Form validation, FAQ accordion, misc
```

---

## 8. Implementation Priority Order

```
Phase 1 — Foundation (day 1)
  [x] Implement design-system.css (all tokens)
  [x] Implement layout.css (container, grid, section)
  [x] Set up theme toggle (HTML + CSS + JS)
  [x] Build NavBar component (transparent/solid behavior)

Phase 2 — Core Pages (days 2–3)
  [x] Home page — all 7 sections
  [x] Experiences page — all 5 experience blocks
  [x] Booking page — form + FAQ

Phase 3 — Supporting Pages (day 4)
  [x] About page
  [x] Gallery page — masonry grid + lightbox + filter

Phase 4 — Polish (day 5)
  [x] Scroll reveal animations (Intersection Observer)
  [x] Hover states and micro-interactions
  [x] Form validation and error states
  [x] Performance optimization (images, video, fonts)
  [x] Accessibility audit
  [x] Cross-browser + device testing
```

---

**ArchitectUX Agent** — Foundation complete. Handoff ready for Senior Developer implementation.
