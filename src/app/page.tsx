'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { t } from '@/lib/i18n';
import type { Furnishing, ListingType, PropertyCategory, SearchFilters } from '@/lib/types';
import { applyFilters } from '@/lib/sources';
import { SAMPLE_LISTINGS, ALL_AREAS } from '@/data/properties';
import { SearchFiltersPanel } from '@/components/SearchFiltersPanel';
import { ResultList } from '@/components/ResultList';
import { SortSelect } from '@/components/SortSelect';
import { useLocale } from '@/components/LocaleProvider';

type SortKey = 'newest' | 'priceAsc' | 'priceDesc' | 'sqftDesc';

function parseFilters(sp: URLSearchParams): SearchFilters {
  const num = (k: string) => {
    const v = sp.get(k);
    if (!v) return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  };
  const arr = (k: string) => {
    const v = sp.get(k);
    return v ? v.split(',').filter(Boolean) : [];
  };
  const listingType = (sp.get('listingType') as ListingType) || 'rent';
  return {
    listingType,
    areas: arr('areas'),
    minPriceMyr: num('minPrice'),
    maxPriceMyr: num('maxPrice'),
    minBedrooms: num('minBedrooms'),
    category: (sp.get('category') as PropertyCategory) || undefined,
    furnishing: (sp.get('furnishing') as Furnishing) || undefined,
    maxWalkMinutes: num('maxWalk'),
    jpFriendlyOnly: sp.get('jpFriendly') === '1',
    keyword: sp.get('keyword') || undefined,
    amenities: arr('amenities'),
    unitFeatures: arr('unitFeatures'),
    tags: arr('tags'),
  };
}

function SearchPageInner() {
  const locale = useLocale();
  const sp = useSearchParams();
  const filters = useMemo(() => parseFilters(sp), [sp]);
  const sort = (sp.get('sort') || 'newest') as SortKey;

  const sorted = useMemo(() => {
    const filtered = applyFilters(SAMPLE_LISTINGS, filters);
    return [...filtered].sort((a, b) => {
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
  }, [filters, sort]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="lg:sticky lg:top-4 lg:self-start">
        <SearchFiltersPanel
          initial={filters}
          areas={ALL_AREAS.map((a) => ({ name: a.name, nameJa: a.nameJa }))}
        />
      </aside>

      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-bold">
            {t(locale, 'list.results', { count: sorted.length })}
          </h1>
          <SortSelect value={sort} />
        </div>

        <ResultList listings={sorted} />
      </section>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="py-8 text-sm text-gray-500">Loading…</div>}>
      <SearchPageInner />
    </Suspense>
  );
}
