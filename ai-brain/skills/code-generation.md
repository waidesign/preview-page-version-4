# Code Generation

Conventions to follow when writing new markup/components in this repo.

## Styling

- Tailwind utility classes only, colors as arbitrary hex values matching the palette in `../identity.md` (e.g. `bg-[#013479]`, not a made-up shade). No inline `style` objects except for genuinely dynamic values that can't be expressed as a class (e.g. `style={{ backgroundColor: color.hex }}` for a user-data-driven swatch, or a JS-measured pixel height).
- Minimum text size `text-sm` (14px) — never introduce `text-xs` or an arbitrary sub-14px size.
- Buttons: `active:opacity-90` for the press state, not `active:scale-*`.
- Mobile-first: default (no prefix) classes should be the mobile layout; add `sm:`/`lg:` overrides for larger screens. Grids in particular should default to `grid-cols-1` unless there's a clear reason to do otherwise on mobile.
- Long/unpredictable text content (labels, names) inside a flex or grid child needs `min-w-0` on the child and `break-words` on the text element, unless the container is guaranteed wide enough for `whitespace-nowrap`.

## Component patterns already established

- **Responsive dual-render, not JS media queries.** Where mobile and desktop need genuinely different DOM structure (not just different classes on the same element), this repo renders the component/element twice with `hidden sm:block` / `sm:hidden` pairs rather than a `useMediaQuery` hook. See `Header.tsx`'s search bar (desktop centered vs. mobile secondary row) and `GarageCard.tsx`'s VIN plate placement.
- **Modals**: `fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#17211D]/60 backdrop-blur-sm animate-fade-in` for the backdrop, white rounded-2xl card with `onClick={(e) => e.stopPropagation()}` inside, a `absolute top-3.5 right-3.5` circular close button. Copy this pattern (`SignupModal.tsx`, `SampleReportModal.tsx`, the checklist/comparison popups in `InsightCardsSection.tsx`/`CredibilityStrip.tsx`) rather than inventing a new modal shell.
- **Custom tooltips**: don't rely on the native `title` HTML attribute if the tooltip needs to be reliably visible/verifiable (it depends on real OS hover timing and isn't always captured by screenshot tooling). Use a real DOM element shown via `group` + `group-hover:opacity-100` instead — see the info icon next to the header's sample switcher in `Header.tsx`.
- **Data-driven fallback chains**: when a field might be absent, derive a boolean flag up front (e.g. `hasAuctionRecord`) rather than repeating the same `vehicle.x || vehicle.y` condition in multiple JSX branches — keeps the mutually-exclusive branches (e.g. auction box vs. color swatches) obviously in sync.

## Icons

`lucide-react` only. Match existing icon choices for similar concepts (e.g. `Check`/`X` for yes/no comparisons, `ChevronDown` for select affordances, `ArrowRight` for "go to more" links).

## Before finishing

Run `npm run lint` (`tsc --noEmit`). There is no other automated check — type errors are the only thing that will be caught for you.
