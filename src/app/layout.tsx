import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import './globals.css';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DisplayProvider } from '@/components/DisplayToggles';

export const metadata: Metadata = {
  title: 'マレーシア不動産検索 | Malaysia Property Search',
  description:
    '日本人のためのクアラルンプール物件検索サイト。モントキアラ、KLCC、バングサーなどのエリアから条件にあう物件をすばやく探せます。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = (cookies().get('locale')?.value as Locale) ?? DEFAULT_LOCALE;
  return (
    <html lang={locale}>
      <body>
        <DisplayProvider>
          <Header locale={locale} />
          <main className="mx-auto max-w-7xl px-4 pb-16 pt-6">{children}</main>
          <Footer locale={locale} />
        </DisplayProvider>
      </body>
    </html>
  );
}
