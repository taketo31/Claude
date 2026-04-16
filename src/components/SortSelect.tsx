'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { t } from '@/lib/i18n';
import { useLocale } from './LocaleProvider';

export function SortSelect({ value }: { value: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function onChange(next: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', next);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <label className="text-sm">
      <span className="mr-2 text-gray-600">{t(locale, 'list.sort')}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        className="rounded border border-gray-300 bg-white px-2 py-1"
      >
        <option value="newest">{t(locale, 'list.sort.newest')}</option>
        <option value="priceAsc">{t(locale, 'list.sort.priceAsc')}</option>
        <option value="priceDesc">{t(locale, 'list.sort.priceDesc')}</option>
        <option value="sqftDesc">{t(locale, 'list.sort.sqftDesc')}</option>
      </select>
    </label>
  );
}
