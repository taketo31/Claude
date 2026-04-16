import type { Listing, SearchFilters } from '@/lib/types';
import { SAMPLE_LISTINGS } from '@/data/properties';
import { fetchPropertyGuru } from './propertyguru';
import { fetchIProperty } from './iproperty';

/**
 * Data source registry.
 *
 * The default prototype ships only `sample` active so the site runs without
 * external dependencies. To enable a real source:
 *
 *   1. Obtain a formal data agreement / API credentials.
 *      - PropertyGuru: https://www.propertyguru.com.my/mls (partner feed)
 *      - iProperty:     https://www.iproperty.com.my/business/ (agent API)
 *   2. Implement the adapter in ./propertyguru.ts or ./iproperty.ts.
 *   3. Enable via the `SOURCES` env var, e.g. `SOURCES=propertyguru,iproperty`.
 *
 * NOTE: Do NOT scrape these sites without authorization — it violates their
 * Terms of Service and will be blocked by their anti-bot protection.
 */

export type SourceId = 'sample' | 'propertyguru' | 'iproperty';

function enabledSources(): SourceId[] {
  const env = process.env.SOURCES ?? 'sample';
  return env
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter((s): s is SourceId => s === 'sample' || s === 'propertyguru' || s === 'iproperty');
}

export async function fetchAllListings(filters?: SearchFilters): Promise<Listing[]> {
  const sources = enabledSources();
  const buckets = await Promise.all(
    sources.map((s) => {
      switch (s) {
        case 'sample':
          return Promise.resolve(SAMPLE_LISTINGS);
        case 'propertyguru':
          return fetchPropertyGuru(filters).catch(() => []);
        case 'iproperty':
          return fetchIProperty(filters).catch(() => []);
      }
    }),
  );
  return buckets.flat();
}

export function applyFilters(listings: Listing[], f: SearchFilters): Listing[] {
  return listings.filter((l) => {
    if (l.listingType !== f.listingType) return false;
    if (f.areas.length > 0 && !f.areas.includes(l.area.name)) return false;
    if (f.minPriceMyr != null && l.priceMyr < f.minPriceMyr) return false;
    if (f.maxPriceMyr != null && l.priceMyr > f.maxPriceMyr) return false;
    if (f.minBedrooms != null && l.bedrooms < f.minBedrooms) return false;
    if (f.category && l.category !== f.category) return false;
    if (f.furnishing && l.furnishing !== f.furnishing) return false;
    if (f.maxWalkMinutes != null) {
      const best = Math.min(...l.transit.map((t) => t.walkMinutes), Infinity);
      if (best > f.maxWalkMinutes) return false;
    }
    if (f.jpFriendlyOnly && !l.jpFriendly) return false;
    if (f.amenities && f.amenities.length > 0) {
      const set = new Set(l.amenities);
      if (!f.amenities.every((id) => set.has(id))) return false;
    }
    if (f.unitFeatures && f.unitFeatures.length > 0) {
      const set = new Set(l.unitFeatures);
      if (!f.unitFeatures.every((id) => set.has(id))) return false;
    }
    if (f.tags && f.tags.length > 0) {
      const set = new Set(l.tags);
      if (!f.tags.every((id) => set.has(id))) return false;
    }
    if (f.keyword) {
      const needle = f.keyword.toLowerCase();
      const hay = [l.title, l.titleJa, l.description, l.descriptionJa, l.area.name, l.area.nameJa]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (!hay.includes(needle)) return false;
    }
    return true;
  });
}
