'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { type Locale, t } from '@/lib/i18n';
import type { Furnishing, ListingType, PropertyCategory, SearchFilters } from '@/lib/types';
import { BUILDING_FACILITIES, UNIT_FEATURES, CONDITION_TAGS, type TaxonomyItem } from '@/lib/taxonomy';
import { useLocale } from './LocaleProvider';

const CATEGORIES: PropertyCategory[] = [
  'condo',
  'apartment',
  'serviced-residence',
  'landed',
  'studio',
];
const FURNISHINGS: Furnishing[] = ['fully', 'partial', 'none'];
const BEDROOM_OPTIONS = [1, 2, 3, 4];
const WALK_OPTIONS = [5, 10, 15, 20];

export function SearchFiltersPanel({
  initial,
  areas,
}: {
  initial: SearchFilters;
  areas: { name: string; nameJa?: string }[];
}) {
  const locale = useLocale();
  const router = useRouter();
  const [filters, setFilters] = useState<SearchFilters>(initial);

  function toggleArea(name: string) {
    setFilters((f) => ({
      ...f,
      areas: f.areas.includes(name) ? f.areas.filter((a) => a !== name) : [...f.areas, name],
    }));
  }

  function toggleIn(
    key: 'amenities' | 'unitFeatures' | 'tags',
    id: string,
  ) {
    setFilters((f) => {
      const current = (f[key] ?? []) as string[];
      const next = current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id];
      return { ...f, [key]: next };
    });
  }

  function apply() {
    const params = new URLSearchParams();
    params.set('listingType', filters.listingType);
    if (filters.areas.length) params.set('areas', filters.areas.join(','));
    if (filters.minPriceMyr != null) params.set('minPrice', String(filters.minPriceMyr));
    if (filters.maxPriceMyr != null) params.set('maxPrice', String(filters.maxPriceMyr));
    if (filters.minBedrooms != null) params.set('minBedrooms', String(filters.minBedrooms));
    if (filters.category) params.set('category', filters.category);
    if (filters.furnishing) params.set('furnishing', filters.furnishing);
    if (filters.maxWalkMinutes != null) params.set('maxWalk', String(filters.maxWalkMinutes));
    if (filters.jpFriendlyOnly) params.set('jpFriendly', '1');
    if (filters.keyword) params.set('keyword', filters.keyword);
    if (filters.amenities?.length) params.set('amenities', filters.amenities.join(','));
    if (filters.unitFeatures?.length) params.set('unitFeatures', filters.unitFeatures.join(','));
    if (filters.tags?.length) params.set('tags', filters.tags.join(','));
    router.push(`/?${params.toString()}`);
  }

  function reset() {
    setFilters({ listingType: 'rent', areas: [] });
    router.push('/');
  }

  const isRent = filters.listingType === 'rent';

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-base font-bold text-suumo-600">{t(locale, 'filter.heading')}</h2>

      {/* Listing type */}
      <div className="mb-4">
        <div className="mb-1 text-xs font-bold text-gray-600">{t(locale, 'filter.listingType')}</div>
        <div className="flex rounded-md border border-gray-300">
          {(['rent', 'sale'] as ListingType[]).map((lt) => (
            <button
              key={lt}
              type="button"
              onClick={() => setFilters((f) => ({ ...f, listingType: lt }))}
              className={`flex-1 px-3 py-2 text-sm transition ${
                filters.listingType === lt
                  ? 'bg-suumo-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t(locale, lt === 'rent' ? 'filter.rent' : 'filter.sale')}
            </button>
          ))}
        </div>
      </div>

      {/* Keyword */}
      <FilterBlock label={t(locale, 'filter.keyword')}>
        <input
          type="text"
          value={filters.keyword ?? ''}
          onChange={(e) => setFilters((f) => ({ ...f, keyword: e.target.value || undefined }))}
          className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
          placeholder={locale === 'ja' ? 'モントキアラ、KLCC …' : 'Mont Kiara, KLCC …'}
        />
      </FilterBlock>

      {/* Area */}
      <FilterBlock label={t(locale, 'filter.area')}>
        <div className="flex max-h-40 flex-col gap-1 overflow-y-auto">
          {areas.map((a) => (
            <label key={a.name} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.areas.includes(a.name)}
                onChange={() => toggleArea(a.name)}
                className="accent-suumo-500"
              />
              <span>
                {locale === 'ja' && a.nameJa ? a.nameJa : a.name}
                {locale === 'ja' && a.nameJa ? (
                  <span className="ml-1 text-xs text-gray-500">({a.name})</span>
                ) : null}
              </span>
            </label>
          ))}
        </div>
      </FilterBlock>

      {/* Price */}
      <FilterBlock label={t(locale, isRent ? 'filter.priceRent' : 'filter.priceSale')}>
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            placeholder="min"
            value={filters.minPriceMyr ?? ''}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                minPriceMyr: e.target.value ? Number(e.target.value) : undefined,
              }))
            }
            className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
          />
          <span className="text-gray-400">~</span>
          <input
            type="number"
            inputMode="numeric"
            placeholder="max"
            value={filters.maxPriceMyr ?? ''}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                maxPriceMyr: e.target.value ? Number(e.target.value) : undefined,
              }))
            }
            className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
          />
        </div>
      </FilterBlock>

      {/* Bedrooms */}
      <FilterBlock label={t(locale, 'filter.bedrooms')}>
        <div className="flex flex-wrap gap-1">
          <PillButton
            active={filters.minBedrooms == null}
            onClick={() => setFilters((f) => ({ ...f, minBedrooms: undefined }))}
          >
            {t(locale, 'filter.any')}
          </PillButton>
          {BEDROOM_OPTIONS.map((n) => (
            <PillButton
              key={n}
              active={filters.minBedrooms === n}
              onClick={() => setFilters((f) => ({ ...f, minBedrooms: n }))}
            >
              {n}+
            </PillButton>
          ))}
        </div>
      </FilterBlock>

      {/* Category */}
      <FilterBlock label={t(locale, 'filter.category')}>
        <select
          value={filters.category ?? ''}
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              category: (e.target.value || undefined) as PropertyCategory | undefined,
            }))
          }
          className="w-full rounded border border-gray-300 bg-white px-2 py-1.5 text-sm"
        >
          <option value="">{t(locale, 'filter.any')}</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {t(locale, `category.${c}`)}
            </option>
          ))}
        </select>
      </FilterBlock>

      {/* Furnishing */}
      <FilterBlock label={t(locale, 'filter.furnishing')}>
        <div className="flex flex-wrap gap-1">
          <PillButton
            active={!filters.furnishing}
            onClick={() => setFilters((f) => ({ ...f, furnishing: undefined }))}
          >
            {t(locale, 'filter.any')}
          </PillButton>
          {FURNISHINGS.map((fur) => (
            <PillButton
              key={fur}
              active={filters.furnishing === fur}
              onClick={() => setFilters((f) => ({ ...f, furnishing: fur }))}
            >
              {t(locale, `filter.furnishing.${fur}`)}
            </PillButton>
          ))}
        </div>
      </FilterBlock>

      {/* Walk */}
      <FilterBlock label={t(locale, 'filter.walk')}>
        <div className="flex flex-wrap gap-1">
          <PillButton
            active={filters.maxWalkMinutes == null}
            onClick={() => setFilters((f) => ({ ...f, maxWalkMinutes: undefined }))}
          >
            {t(locale, 'filter.any')}
          </PillButton>
          {WALK_OPTIONS.map((n) => (
            <PillButton
              key={n}
              active={filters.maxWalkMinutes === n}
              onClick={() => setFilters((f) => ({ ...f, maxWalkMinutes: n }))}
            >
              {n} {t(locale, 'filter.walkMax')}
            </PillButton>
          ))}
        </div>
      </FilterBlock>

      {/* Building facilities */}
      <TaxonomyBlock
        label={t(locale, 'filter.amenities')}
        items={BUILDING_FACILITIES}
        selected={filters.amenities ?? []}
        onToggle={(id) => toggleIn('amenities', id)}
        locale={locale}
      />

      {/* Unit features */}
      <TaxonomyBlock
        label={t(locale, 'filter.unitFeatures')}
        items={UNIT_FEATURES}
        selected={filters.unitFeatures ?? []}
        onToggle={(id) => toggleIn('unitFeatures', id)}
        locale={locale}
      />

      {/* Condition tags */}
      <TaxonomyBlock
        label={t(locale, 'filter.tags')}
        items={CONDITION_TAGS}
        selected={filters.tags ?? []}
        onToggle={(id) => toggleIn('tags', id)}
        locale={locale}
        accent
      />

      {/* JP friendly */}
      <label className="mb-5 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={!!filters.jpFriendlyOnly}
          onChange={(e) => setFilters((f) => ({ ...f, jpFriendlyOnly: e.target.checked }))}
          className="accent-suumo-500"
        />
        <span className="font-medium text-accent-500">{t(locale, 'filter.jpFriendly')}</span>
      </label>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={apply}
          className="flex-1 rounded-md bg-suumo-500 px-4 py-2 text-sm font-bold text-white hover:bg-suumo-600"
        >
          {t(locale, 'filter.apply')}
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          {t(locale, 'filter.reset')}
        </button>
      </div>
    </div>
  );
}

function FilterBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <div className="mb-1 text-xs font-bold text-gray-600">{label}</div>
      {children}
    </div>
  );
}

function TaxonomyBlock({
  label,
  items,
  selected,
  onToggle,
  locale,
  accent,
}: {
  label: string;
  items: TaxonomyItem[];
  selected: string[];
  onToggle: (id: string) => void;
  locale: Locale;
  accent?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const INITIAL = 6;
  const visible = expanded ? items : items.slice(0, INITIAL);
  const hiddenSelectedCount = items
    .slice(INITIAL)
    .filter((i) => selected.includes(i.id)).length;

  return (
    <div className="mb-4">
      <div className={`mb-1 text-xs font-bold ${accent ? 'text-accent-500' : 'text-gray-600'}`}>
        {label}
        {selected.length > 0 && (
          <span className="ml-1 rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-600">
            {selected.length}
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {visible.map((item) => {
          const active = selected.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onToggle(item.id)}
              className={`rounded-full border px-2.5 py-0.5 text-[11px] transition ${
                active
                  ? accent
                    ? 'border-accent-500 bg-accent-500/10 text-accent-500'
                    : 'border-suumo-500 bg-suumo-50 text-suumo-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {locale === 'ja' ? item.ja : item.en}
            </button>
          );
        })}
      </div>
      {items.length > INITIAL && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-1 text-[11px] text-suumo-600 hover:underline"
        >
          {expanded
            ? t(locale, 'filter.showLess')
            : `${t(locale, 'filter.showMore')} (+${items.length - INITIAL}${
                hiddenSelectedCount > 0 ? `, ${hiddenSelectedCount} selected` : ''
              })`}
        </button>
      )}
    </div>
  );
}

function PillButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs transition ${
        active
          ? 'border-suumo-500 bg-suumo-50 text-suumo-700'
          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
      }`}
    >
      {children}
    </button>
  );
}
