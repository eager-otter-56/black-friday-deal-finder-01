# TruePrice Friday — Black Friday Deal Finder

[![make.fun bounty](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/bounty/black-friday-deal-finder-01)
[![rank](https://make.fun/badge/black-friday-deal-finder-01/eager-otter-56/black-friday-deal-finder-01/rank.svg)](https://make.fun/bounty/black-friday-deal-finder-01)
[![reward](https://make.fun/badge/black-friday-deal-finder-01/eager-otter-56/black-friday-deal-finder-01/reward.svg)](https://make.fun/bounty/black-friday-deal-finder-01)

Bounty: https://make.fun/bounty/black-friday-deal-finder-01

An original, hand-checked Black Friday deal finder. Every one of its 35 deals was found and price-checked on **Friday, Nov 27, 2026** in a named deals source for its store (CNN Underscored, Benzinga, Popular Science, Best Buy's Black Friday release, 9to5Google, UltraGamerZ, 2ndShift, Tom's Guide roundups). Each card shows the product, store, sale price, usual price, discount %, dollar saving, the time the price was checked, the source it was read in, a link to that store, and an honest verdict — **NEW LOW**, **STRONG DEAL**, **FAIR**, or **THIN DEAL** — with the evidence for the verdict on the card.

## Features

- Live search across product, store and category
- Filters by category, store, minimum discount and verdict, plus category chips
- Sorting by discount %, dollar saving, lowest price, or best verdict
- Cross-store comparison where a product is checked at two stores (AirPods Pro 3 at Amazon and Target)
- Honest signals: inflated list prices and thin console discounts are labelled, not hidden
- Fully static: deals are data in `app/deals.js`; the site makes no network requests and works on desktop and phone

## Layout

- `app/index.html` — page structure: hero, stats, filters, deal grid, verdict guide
- `app/deals.js` — the checked deal data (product, store, prices, verdict, evidence, source, link)
- `app/logic.js` — discount maths, filtering and sorting (pure functions)
- `app/render.js` — deal-card and stats markup
- `app/main.js` — control wiring; initial filter state can be set from the URL
- `main.ts` — copies `app/` and `screenshots/` to the output and writes `dossier.json`
- `serve.ts` — local preview server (`node serve.ts`, http://localhost:8080)

## License

MIT — see `LICENSE`.
