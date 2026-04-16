'use client';

import { useState } from 'react';
import type { Listing } from '@/lib/types';
import { t } from '@/lib/i18n';
import { formatArea, formatPrice } from '@/lib/format';
import { labelFor } from '@/lib/taxonomy';
import { useDisplay, DisplayToggleBar } from './DisplayToggles';
import { useLocale } from './LocaleProvider';

export function PropertyDetailBody({ listing }: { listing: Listing }) {
  const locale = useLocale();
  const { currency, areaUnit } = useDisplay();
  const [activeImg, setActiveImg] = useState(0);

  const title = locale === 'ja' && listing.titleJa ? listing.titleJa : listing.title;
  const desc = locale === 'ja' && listing.descriptionJa ? listing.descriptionJa : listing.description;
  const areaLabel = locale === 'ja' && listing.area.nameJa ? listing.area.nameJa : listing.area.name;
  const jpNotes =
    listing.jpFriendly?.notesJa && locale === 'ja'
      ? listing.jpFriendly.notesJa
      : listing.jpFriendly?.notes;

  return (
    <article className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      {/* Gallery */}
      <div>
        <div className="relative overflow-hidden rounded-lg bg-gray-200">
          <img
            src={listing.images[activeImg]}
            alt={title}
            className="h-72 w-full object-cover sm:h-96"
          />
          {listing.jpFriendly && (
            <span className="absolute left-3 top-3 rounded bg-accent-500 px-2 py-1 text-xs font-bold text-white shadow">
              {t(locale, 'card.jpBadge')}
            </span>
          )}
        </div>
        {listing.images.length > 1 && (
          <div className="mt-2 flex gap-2 overflow-x-auto">
            {listing.images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveImg(i)}
                className={`h-16 w-24 flex-shrink-0 overflow-hidden rounded border-2 transition ${
                  activeImg === i ? 'border-suumo-500' : 'border-transparent'
                }`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info panel */}
      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <DisplayToggleBar />

        <div className="mb-2 text-xs font-bold uppercase tracking-wide text-suumo-600">
          {listing.listingType === 'rent' ? t(locale, 'filter.rent') : t(locale, 'filter.sale')}
        </div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="mt-1 text-sm text-gray-500">
          {areaLabel} · {listing.area.city}, {listing.area.state}
        </div>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-3xl font-black text-accent-500">
            {formatPrice(listing.priceMyr, currency, undefined, locale)}
          </span>
          {listing.listingType === 'rent' && (
            <span className="text-sm text-gray-500">{t(locale, 'card.perMonth')}</span>
          )}
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4 text-sm">
          <Row label={t(locale, 'detail.layout')}>
            {listing.bedrooms}
            {t(locale, 'card.bedrooms')} / {listing.bathrooms}BA
          </Row>
          <Row label={t(locale, 'detail.area')}>{formatArea(listing.sqft, areaUnit, locale)}</Row>
          <Row label={t(locale, 'detail.category')}>
            {t(locale, `category.${listing.category}`)}
          </Row>
          <Row label={t(locale, 'detail.furnishing')}>
            {t(locale, `filter.furnishing.${listing.furnishing}`)}
          </Row>
        </dl>

        <section className="mt-5 border-t border-gray-100 pt-4">
          <h2 className="mb-2 text-sm font-bold text-gray-700">{t(locale, 'detail.transit')}</h2>
          <ul className="space-y-1 text-sm">
            {listing.transit.map((tr) => (
              <li key={tr.station} className="flex items-center justify-between">
                <span>
                  {tr.station}
                  {tr.line && <span className="ml-2 text-xs text-gray-500">({tr.line})</span>}
                </span>
                <span className="font-bold text-suumo-700">
                  {t(locale, 'card.walk', { n: tr.walkMinutes })}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {listing.amenities.length > 0 && (
          <section className="mt-5 border-t border-gray-100 pt-4">
            <h2 className="mb-2 text-sm font-bold text-gray-700">
              {t(locale, 'filter.amenities')}
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {listing.amenities.map((id) => (
                <span key={id} className="rounded bg-suumo-50 px-2 py-0.5 text-xs text-suumo-700">
                  {labelFor(id, locale)}
                </span>
              ))}
            </div>
          </section>
        )}

        {listing.unitFeatures.length > 0 && (
          <section className="mt-5 border-t border-gray-100 pt-4">
            <h2 className="mb-2 text-sm font-bold text-gray-700">
              {t(locale, 'filter.unitFeatures')}
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {listing.unitFeatures.map((id) => (
                <span key={id} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                  {labelFor(id, locale)}
                </span>
              ))}
            </div>
          </section>
        )}

        {listing.tags.length > 0 && (
          <section className="mt-5 border-t border-gray-100 pt-4">
            <h2 className="mb-2 text-sm font-bold text-accent-500">{t(locale, 'filter.tags')}</h2>
            <div className="flex flex-wrap gap-1.5">
              {listing.tags.map((id) => (
                <span
                  key={id}
                  className="rounded bg-accent-500/10 px-2 py-0.5 text-xs text-accent-500"
                >
                  {labelFor(id, locale)}
                </span>
              ))}
            </div>
          </section>
        )}

        {listing.jpFriendly && (
          <section className="mt-5 rounded-md bg-accent-500/5 p-3">
            <h2 className="mb-2 text-sm font-bold text-accent-500">{t(locale, 'detail.jpNotes')}</h2>
            <ul className="space-y-1 text-xs text-gray-700">
              {listing.jpFriendly.japaneseSchoolMinutes != null && (
                <li>
                  {locale === 'ja' ? 'JSKLまで約' : 'To JSKL approx.'}{' '}
                  <b>{listing.jpFriendly.japaneseSchoolMinutes}{locale === 'ja' ? '分' : ' min'}</b>
                </li>
              )}
              {listing.jpFriendly.japaneseSupermarket && (
                <li>
                  {locale === 'ja' ? '日系スーパー徒歩圏内' : 'Japanese supermarket nearby'}
                </li>
              )}
              {jpNotes && <li className="pt-1">{jpNotes}</li>}
            </ul>
          </section>
        )}

        {desc && (
          <section className="mt-5 border-t border-gray-100 pt-4">
            <h2 className="mb-2 text-sm font-bold text-gray-700">{t(locale, 'detail.overview')}</h2>
            <p className="text-sm leading-relaxed text-gray-700">{desc}</p>
          </section>
        )}

        <section className="mt-5 border-t border-gray-100 pt-4 text-xs text-gray-500">
          <span className="font-bold">{t(locale, 'detail.source')}:</span>{' '}
          <span className="uppercase">{listing.source}</span>
          {listing.sourceUrl && (
            <>
              {' · '}
              <a
                href={listing.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-suumo-600 hover:underline"
              >
                {listing.sourceUrl}
              </a>
            </>
          )}
        </section>
      </div>
    </article>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[11px] text-gray-500">{label}</dt>
      <dd className="font-bold text-gray-800">{children}</dd>
    </div>
  );
}
