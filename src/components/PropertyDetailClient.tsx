'use client';

import Link from 'next/link';
import type { Listing } from '@/lib/types';
import { t } from '@/lib/i18n';
import { PropertyDetailBody } from './PropertyDetailBody';
import { useLocale } from './LocaleProvider';

export function PropertyDetailClient({ listing }: { listing: Listing }) {
  const locale = useLocale();
  return (
    <div>
      <Link href="/" className="mb-3 inline-block text-sm text-suumo-600 hover:underline">
        {t(locale, 'detail.backToList')}
      </Link>
      <PropertyDetailBody listing={listing} />
    </div>
  );
}
