# TCS quality review

Checked 26 October 2026. Independent sample website and management prototype.

## Measured mobile results

Lighthouse 13.5.0, headless Chrome, simulated mobile throttling, local static server. These are lab measurements, not real-user Core Web Vitals or certification. Scores vary with machine load.

| Experience | Viewport width | Performance | Accessibility | Best practices | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|---:|
| Website | 320px | 97 | 100 | 100 | 2.12 s | 0.018 | 19 ms |
| Website | 375px | 93 | 100 | 100 | 2.12 s | 0.033 | 212 ms |
| Website | 412px | 95 | 100 | 100 | 2.11 s | 0.041 | 157 ms |
| Management | 320px | 98 | 100 | 100 | 1.73 s | 0.039 | 114 ms |
| Management | 375px | 98 | 100 | 100 | 2.02 s | 0.028 | 109 ms |
| Management | 412px | 99 | 100 | 100 | 1.73 s | 0.001 | 0 ms |

## Verified behavior

- Public-site demo booking was saved and found in management in the same browser.
- Simulated checkout generated a receipt and updated calculated revenue.
- Data tests passed for persistence, conflicting appointments, adjacent appointments, opening hours, past-date rejection, escaping, paid records, corrupt-storage recovery and reset.
- JavaScript syntax checks pass. Referenced local images exist.
- Desktop and phone screens were visually reviewed before the latest polish. Updated 320px opening views were reviewed from Lighthouse screenshots. Full manual interaction checks after the polish were limited by browser control being disabled on the resumed account.
- Reduced-motion CSS and JS paths skip the intro, card tilt, count-up and chart animations.

## Intentional limits

- SEO scores were 66 locally and 63 on the live host because this independent proposal intentionally sets noindex/nofollow and blocks crawling. It should not compete with the official business.
- Automated accessibility 100 is not a full WCAG conformance certification. A manual assistive-technology audit is still appropriate before production.
- No claim of an international design ranking: aesthetic judgment is subjective and no independent award/review panel was used.
- Static GitHub Pages demo: no secure staff login, server database, cross-device sync, payment processing or appointment notification. All management records are fictional.
- Runtime has no npm dependencies. Development-only Lighthouse/axe tooling currently has transitive npm advisories; no node_modules are deployed.

## Presentation features

Brief skippable monogram curtain, shrinking fixed glass navigation, editorial salon photography, larger Montserrat typography, scroll reveals, pointer-based 3D card tilt, signature glass sculpture, deep plum section, glass management panels, animated statistics and revenue bars.

## First live desktop audit

Website: performance 87, accessibility 100, best practices 100. Management: 97 / 100 / 100. The first website result exposed the cost of the 2.1-second intro; the intro was shortened to 1.25 seconds and the font preloaded before retesting.

## Final refinement results

After shortening the curtain and preloading Montserrat: local desktop website scored 100 performance / 100 accessibility / 100 best practices. The deployed website scored 91 / 100 / 100; the deployed management demo scored 97 / 100 / 100. Live SEO remained 63 because indexing is deliberately disabled. Local and hosted measurements are distinct; network latency and cache state affect the hosted result.

Deployment verified: both public URLs returned HTTP 200 and GitHub Pages completed successfully for code commit 9f460d3.

## Third edition results (26 October 2026, Claude Code)

Lighthouse 13.5.0, local static server, before the final image compression and accessibility fixes below.

| Page | Phone performance | Desktop performance | Accessibility | Best practices |
|---|---:|---:|---:|---:|
| Home | 90 | 99 | 98 → 100 | 100 |
| Services | 81 | 97 | 98 | 100 |
| Gallery | 90 | 97 | 98 → 100 | 100 |
| About | 90 | 99 | 98 | 100 |
| Contact | 92 | 96 | 98 | 100 |
| Studio | 88 | 99 | 100 | 100 |

The 98s came from footer heading levels and gallery button labels; both were fixed and the rechecked pages score 100. The services hero photo was then compressed by half, which mainly helps the phone score.

Checked in headless Chrome at 1440, 375 and 320 px: no sideways page scroll on any page. Intro, slideshows, reveals and compact navigation were captured frame by frame. End-to-end test passed: a booking made from a signature card on the home page appears in the studio's appointment list. Gallery filters, lightbox, service search, category links and count-up numbers were tested. `qa/data-test.mjs` and `qa/calendar-test.mjs` pass with the new seed data.
