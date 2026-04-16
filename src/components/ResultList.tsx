'use client';

import type { Listing } from '@/lib/types';
import { type Locale, t } from '@/lib/i18n';
import { PropertyCard } from './PropertyCard';
import { DisplayToggleBar } from './DisplayToggles';

export function ResultList({ locale, listings }: { locale: Locale; listings: Listing[] }) {
  return (
    <>
      <DisplayToggleBar locale={locale} />
      {listings.length === 0 ? (
        <div className="rounded-md border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">
          {t(locale, 'list.empty')}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {listings.map((l) => (
            <PropertyCard key={l.id} locale={locale} listing={l} />
          ))}
        </div>
      )}
    </>
  );
}
