'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { AreaUnit, Currency } from '@/lib/format';
import { type Locale, t } from '@/lib/i18n';

type Ctx = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  areaUnit: AreaUnit;
  setAreaUnit: (u: AreaUnit) => void;
};

const DisplayCtx = createContext<Ctx | null>(null);

export function DisplayProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('MYR');
  const [areaUnit, setAreaUnitState] = useState<AreaUnit>('sqft');

  useEffect(() => {
    try {
      const c = localStorage.getItem('currency') as Currency | null;
      const u = localStorage.getItem('areaUnit') as AreaUnit | null;
      if (c === 'MYR' || c === 'JPY') setCurrencyState(c);
      if (u === 'sqft' || u === 'sqm' || u === 'tatami') setAreaUnitState(u);
    } catch {
      /* ignore */
    }
  }, []);

  function setCurrency(c: Currency) {
    setCurrencyState(c);
    try {
      localStorage.setItem('currency', c);
    } catch {
      /* ignore */
    }
  }
  function setAreaUnit(u: AreaUnit) {
    setAreaUnitState(u);
    try {
      localStorage.setItem('areaUnit', u);
    } catch {
      /* ignore */
    }
  }

  return (
    <DisplayCtx.Provider value={{ currency, setCurrency, areaUnit, setAreaUnit }}>
      {children}
    </DisplayCtx.Provider>
  );
}

export function useDisplay(): Ctx {
  const ctx = useContext(DisplayCtx);
  if (!ctx) {
    // Fallback defaults when used outside provider (e.g. SSR initial render).
    return {
      currency: 'MYR',
      setCurrency: () => {},
      areaUnit: 'sqft',
      setAreaUnit: () => {},
    };
  }
  return ctx;
}

export function DisplayToggleBar({ locale }: { locale: Locale }) {
  const { currency, setCurrency, areaUnit, setAreaUnit } = useDisplay();

  return (
    <div className="mb-3 flex flex-wrap items-center gap-3 rounded-md border border-gray-200 bg-white px-3 py-2 text-xs">
      <span className="font-bold text-gray-600">{t(locale, 'currency.toggle')}:</span>
      {(['MYR', 'JPY'] as Currency[]).map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => setCurrency(c)}
          className={`rounded-full px-2 py-0.5 ${
            currency === c ? 'bg-suumo-500 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          {c}
        </button>
      ))}
      <span className="ml-3 font-bold text-gray-600">{t(locale, 'area.toggle')}:</span>
      {(['sqft', 'sqm', 'tatami'] as AreaUnit[]).map((u) => (
        <button
          key={u}
          type="button"
          onClick={() => setAreaUnit(u)}
          className={`rounded-full px-2 py-0.5 ${
            areaUnit === u ? 'bg-suumo-500 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          {u === 'sqft' ? 'sqft' : u === 'sqm' ? 'm²' : locale === 'ja' ? '畳' : 'tatami'}
        </button>
      ))}
    </div>
  );
}
