# Worked Examples

Real requests handled in this project, with the reasoning that produced a good outcome. Use these as calibration for how much to infer vs. how much to ask.

---

**Request:** *"Please add this image [ford.webp]"* (feedback pointed at the manufacturer-logo placeholder box)

**What was right:** Recognized the image as an actual Ford logo, copied it into `public/logos/ford.webp`, and rather than hardcoding it directly into the one component, created a small `make → logo path` lookup table (`manufacturer-logos.ts`) so a second logo (Jeep, added later) was a one-line addition instead of another bespoke conditional.

---

**Request:** *"Please add this Auction or Sales History Data points here"* with a JSON snippet showing `auction-decode-bidcars` fields

**What was right:** Didn't just hardcode the given example values as static text — extended the `VehiclePreview` type with a proper `AuctionDetails` shape and populated it from the *actual* decode data for both sample vehicles, and made the whole surrounding UI block (alert box) conditional on the data actually being present, rather than always showing static copy regardless of the vehicle.

---

**Request:** *"Please update the Primary Color to X and Secondary/Accent to Y"*

**What was right:** Recognized this as a request to change a *design-system token*, which meant finding and updating every hardcoded occurrence across the whole codebase (14+ occurrences, 9 files), not just the one component the feedback happened to be anchored to. Used a scripted find-and-replace rather than manual edits to guarantee completeness, then explicitly verified zero old-value occurrences remained via grep.

**What required a judgment call:** the "success" semantic color (a slightly different green) wasn't explicitly named in that request. It was correctly left alone at first (semantic ≠ brand color), until the user came back and said they were "still seeing some green accents" — at which point it became clear the user wanted *all* green gone, not just the brand color. Lesson: a plausible design-system distinction (semantic vs. brand) is a reasonable default, but stay ready to revise it based on the next round of feedback rather than defending the original interpretation.

---

**Request:** *"Please remove this fact."* against a 5-item list, with no other identifying detail

**What was right:** Did **not** guess. Used `AskUserQuestion` with the actual 4-5 candidate items as options. Guessing here has real cost — deleting the wrong fact from marketing copy is a content mistake, not just a style nitpick, and there was no reasonable way to infer which one was meant.

---

**Request:** *"the mobile version is still broken"* / *"check screenshot, it's still two columns"* after the assistant had already asserted (twice, with build-output verification!) that the code was correct

**What was right:** Believed the user's repeated, specific evidence over its own prior verification. Re-read the actual current file state instead of re-asserting the same conclusion a third time, and discovered the file had genuinely reverted between turns. The fix was to just fix it again — not to keep insisting the cache theory was right. Being wrong once in this situation is normal (the verification *was* valid at the time it was done); repeating the same claim after being told twice it doesn't match reality is the actual mistake to avoid.

---

**Request:** *"Also there is no possible way to be logged in on this preview page... we don't need to show logged in state"* (a follow-up clarifying an earlier, narrower request about "the Garage flow is incorrect")

**What was right:** Understood this as retroactively re-scoping a whole subsystem (auth state, garage routing), not just a header styling tweak. Traced every place `isLoggedIn` touched — Header UI branches, `App.tsx` state, `MyGarageView` props, the signup-success handler's navigation — and removed all of it consistently, rather than patching only the specific spot the feedback literally pointed at.
