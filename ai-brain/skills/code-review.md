# Code Review Checklist

Use this before calling any change in this repo done.

## Correctness

- [ ] `npm run lint` (`tsc --noEmit`) passes.
- [ ] If the change touched a data field on `VehiclePreview`, check both `FORD_FUSION_SAMPLE` and `JEEP_CHEROKEE_SAMPLE` — do they both need the field, or is it intentionally only on one (e.g. `colorOptions` only matters for the no-auction vehicle)?
- [ ] If the change added/removed a prop on a component, check every call site — this repo has no prop-types-at-runtime safety net beyond TypeScript, so a removed prop that's still passed somewhere will silently no-op rather than error.

## Consistency with rules.md

- [ ] No `text-xs` or sub-14px arbitrary sizes introduced.
- [ ] No `active:scale-*` introduced — `active:opacity-90` instead.
- [ ] No green hex values introduced.
- [ ] No new "logged in" state, auth flow, or Garage-dashboard navigation added to this page.
- [ ] Mobile grids default to a single column unless there's a specific, stated reason for more.

## Mobile

- [ ] Actually check the layout at a narrow width (320–375px) if the change touches anything in `GarageCard.tsx`, `Header.tsx`, `CredibilityStrip.tsx`, or `InsightCardsSection.tsx` — these have all had real mobile-only overflow bugs (nowrap text in narrow grid columns, labels overflowing spec cards). Don't assume a change that looks fine at desktop width is fine on mobile.
- [ ] If you can't visually verify (no browser tool available), say so explicitly rather than claiming it looks right — this has been the stated policy throughout this project's history.

## Scope discipline

- [ ] Did the request ask for exactly this, or did the change quietly expand scope (e.g. "fix this button's icon" turning into "restyle this whole section")? Prefer the narrowest change that satisfies the actual request; if a broader related fix seems warranted, mention it rather than silently doing it.
- [ ] If a feedback message's `Location` could match more than one on-screen element and nothing else in the message disambiguates it, ask which one instead of guessing.
