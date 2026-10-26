# TCS upgrade handoff — 26 October 2026

## Objective
Expand the existing single-page concept into a polished multi-page salon website; photographic slideshow hero, stronger glass effects, richer second section, complete service catalogue, larger management text and a usable overview calendar. Preserve demo booking/checkout behavior. Publish to existing GitHub Pages repository.

## Status
Round two (Codex) and the third edition (Claude Code) are complete, checked in a real browser at 1440, 375 and 320 px, and published. See README "Third edition" and QUALITY.md.

## Original checklist (all done)
- [done] Source additional licensed editorial salon photographs and record attribution.
- [done] Home: full-background slideshow with legible copy, controls, pause and reduced motion.
- [done] Home: dimensional visual introduction replacing the plain text-only section.
- [done] Shared translucent navigation: Home, Services, Gallery, About, Contact, Book appointment.
- [done] Dedicated Services page with category imagery, search, category filtering and booking.
- [done] Dedicated Gallery page with salon portfolio and clearly separated editorial inspiration.
- [done] Dedicated About and Contact pages.
- [done] Readable management UI (14–16px operational text, larger headings and controls).
- [done] Overview booking calendar: date navigation, month grid, day/artist schedule and create/manage appointments.
- [done] Motion, hover, keyboard and reduced-motion checks.
- [done] Responsive checks, performance/accessibility audits and deployment.

## Existing architecture
Static HTML/CSS/ES modules. `data.js` contains services and localStorage demo data. `site.js` handles public booking. `admin/admin.js` handles management. `build.cjs` copies files to `dist/`; `node build.cjs --pages` also updates `docs/`, the GitHub Pages source. `server.cjs` serves dist at 127.0.0.1:4173. `qa/` is ignored and contains tests and Lighthouse reports.

## Deployment
Repository: https://github.com/AnnorFrancis/tcs-classic-sculpt
Website: https://annorfrancis.github.io/tcs-classic-sculpt/
Management: https://annorfrancis.github.io/tcs-classic-sculpt/admin/
Deploy by building with --pages, committing source + docs, pushing main and verifying Pages completion.

## Constraints
No genuine reservations/payments/messages. Keep fictional management data. Supplementary stock imagery must be identified as editorial inspiration, never falsely presented as TCS premises/work. Original TCS photos came from matching Fresha listing (see README). Retain noindex for independent proposal. Browser control was disabled in previous turn; recheck before manual QA. Do not claim unmeasured rankings or complete manual testing.
