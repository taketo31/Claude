import Link from 'next/link';
import { type Locale, t } from '@/lib/i18n';
import { LocaleSwitcher } from './LocaleSwitcher';

export function Header({ locale }: { locale: Locale }) {
  return (
    <header className="suumo-stripe text-white shadow">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-xl font-black text-suumo-600"
            aria-hidden
          >
            M
          </span>
          <div className="leading-tight">
            <div className="text-lg font-bold">{t(locale, 'app.title')}</div>
            <div className="text-[11px] opacity-90">{t(locale, 'app.tagline')}</div>
          </div>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="hover:underline">
            {t(locale, 'nav.search')}
          </Link>
          <span className="hidden opacity-60 sm:inline">{t(locale, 'nav.favorites')}</span>
          <span className="hidden opacity-60 sm:inline">{t(locale, 'nav.guide')}</span>
          <LocaleSwitcher locale={locale} />
        </nav>
      </div>
    </header>
  );
}
