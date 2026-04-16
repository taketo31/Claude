'use client';

import type { Locale } from '@/lib/i18n';
import { useLocale, useSetLocale } from './LocaleProvider';

export function LocaleSwitcher() {
  const locale = useLocale();
  const setLocale = useSetLocale();
  const next: Locale = locale === 'ja' ? 'en' : 'ja';

  return (
    <button
      type="button"
      onClick={() => setLocale(next)}
      className="rounded-full border border-white/60 px-3 py-1 text-xs font-medium hover:bg-white hover:text-suumo-600"
    >
      {locale === 'ja' ? 'EN' : '日本語'}
    </button>
  );
}
