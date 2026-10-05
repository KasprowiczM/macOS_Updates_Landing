# AGENTS.md

## GitHub Actions budget guardrail

This repository is owned by the `KasprowiczM` GitHub Free account. Private repositories share a hard allowance of 2,000 GitHub Actions minutes per month.

- Do not add, enable, or broaden scheduled workflows without the user's explicit approval.
- Default to `ubuntu-latest`; use macOS, Windows, or larger runners only when technically required and explicitly approved.
- Expensive platform-specific jobs should be manual or release-only, not triggered by every branch push.
- Restrict push/PR triggers by branch and path, add `concurrency` with cancellation, and set `timeout-minutes` on every job.
- Before changing Actions, estimate the monthly run count and minute impact. Do not change billing or spending limits without explicit approval.
- Public-repository standard runners may be free, but the same anti-waste rules still apply.

## Project Maintenance & Ground-Truth Synchronization

- **Source of Truth:** Upstream toolkit is located at `../macOS_updates` or `https://github.com/KasprowiczM/macOS_updates`.
- **Site Constants:** Always update `src/lib/site.ts` (`APP_VERSION`, `APP_VERSION_DATE`, `TEST_COUNT`, `INTERNET_APP_COUNT`, `UPDATE_METHOD_COUNT`) when synchronizing with new upstream releases.
- **Metadata Parity:** Ensure `index.html` JSON-LD schema (`softwareVersion`, `datePublished`) matches `site.ts`.
- **i18n Parity:** Every user-facing claim and test count in `en.json` must have a matching counterpart in `pl.json`.
- **Performance:** Keep route-level lazy loading (`React.lazy`) and vendor chunk partitioning intact; avoid bundling full pages or large libraries into the main entry chunk.
- **Accessibility & Craft Floor:** Interactive elements must preserve minimum 44px tap targets (`min-h-[44px]` / `min-w-[44px]`) and visible focus states (`focus-visible:ring-2`). No infinite animated bounce loops.


