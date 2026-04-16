# マレーシア不動産検索 (Malaysia Property Search, Suumo-style)

A Japanese-friendly property search site for Malaysia, inspired by Japan's
[Suumo](https://suumo.jp/). Built as a Next.js prototype with a pluggable
data layer so it can be connected to PropertyGuru / iProperty listings once a
formal partner data agreement is in place.

## ✨ Features

- **Bilingual UI (日本語 / English)** — cookie-based locale switcher.
- **Japanese-friendly filters**
  - Popular KL areas (モントキアラ / KLCC / バングサー / プタリンジャヤ …)
  - Walk-to-transit filter (Suumo-style 徒歩◯分)
  - "Japanese-friendly only" toggle (filters for listings near JSKL, 日系スーパー)
- **Suumo-style facility / condition filters** (multi-select, AND-matched)
  - 設備・共用施設 — サウナ / ジャグジー / インフィニティプール / ジム / テニス / BBQ / コワーキング …
  - 室内設備 — バスタブ / 専用庭 / バルコニー / ウォークインクローゼット / メイド部屋 / KLCCビュー …
  - こだわり条件 — ペット可 / 犬可 / 猫可 / 閑静なエリア / 低層・低密度 / JSKL近く / Expatフレンドリー …
  - Full taxonomy is defined in `src/lib/taxonomy.ts` — add items in one place and they appear in the filter panel, card chips, and detail page.
- **Dynamic display units**
  - Currency: MYR ⇄ JPY (roughly anchored to ¥33.5 / RM)
  - Area: sqft ⇄ m² ⇄ 畳
- **Suumo-inspired layout** — left filter sidebar + right list/card view,
  dedicated detail page with gallery, transit, amenities and JP notes.
- **Pluggable data sources**
  - `sample` (default): ~12 realistic KL/PJ listings
  - `propertyguru`: adapter stub — requires PropertyGuru MLS/Partner API key
  - `iproperty`: adapter stub — requires iProperty Business API key

## 🏗️ Project structure

```
src/
  app/
    layout.tsx               # Root layout + DisplayProvider + header/footer
    page.tsx                 # Search page (server component)
    property/[id]/page.tsx   # Detail page
    globals.css
  components/
    Header.tsx, Footer.tsx, LocaleSwitcher.tsx
    SearchFiltersPanel.tsx   # Left sidebar, Suumo-style filters
    SortSelect.tsx
    ResultList.tsx
    PropertyCard.tsx
    PropertyDetailBody.tsx
    DisplayToggles.tsx       # Currency / area-unit context
  lib/
    types.ts                 # Listing + SearchFilters schema
    i18n.ts                  # ja / en dictionaries
    format.ts                # Currency + area conversions
    taxonomy.ts              # Facility / unit-feature / condition-tag catalog
    sources/
      index.ts               # Source registry + filter logic
      propertyguru.ts        # Stub adapter
      iproperty.ts           # Stub adapter
  data/
    properties.ts            # Sample dataset
```

## 🚀 Run

```bash
npm install
npm run dev
# open http://localhost:3000
```

Type-check / production build:

```bash
npm run typecheck
npm run build
npm run start
```

## 🔌 Wiring up real data

### Why not just scrape PropertyGuru / iProperty?

Both sites' Terms of Service **prohibit automated scraping**, and both actively
block scrapers (Cloudflare, IP rate limits, CAPTCHA). Scraping also breaks on
every UI change. The supported path is a partner data feed:

- **PropertyGuru** — apply for their MLS / partner program (requires an agent
  licence in MY).
- **iProperty.com.my** — apply for a Business API key via their REA Group
  business portal.

Once you have credentials, implement the adapters in:

- `src/lib/sources/propertyguru.ts`
- `src/lib/sources/iproperty.ts`

Each adapter just returns `Promise<Listing[]>` normalised into the shared type.

Enable the source(s) at runtime:

```bash
# .env.local
SOURCES=sample,propertyguru,iproperty
PROPERTYGURU_API_KEY=...
IPROPERTY_API_KEY=...
```

The `fetchAllListings()` helper fans out to every enabled source in parallel
and merges results, so adding a third source (e.g. EdgeProp, iBilik) is just a
new file in `src/lib/sources/`.

## 🧭 Roadmap ideas

- Map view (Leaflet + OSM)
- Favorites (localStorage) + compare up to 3 listings
- MM2H visa eligibility flag for sale listings
- JSKL / international-school proximity scoring
- Commute time to KLCC / Cyberjaya tech parks
- Image CDN proxying for partner sources

## ⚠️ Disclaimer

The sample listings in `src/data/properties.ts` are fictional. Prices and
addresses are illustrative. Do not use this repo to present those listings
as real inventory.
