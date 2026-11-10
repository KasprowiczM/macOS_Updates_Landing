# Landing page review, 2026-11-10

## Scope and verdict

The reviewed local candidate presents a coherent visual direction across the landing page and feature artwork. The installation path is easier to follow, the new terminal example identifies itself as illustrative, and the two language routes remain available as prerendered HTML. No release blocker remained in the browser checks listed below after the reported fixes. This is a review of a local candidate, not evidence that the candidate is deployed or a certification of accessibility or Core Web Vitals.

## Evidence

- Chromium via Playwright, local production preview: inspected the landing hero in light and dark themes at 1440 x 900, the Polish landing at 390 x 844 and 320 x 740, and the new artwork and terminal example at desktop and mobile sizes. The artwork has distinct light and dark variants.
- A route and viewport sweep covered 12 English and Polish routes at 320, 768 and 1440 CSS pixels. One 2 px overflow in the Polish landing rules grid was found and fixed; the revised Polish landing measured 320 px at a 320 px viewport. The remaining combinations had no document-level overflow in the sweep.
- The hero install button copied the exact installer command to the clipboard in Chromium with clipboard permissions granted. The preview and run examples include the default installation directory. The installer itself was reviewed as source code and was not executed.
- Mobile menu expanded, closed with Escape, and returned keyboard focus to the trigger. Visible homepage controls measured at least 44 x 44 CSS pixels in the 390 px check. A documentation copy button measured 44 x 44 px and copied the same text shown in its code block. A security link that had measured 26 px tall measured 44 px after correction.
- With reduced motion emulated, the hero transform remained `none`. Feature artwork retained a static 24 px translation and did not move when the page scrolled. The wall exposed a semantic ordered list. Without reduced motion, the hero transform changed with scrolling.
- A local build completed and reported 12 prerendered routes, `404.html` and `sitemap.xml`. The inspected route HTML had the correct language, one H1, title, canonical URL, and one parseable JSON-LD block for each of the 12 routes. English and Polish home pages on the existing production domain also returned canonical and hreflang tags in raw HTML.
- The public domain returned HTTP 200 from Vercel for all 12 routes, `sitemap.xml`, `robots.txt`, `llms.txt` and `llms-full.txt` before deployment of this candidate.
- `npm run lint` and `git diff --check` completed without errors in the reviewed working tree. The Impeccable detector returned an empty findings array for the changed UI targets; this is a mechanical check, not a substitute for the browser review.
- The production build kept `WallPlayer` out of the initial page requests in the local browser check. The hero requested both light and dark image files in that check, so image loading can be revisited if field performance warrants it.

## Issues found during review

The previous installation sequence omitted the directory change before running the updater and overstated what the installer does. The candidate adds the default directory to the commands and describes setup dependencies and the possible Touch ID configuration. A hardcoded English documentation link from the Polish landing was also corrected.

The first candidate clipped the install command in the desktop hero, used the light image against the dark theme, and overflowed by 2 px at 320 px in Polish. Subsequent browser checks confirmed command wrapping, the dark artwork and the corrected width. Missing translations in the new visual and terminal sections were corrected in the inspected build.

## Limits and follow-up

This review used emulated viewport and media settings in Chromium, not physical devices or a full screen-reader assessment. It did not perform a comprehensive contrast audit, automated accessibility scan, Lighthouse run, throttled performance test, field Core Web Vitals measurement, or search-engine indexing verification. Structured data was checked for JSON parsing and presence, not validated for rich-result eligibility. A successful HTTP response from the current domain does not establish that a later deployment contains this candidate. Verify the deployed version and its assets after release.

## Production review addendum, 2026-11-10

The deployed site was inspected before the workflow redesign. The hero used the new editorial styling, but the animated update display still used a flight director, countdown and plotted poll. That display did not visually match the rest of the page. At a 390 px emulated mobile viewport, the moving hero image overlapped the proof facts while scrolling, and a status transition in the animated display briefly placed two labels over one another. These observations were reported for correction.

In the same Chromium production check, all 12 English and Polish routes were visited at 320, 390, 768 and 1440 CSS pixels. No document-level horizontal overflow was detected. A Polish documentation copy button copied the exact text of its code block. The mobile menu opened, Escape closed it, and focus returned to its trigger. At 390 px the hero transform changed on scroll when motion was allowed; with reduced motion emulated the hero transform was `none` and the workflow provided a static semantic list. These mobile results are viewport emulation, not physical phone testing.

The local redesign was subsequently inspected in light and dark desktop views and at 390 and 320 px mobile widths. The desktop workflow advanced through the recorded example on scroll; its final state retained the Proton Drive warning and described the macOS step as not run. Mobile showed a semantic list with the example details. The hero image no longer overlapped the proof facts in the inspected mobile scroll position, and document width stayed within both mobile viewports. With reduced motion emulated, the hero transform was `none` and the static list remained available. These observations apply to the local candidate pending deployment verification.

The documentation review found that several earlier copy buttons combined independent actions, including preview followed immediately by update, export followed by import, and multiple scheduling alternatives. In the revised source, these actions have separate examples and copy controls. File trees, explanatory shell references and commands containing the `App Name` placeholder are displayed without a copy button. The examples were reviewed as source and were not executed on a Mac.
