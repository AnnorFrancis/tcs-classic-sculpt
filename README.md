# The Classic Sculpt · Website & Studio

Independent presentation concept for TCS Hair & Beauty, Cantonments, Accra.

## Run

Requires Node.js 20+. No runtime dependencies or build installation required.

```
node build.cjs
node server.cjs
```

Website: http://127.0.0.1:4173/ · Management: http://127.0.0.1:4173/admin/

Publish the contents of `dist/` to any static host, including GitHub Pages. Paths are relative and work under a repository subpath.

## Presentation walkthrough

1. Explore the public site, service categories and portfolio lightbox.
2. Save a demo appointment with fictional details and a free time.
3. Open the management demo in the same browser. Find the appointment, confirm it, reschedule it, and record a simulated payment.
4. Review the receipt, clients, inventory and live-calculated reports. Export appointments as CSV.
5. Reset demo data to restart the presentation.

## Scope

This is a fully interactive static prototype, not a production salon operating system. Data is stored in this browser’s localStorage, shared between these two pages on the same origin. It is not synchronized across devices. No authentication, payment processing, notifications or real bookings are connected. Never enter real client information. Public demo data is fictional. Native dialogs provide focus management and Escape dismissal; reduced-motion preferences are respected.

## Source and attribution

- Supplied screenshot: TCS · The Classic Sculpt; 5th Circular Road; 025 645 0882.
- Google Maps: https://www.google.com/maps/search/TCS+Hair+and+Beauty+Accra — exact name and phone corroborated, 26 October 2026.
- Fresha: https://www.fresha.com/a/tcs-hair-and-beauty-accra-5th-circular-road-lrzczfp3 — matching phone +233 25 645 0882, address, services, hours, salon interiors and portfolio. Accessed 26 October 2026. Prices displayed are published non-discounted starting prices; final prices must be confirmed with the salon.
- Images are the salon’s publicly displayed Fresha photos, locally compressed to WebP. Ownership remains with original rights holders. This is an independent proposal, not an endorsed official website. Obtain owner approval and image rights confirmation before production use.
- Montserrat is distributed under the SIL Open Font License, downloaded from Google Fonts. No external font request is needed at runtime.
- No verified Instagram profile was identified; no guessed social handle is used.

The management demo uses a fictional staff role alongside Rita, whose head stylist/artist listing appears on Fresha. All clients, transactions and inventory are invented samples, explicitly identified in the UI.

## Live demo

Website: https://annorfrancis.github.io/tcs-classic-sculpt/

Management: https://annorfrancis.github.io/tcs-classic-sculpt/admin/

Run npm run build:pages after changes to refresh the tracked docs/ deployment. See QUALITY.md for measured checks and limits.

## Multi-page upgrade (26 October 2026)
- Home: controllable photograph slideshow, layered portrait composition, animated glass sculpture, plum/rose sections.
- Services: 81 source-menu items, category filtering, search and demo booking. The shared data module also retains 10 original demo service IDs for existing records.
- Gallery: filterable TCS portfolio, salon and separately labelled editorial inspiration.
- About and Contact: standalone pages with standard navigation, hours, telephone, WhatsApp and map links.
- Management: larger type and controls; day/month calendar, artist columns, status colours, date navigation, empty-slot booking and appointment management.
- Source files are edited directly. `experience.css` and `experience.js` provide the new public presentation; `admin/calendar.js` and `admin/upgrade.css` add management upgrades.
- `ASSETS.md` records additional stock sources. `HANDOFF.md` tracks implementation and remaining verification.

## Third edition (26 October 2026, finished by Claude Code)
- Cinematic intro: the TCS monogram draws itself, then the plum curtain splits into the hero. Plays once per browser tab, has a Skip button and is skipped for reduced motion.
- Home: four-photo hero slideshow with progress bars, a live "open now" glass card, a moving services ribbon, four category cards with their own slideshows, a signature menu of six glass price cards over salon photography, a two-row moving photo strip and a glass closing card.
- Services: 11 categories, each with its own photo slideshow and glass caption beside its price list, plus search and category chips. Home cards link to `services.html#cat-N`.
- Gallery: editorial masonry with nine more photographs and glass captions. About: glass number band and "The TCS way". Contact: live Google map and today's hours highlighted.
- Every page: photographic page header with a slideshow, glass navigation with a scroll progress line, scroll reveals, 3D tilt on cards, and a full footer.
- Studio: photo-and-glass overview banner (next client, this week's takings, closing time), a week of paid history and upcoming bookings (storage key `tcs-studio-demo-v2`), calendar columns that fit on phones, fewer "demo" labels outside checkout.
- New files: `luxe.css`, `luxe.js`. Photographs added as `assets/lx-*.webp` (see `ASSETS.md`).

- 26 Oct, client photos: the second hero slide is now the salon's own treatment room (4K Google Maps photo, `assets/tcs-room*.webp`). A fifth slide shows her styling floor (the Fresha photo, enlarged and sharpened, `assets/tcs-floor*.webp`). The studio banner uses both. Studio text was enlarged so nothing reads below 12px.
