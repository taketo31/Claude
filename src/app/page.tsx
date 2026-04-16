import { cookies } from 'next/headers';
import { DEFAULT_LOCALE, type Locale, t } from '@/lib/i18n';
import type { Furnishing, ListingType, PropertyCategory, SearchFilters } from '@/lib/types';
import { applyFilters, fetchAllListings } from '@/lib/sources';
import { ALL_AREAS } from '@/data/properties';
import { SearchFiltersPanel } from '@/components/SearchFiltersPanel';
import { ResultList } from '@/components/ResultList';
import { SortSelect } from '@/components/SortSelect';

function parseFilters(sp: Record<string, string | string[] | undefined>): SearchFilters {
  const asString = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const asArray = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v : v ? v.split(',').filter(Boolean) : [];
  const asNumber = (v: string | string[] | undefined) => {
    const s = asString(v);
    if (!s) return undefined;
    const n = Number(s);
    return Number.isFinite(n) ? n : undefined;
  };

  const listingType = (asString(sp.listingType) as ListingType) || 'rent';
  return {
    listingType,
    areas: asArray(sp.areas),
    minPriceMyr: asNumber(sp.minPrice),
    maxPriceMyr: asNumber(sp.maxPrice),
    minBedrooms: asNumber(sp.minBedrooms),
    category: asString(sp.category) as PropertyCategory | undefined,
    furnishing: asString(sp.furnishing) as Furnishing | undefined,
    maxWalkMinutes: asNumber(sp.maxWalk),
    jpFriendlyOnly: asString(sp.jpFriendly) === '1',
    keyword: asString(sp.keyword),
    amenities: asArray(sp.amenities),
    unitFeatures: asArray(sp.unitFeatures),
    tags: asArray(sp.tags),
  };
}

type SortKey = 'newest' | 'priceAsc' | 'priceDesc' | 'sqftDesc';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const locale = (cookies().get('locale')?.value as Locale) ?? DEFAULT_LOCALE;
  const filters = parseFilters(searchParams);
  const sort = ((Array.isArray(searchParams.sort) ? searchParams.sort[0] : searchParams.sort) ||
    'newest') as SortKey;

  const allListings = await fetchAllListings(filters);
  const filtered = applyFilters(allListings, filters);
  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case 'priceAsc':
        return a.priceMyr - b.priceMyr;
      case 'priceDesc':
        return b.priceMyr - a.priceMyr;
      case 'sqftDesc':
        return b.sqft - a.sqft;
      case 'newest':
      default:
        return b.listedAt.localeCompare(a.listedAt);
    }
  });

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="lg:sticky lg:top-4 lg:self-start">
        <SearchFiltersPanel
          locale={locale}
          initial={filters}
          areas={ALL_AREAS.map((a) => ({ name: a.name, nameJa: a.nameJa }))}
        />
      </aside>

      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-bold">
            {t(locale, 'list.results', { count: sorted.length })}
          </h1>
          <SortSelect locale={locale} value={sort} />
        </div>

        <ResultList locale={locale} listings={sorted} />
      </section>
    </div>
  );
}
