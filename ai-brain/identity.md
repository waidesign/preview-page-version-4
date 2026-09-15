# Design System Identity

## Color tokens

Defined as CSS custom properties in `src/index.css` (`:root` under `@layer base`), but in practice **every component hardcodes the hex value directly** as a Tailwind arbitrary value (`bg-[#013479]`) rather than referencing the CSS variable. If you rebrand a color, you must update both: the `:root` variable *and* every hardcoded hex literal across `src/`. A project-wide scripted find-and-replace (PowerShell, see `playbook.md`) is the reliable way to do this — it has been done twice already (green → navy, amber → gold).

| Token | Variable | Hex | Use |
|---|---|---|---|
| Primary | `--brand-700` | `#013479` (deep navy) | buttons, links, primary borders/icons |
| Primary hover/lighter | `--brand-600` | `#024EB6` | `hover:bg-*`, lighter border tints |
| Primary light tint | `--brand-100` | `#E3ECF9` | light badge/icon backgrounds |
| Secondary/Accent | `--accent-500` | `#F9AD24` (gold) | star ratings, a few accent icons |
| Success | `--success-600` | *(unified to `#013479`, navy)* | — see note below |
| Warn | `--warn-600` | `#C97A12` | amber warning badges (e.g. recall counts) |
| Danger | `--danger-600` | `#C2453B` | errors, "not included" ✕ marks, negative-flag badges |
| Info | `--info-600` | `#2563B8` | rarely used |
| Ink (text) | `--ink-900` / `--ink-600` / `--ink-400` | `#17211D` / `#4B5A54` / `#8A968F` | body text hierarchy |
| Canvas / Surface | `--canvas` / `--surface` | `#FAFAF7` / `#FFFFFF` | page bg / card bg |
| Line | `--line` | `#E6E9E4` | borders |

**No green anywhere.** The original design used a green brand color (`#0E5748`/`#147A63`/`#1E8E5A`) which was fully rebranded to navy. This was explicit and deliberate — do not reintroduce green as a "success" or "positive" signal color. The one exception: star-rating icons use the gold accent instead of navy, since gold/yellow is the near-universal convention for ratings.

## Typography

- **Headings**: `font-heading` → `'Space Grotesk', sans-serif`
- **Body**: default `font-sans` → `'Inter', system-ui, ...`
- **Mono/data**: `font-mono` → `'IBM Plex Mono', monospace` (VINs, specs, prices, badges)
- **Minimum font size floor: 14px (`text-sm`).** Nothing in this app should render smaller than that. There is no `text-xs` (12px) or arbitrary sub-14px size (`text-[10px]`, `text-[11px]`, etc.) anywhere in `src/` — they were all bumped to `text-sm`. If you add new UI, don't introduce anything smaller.

## Interaction feel

- **Press/active state is a simple opacity dim (`active:opacity-90`), not a scale transform.** The original design used `active:scale-95` / `active:scale-[0.99]` on every button; this was explicitly replaced everywhere. Don't add `active:scale-*` to new buttons — use `active:opacity-90` for consistency.
- Hover states are color-shift only (`hover:bg-[#024EB6]` etc.), no shadows-on-hover pattern beyond what's already in a component.
- Shadows: three custom utilities in `index.css` — `shadow-resting` (very subtle), `shadow-elevated` (card lift, tinted with the primary navy rgba), `shadow-brand-glow` / `shadow-amber-glow` (CTA glow, also tinted to brand/accent rgba — remember these are hardcoded `rgba()` decimal values, so a rebrand must update them too).

## Tone of the copy

Direct, benefit-first, light urgency — typical conversion-page copywriting ("Records Found!", "56% Cheaper than Carfax", "No credit card needed!"). Short sentences, exclamation points used sparingly for good news, never for errors.
