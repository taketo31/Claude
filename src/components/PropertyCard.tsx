'use client';

import Link from 'next/link';
import type { Listing } from '@/lib/types';
import { t } from '@/lib/i18n';
import { formatArea, formatPrice } from '@/lib/format';
import { labelFor } from '@/lib/taxonomy';
import { useDisplay } from './DisplayToggles';
import { useLocale } from './LocaleProvider';

export function PropertyCard({ listing }: { listing: Listing }) {
  const locale = useLocale();
  const { currency, areaUnit } = useDisplay();
  const titleForLocale = locale === 'ja' && listing.titleJa ? listing.titleJa : listing.title;
  const areaLabel =
    locale === 'ja' && listing.area.nameJa ? listing.area.nameJa : listing.area.name;
  const nearest = listing.transit[0];

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md md:flex-row">
      <Link
        href={`/property/${listing.id}`}
        className="relative block h-48 w-full flex-shrink-0 md:h-auto md:w-64"
      >
        <img
          src={listing.images[0]}
          alt={titleForLocale}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        {listing.jpFriendly && (
          <span className="absolute left-2 top-2 rounded bg-accent-500 px-2 py-0.5 text-[10px] font-bold text-white shadow">
            {t(locale, 'card.jpBadge')}
          </span>
        )}
        <span className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
          {listing.listingType === 'rent' ? t(locale, 'filter.rent') : t(locale, 'filter.sale')}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/property/${listing.id}`} className="group">
          <h3 className="text-base font-bold text-gray-900 group-hover:text-suumo-600">
            {titleForLocale}
          </h3>
        </Link>
        <div className="mt-1 text-xs text-gray-500">
          {areaLabel} · {listing.area.city}
        </div>

        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-xl font-black text-accent-500">
            {formatPrice(listing.priceMyr, currency, undefined, locale)}
          </span>
          {listing.listingType === 'rent' && (
            <span className="text-xs text-gray-500">{t(locale, 'card.perMonth')}</span>
          )}
        </div>

        <dl className="mt-3 grid grid-cols-3 gap-2 text-xs text-gray-700">
          <div>
            <dt className="text-[10px] text-gray-500">{t(locale, 'detail.layout')}</dt>
            <dd className="font-bold">
              {listing.bedrooms}
              {t(locale, 'card.bedrooms')} / {listing.bathrooms}BA
            </dd>
          </div>
          <div>
            <dt className="text-[10px] text-gray-500">{t(locale, 'detail.area')}</dt>
            <dd className="font-bold">{formatArea(listing.sqft, areaUnit, locale)}</dd>
          </div>
          <div>
            <dt className="text-[10px] text-gray-500">{t(locale, 'detail.transit')}</dt>
            <dd className="font-bold">
              {nearest
                ? `${nearest.station} ${t(locale, 'card.walk', { n: nearest.walkMinutes })}`
                : '—'}
            </dd>
          </div>
        </dl>

        <div className="mt-2 flex flex-wrap gap-1">
          {listing.unitFeatures.slice(0, 3).map((id) => (
            <span
              key={`u-${id}`}
              className="rounded bg-suumo-50 px-2 py-0.5 text-[10px] text-suumo-700"
            >
              {labelFor(id, locale)}
            </span>
          ))}
          {listing.tags.slice(0, 2).map((id) => (
            <span
              key={`t-${id}`}
              className="rounded bg-accent-500/10 px-2 py-0.5 text-[10px] text-accent-500"
            >
              {labelFor(id, locale)}
            </span>
          ))}
          {listing.amenities.slice(0, 2).map((id) => (
            <span
              key={`a-${id}`}
              className="rounded bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600"
            >
              {labelFor(id, locale)}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-end gap-2 pt-3">
          <Link
            href={`/property/${listing.id}`}
            className="rounded-md bg-suumo-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-suumo-600"
          >
            {t(locale, 'card.viewDetail')}
          </Link>
        </div>
      </div>
    </article>
  );
}
