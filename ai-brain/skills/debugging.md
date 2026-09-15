# Debugging

## "I fixed this already, why is it still broken?"

This happened repeatedly in this project (most notably with `GarageCard.tsx`'s spec-grid column count). Before assuming the user is looking at a stale cache:

1. **Re-`Read` the actual current file content, right now.** Don't rely on your memory of a fix from several turns ago — this repo's files have genuinely reverted between turns more than once (an external process outside a given editing turn). A memory of "I set this to `grid-cols-1`" is not evidence about the file's current state.
2. If the source is confirmed correct, **build it and inspect the compiled output** to rule out a source-vs-behavior mismatch entirely:
   ```powershell
   npm run build
   Get-Content dist\assets\*.css -Raw | Select-String "grid-cols-1"   # or whatever's in question
   ```
   Confirm the class exists and, if it's a responsive variant, confirm which `@media` breakpoint (if any) wraps it. Tailwind v4's default `sm:` breakpoint is `(min-width: 40rem)` = 640px.
3. **Delete `dist/` afterward** — it's a throwaway verification artifact.
4. Only after both of those check out should you tell the user it's very likely a stale browser/dev-server issue on their end — and say so plainly, with the evidence, rather than repeating a hand-wavy "try refreshing" without having actually verified the source and build output first.

## "The screenshot doesn't match what the code should produce at all"

If a reported screenshot shows a layout that doesn't correspond to *any* plausible reading of the current source (e.g. label and value rendering side-by-side when the JSX clearly stacks them vertically with no flex/inline styling), that's a strong signal you're looking at a genuinely stale render, not a subtle CSS bug. Say so, and ask for a hard refresh / dev-server restart before spending more effort theorizing about CSS edge cases that don't match the actual DOM structure.

## Ambiguous feedback targeting

The visual-feedback tool's `Location` field is a CSS selector path, but multiple structurally-identical elements (e.g. 5 items in the same grid, 4 cards with the same wrapper classes) produce the *same* selector path. When the feedback text itself doesn't name which specific one ("please remove this fact" with no distinguishing detail), don't guess — use `AskUserQuestion` with the concrete candidates. Guessing wrong here silently damages the wrong content.

## Unused-import / dead-code hygiene

When removing a feature, always check whether its removal orphaned an import or a prop that's now unused (`Grep` for the symbol name across the file, or the prop name across all call sites). This repo's `tsc --noEmit` does *not* fail on unused imports (`noUnusedLocals` isn't set), so it will not catch this for you.
