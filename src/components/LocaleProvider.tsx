'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n';

type Ctx = { locale: Locale; setLocale: (l: Locale) => void };
const LocaleCtx = createContext<Ctx | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('locale') as Locale | null;
      if (stored === 'ja' || stored === 'en') setLocaleState(stored);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem('locale', locale);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = locale;
  }, [locale, hydrated]);

  return (
    <LocaleCtx.Provider value={{ locale, setLocale: setLocaleState }}>
      {children}
    </LocaleCtx.Provider>
  );
}

export function useLocale(): Locale {
  const ctx = useContext(LocaleCtx);
  return ctx?.locale ?? DEFAULT_LOCALE;
}

export function useSetLocale(): (l: Locale) => void {
  const ctx = useContext(LocaleCtx);
  return ctx?.setLocale ?? (() => {});
}
