# Project Context

## What this is

A **VIN/license-plate decoder preview page** for a product called "My Garage." A visitor enters a VIN or plate, gets a free teaser of decoded vehicle data (specs, recall count, market value range, a few history data points), and the whole page is built to convert that visitor into a free account signup. It is a **marketing/landing page**, not the product itself.

This is a **single-page prototype** — there is no backend, no real database, no real auth. Search results either come from the live public NHTSA VIN-decode API (`vpic.nhtsa.dot.gov`) or a hardcoded mock fallback. "Signing up" is a fake modal flow that resolves after a timeout and does nothing persistent.

## Who this is for

Reviewed almost entirely through a **structured visual-feedback tool** (see `playbook.md`) that posts messages in the form:

```
## Page Feedback: /
**Viewport:** WxH
**Location:** CSS selector path
**Source:** file:line:col
**Feedback:** free text instruction
```

Treat these as precise, targeted change requests against a specific rendered element — not general conversation. When the `Location`/`Feedback` combination could plausibly point at more than one element, **ask which one** rather than guessing (this has come up repeatedly, e.g. "remove this fact" against a 5-item list with no other distinguishing detail).

## Tech stack

- **React 19** + **TypeScript**, **Vite 6** (`@vitejs/plugin-react`, `@tailwindcss/vite`)
- **Tailwind CSS v4** (CSS-based config in `src/index.css` via `@import "tailwindcss"` + `@layer base`, no `tailwind.config.js`)
- **motion/react** (Framer Motion successor) for entrance animations
- **lucide-react** for icons
- No router, no state management library — everything is `useState` in `App.tsx` passed down as props.
- `agentation` (dev dependency) — a visual-annotation dev tool, mounted only when `import.meta.env.DEV` is true, in both render branches of `App.tsx`.

## Architecture at a glance

- **`App.tsx`** owns almost all state: the active decoded `vehicle`, loading/invalid-VIN flags, modal open state. Renders `Header` + a stack of marketing sections + a footer + two modals.
- **`src/lib/mock-data.ts`** — the two real sample vehicles (`FORD_FUSION_SAMPLE`, `JEEP_CHEROKEE_SAMPLE`), built from actual NHTSA/vehiclemedia/bid.cars decode JSON the user supplied. See `project-history.md` for how these differ (one has an auction record, one deliberately doesn't).
- **`src/lib/manufacturer-logos.ts`** — `make → /logos/*.webp` lookup used by `GarageCard` to show a real logo instead of a placeholder box.
- **`src/types.ts`** — the `VehiclePreview` shape. This has grown incrementally as real decode fields were incorporated (`auctionListing`, `auctionImages`, `auctionDetails`, `colorOptions`, `exteriorImages`/`interiorImages`). All the "extra" fields are optional — components must handle them being absent.
- **Components under `src/components/`** are mostly presentational, one per marketing section (`GarageCard`, `InsightCardsSection`, `GaragePromoSection`, `ConversionBand`, `CredibilityStrip`, `FaqSection`, `Header`, `StickyMobileCta`, modals). `MyGarageView.tsx` and `ReturningUserBanner.tsx` exist but are **not imported anywhere** — see `rules.md` on why they're intentionally dead code, not something to clean up.

## What this project is *not*

- **Not** where the "My Garage" member dashboard/Garage app lives. That's a separate, already-built product. Signup/login on this page never transitions into any logged-in dashboard state here — see `rules.md`.
- **Not** a place to add real authentication, persistence, or routing without being asked.
