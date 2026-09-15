# SEO Notes

This is a public marketing landing page (VIN/plate decode + signup funnel), so SEO matters here in a way it wouldn't for an internal tool. Current state and gaps, as of this writing:

## Current state (`index.html`)

- `<title>VIN Decoder - Save to My Garage</title>` — present, but generic. A real deployment would want this dynamic per search (e.g. include year/make/model once a vehicle is decoded) or at least more specific to the value prop.
- No `<meta name="description">`.
- No Open Graph / Twitter Card tags (`og:title`, `og:description`, `og:image`, `twitter:card`) — worth adding given this is a shareable consumer page.
- No canonical URL tag.
- No structured data (a `Product`/`Service` or `FAQPage` JSON-LD would be reasonable given the FAQ accordion section already exists).
- Fonts are loaded via `<link>` to Google Fonts (`IBM Plex Mono`, `Inter`, `Space Grotesk`) with `preconnect` hints already in place — good for performance, which is itself an SEO/Core Web Vitals factor.

## Things to watch if asked to improve SEO

- **This is a client-side-only React SPA with no SSR/SSG.** Search engine crawlers that don't execute JavaScript will see an essentially empty `<div id="root">`. If real SEO matters for production, that's an architectural question (SSR framework, prerendering, etc.) — flag this rather than assuming meta-tag tweaks alone will be sufficient.
- The FAQ content (`src/lib/mock-data.ts` → `FAQ_ITEMS`, rendered by `FaqSection.tsx`) is a good candidate for `FAQPage` JSON-LD if/when structured data is added.
- Alt text: check that all `<img>` tags (vehicle photos, manufacturer logos, decorative report-preview backgrounds) have meaningful `alt` — decorative ones (`aria-hidden="true"` background images in `InsightCardsSection.tsx`) correctly use empty `alt=""`, which is right for images that add no information.
- If a per-vehicle URL/slug scheme is ever introduced (e.g. `/vin/1C4RJEAG2KC823978`), each such page should get a unique, dynamic title/description reflecting the decoded vehicle — don't ship one static title for every VIN.
