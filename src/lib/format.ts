import type { Locale } from './i18n';

// Simple conversion constants. Users can override MYR->JPY via the UI toggle
// (default anchored to a recent rate; treat as approximate).
export const DEFAULT_JPY_PER_MYR = 33.5;

export type Currency = 'MYR' | 'JPY';
export type AreaUnit = 'sqft' | 'sqm' | 'tatami';

export function formatPrice(
  priceMyr: number,
  currency: Currency,
  jpyPerMyr: number = DEFAULT_JPY_PER_MYR,
  locale: Locale = 'ja',
): string {
  if (currency === 'MYR') {
    return `RM ${priceMyr.toLocaleString(locale === 'ja' ? 'ja-JP' : 'en-MY')}`;
  }
  const jpy = Math.round(priceMyr * jpyPerMyr);
  return `¥${jpy.toLocaleString('ja-JP')}`;
}

export function convertArea(sqft: number, unit: AreaUnit): number {
  switch (unit) {
    case 'sqft':
      return sqft;
    case 'sqm':
      return Math.round(sqft * 0.092903 * 10) / 10;
    case 'tatami':
      // 1 tatami ≈ 1.62 m² (中京間 approximation). Round to 0.5.
      return Math.round((sqft * 0.092903) / 1.62 * 2) / 2;
  }
}

export function formatArea(sqft: number, unit: AreaUnit, locale: Locale): string {
  const value = convertArea(sqft, unit);
  const suffix = unit === 'sqft' ? 'sqft' : unit === 'sqm' ? 'm²' : locale === 'ja' ? '畳' : 'tatami';
  return `${value.toLocaleString(locale === 'ja' ? 'ja-JP' : 'en-MY')} ${suffix}`;
}
