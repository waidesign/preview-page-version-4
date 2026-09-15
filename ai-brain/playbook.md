# Playbook

Practical how-to for working in this repo day to day.

## Commands

```powershell
npm run dev      # vite dev server, --port=3000 --host=0.0.0.0
npm run build     # vite build -> dist/ (useful for verification, see below — delete dist/ after)
npm run lint      # actually `tsc --noEmit` — this is the only automated check in the repo
```

There is no test suite. `npm run lint` (type-check) is the bar for "did I break anything" — run it after every change, before saying you're done.

## Viewing the two sample vehicles

The header has a small dropdown (desktop) / tab group (mobile menu) labeled with sample names ("Ford Fusion (Auction)" / "Jeep Cherokee (No Auction)"). It's driven by `PREVIEW_SAMPLES` in `App.tsx`, which just directly calls `setVehicle(...)` — no navigation, no auth involved. This is the intended way to preview different data scenarios now that the old State Preview QA menu is gone. There's also an info icon next to it clarifying it's a reviewer tool, not part of the shipped design.

Live-searching a real VIN (via the search bar) hits the public NHTSA API and produces a *third*, different kind of test vehicle — one with no auction data, no exterior/interior gallery, just a single stock photo. Useful for testing the "sparse data" fallback paths.

## When a component "isn't picking up" a change

This came up repeatedly: an edit would be made, confirmed correct by reading the file back, and then a later screenshot would show the *old* behavior. Two real causes were found:

1. **The file had genuinely reverted between turns** (external modification outside this session's own edits — the harness surfaces this as a "file was modified" system note, but it doesn't always fire before you'd notice). **Always re-`Read` the specific lines in question before concluding "the code is already right" a second time** — don't trust your memory of a prior edit across many turns.
2. **The dev server / browser was stale**, not the source. To rule this out definitively rather than guessing: run `npm run build`, then grep the compiled CSS in `dist/assets/*.css` for the specific class/media-query in question (e.g. confirm `.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}` exists and is *not* wrapped in the `sm:` media query). This proves what the actual shipped output does, independent of any dev-server cache. **Delete `dist/` afterward** — it's a verification artifact, not something to commit or leave lying around.

If you've done both of the above and the code is provably correct in the compiled output, say so plainly and point the user at a refresh/restart — don't keep re-explaining the same theory without new evidence.

## Doing a site-wide styling change (e.g. a rebrand)

Manually editing every occurrence of a hex code or class across a dozen files is slow and error-prone. Instead, use a scripted PowerShell pass:

```powershell
$root = "c:\Users\EP\Downloads\new-preview-page-design\src"
$files = Get-ChildItem -Path $root -Recurse -Include *.tsx,*.ts,*.css
$replacements = [ordered]@{ "OLDHEX" = "NEWHEX" }  # add more pairs as needed
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $original = $content
    foreach ($key in $replacements.Keys) { $content = $content.Replace($key, $replacements[$key]) }
    if ($content -ne $original) { [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBom) }
}
```

Write with `UTF8Encoding($false)` specifically to avoid inserting a BOM (source files in this repo are plain UTF-8, no BOM). After running it, `Grep` for the old value across `src/` to confirm zero remaining occurrences, then `npm run lint`.

## Adding a new sample vehicle from real decode data

1. Extract the relevant fields from the provided decode JSON into a `VehiclePreview` object in `src/lib/mock-data.ts` — see `FORD_FUSION_SAMPLE` / `JEEP_CHEROKEE_SAMPLE` for the shape and which JSON keys map to which fields (`auction-decode-bidcars` → `auctionListing`/`auctionDetails`, `vehiclemedia-vin-decode-v2-for-preview.images` → `exteriorImages`/`interiorImages`, `color_code` → `colorOptions`, `marketvalue-report-v3` → `marketValueLow`/`marketValueHigh`, `indigo-records-counter` → `historyRecordsCount`).
2. If the source JSON has inconsistent make/model/trim across its different sub-services (this happened with the Jeep — one service said "Cherokee/Latitude", others said "Grand Cherokee/Altitude"), pick the `vehiclemedia-vin-decode-v2-for-preview` entry as the identity source of truth (its name suggests it's specifically meant for this preview page) and use the other services only for technical spec fields, not identity fields. Flag the discrepancy rather than silently picking one.
3. Add it to `PREVIEW_SAMPLES` in `App.tsx` and to the `savedVehicles`-equivalent array if one still exists.
4. Update `SAMPLE_VEHICLES` export in `mock-data.ts` if present.
