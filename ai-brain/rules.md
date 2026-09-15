# Rules

Concrete, hard-won constraints. Each one exists because it was explicitly requested or corrected during development — treat these as settled decisions, not suggestions.

## Product scope

- **This page has no "logged in" state, and never will on its own.** Signed-in users are handled entirely by a separate, already-built Garage/member-dashboard app. `App.tsx` has no `isLoggedIn` state. The signup/login modal is a self-contained UI flow that plays a success animation and closes itself — it does not navigate anywhere or unlock any dashboard view within this codebase.
  - **Why:** stated explicitly — "we don't need to build the Garage part... we will relink with the actual Garage later" and "there is no possible way to be logged in on this preview page."
  - **How to apply:** don't add auth state, don't wire signup success to any kind of dashboard/garage navigation. If asked to eventually link to the real Garage app, that's an external redirect (`window.location.href` to another domain), not an internal view.
- **`MyGarageView.tsx` and `ReturningUserBanner.tsx` are intentionally unused/unimported.** They represent earlier iterations (a mocked garage dashboard, a "3 lookups" nudge banner) that no longer fit the product scope above. Don't delete the files (they may be useful reference for the real Garage app's design), but don't re-wire them in either, unless explicitly asked.
- **No "State Preview" QA switcher.** An earlier version had a dropdown to jump between synthetic edge-case states (loading, invalid VIN, returning user, rich/sparse/negative-flag data). It was explicitly removed ("Please remove all state previews"). The two real sample vehicles (see `project-history.md`) plus the header's sample-switcher dropdown are the *replacement* mechanism for reviewing different states — don't reintroduce the old QA menu pattern.

## Styling

- **Minimum font size is 14px (`text-sm`).** Never use `text-xs` or an arbitrary size below 14px.
- **Press animation is `active:opacity-90`, never `active:scale-*`.**
- **No green.** Navy (`#013479`) is primary, gold (`#F9AD24`) is accent. See `identity.md` for the full palette.
- **Mobile grids default to a single column** (`grid-cols-1`) unless there's a specific reason for 2 across on mobile. This has had to be re-fixed multiple times in `GarageCard.tsx`'s spec grid — see the debugging note below.
- Long unbroken labels (spec names, checklist items) need `break-words` and `min-w-0` on their grid/flex container, or they will overflow a narrow column instead of wrapping. `whitespace-nowrap` on text inside a grid column that can be narrow on mobile (e.g. 2-column layouts) is a recurring bug source — either guarantee the column is wide enough (single column on mobile) or don't force nowrap there.

## Data / images

- **Auction/sales-history photo priority** (in `GarageCard.tsx`): `vehicle.auctionListing.imageUrl` (a bid.cars-style auction listing photo, highest priority) → `vehicle.auctionImages[0]` (a generic sales-history photo) → exterior+interior gallery slider (`vehicle.exteriorImages` + `vehicle.interiorImages`, only shown when there's no auction photo and combined length > 1) → plain `vehicle.photoUrl` → generic placeholder. Don't collapse this chain — each fallback tier represents a genuinely different data-availability scenario that's been explicitly tested.
- **The auction alert box, auction-detail stats, and factory color-swatch row are mutually exclusive** in `GarageCard.tsx`, gated by a single `hasAuctionRecord` boolean. Color swatches only show when there is *no* auction record. Don't show both.
- Real logos live in `public/logos/*.webp`, mapped by `src/lib/manufacturer-logos.ts`. Only add an entry once you actually have the asset file in place — the fallback (dashed-border placeholder box) is the correct default for makes without a logo.
- Decorative marketing images (report mockup previews, etc.) live in `public/images/*.webp`.

## Working with feedback

- When a feedback message's `Location`/element description could match more than one on-screen element with no other distinguishing text, **ask which one** (see examples in `project-history.md`) rather than guessing — guessing wrong here means editing the wrong content.
- After every change, run `npm run lint` (which is actually `tsc --noEmit` — there is no separate lint step) before reporting done.
- Don't add code comments explaining *what* code does. Only comment on non-obvious *why* (a specific instruction that shaped a decision, a constraint that isn't visible from the code itself).
