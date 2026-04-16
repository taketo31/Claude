'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { Locale } from '@/lib/i18n';

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const next: Locale = locale === 'ja' ? 'en' : 'ja';

  function switchLocale() {
    document.cookie = `locale=${next}; path=/; max-age=31536000`;
    startTransition(() => router.refresh());
  }

  return (
    <button
      type="button"
      onClick={switchLocale}
      className="rounded-full border border-white/60 px-3 py-1 text-xs font-medium hover:bg-white hover:text-suumo-600"
      disabled={pending}
    >
      {locale === 'ja' ? 'EN' : '日本語'}
    </button>
  );
}
