import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DisplayProvider } from '@/components/DisplayToggles';
import { LocaleProvider } from '@/components/LocaleProvider';

export const metadata: Metadata = {
  title: 'マレーシア不動産検索 | Malaysia Property Search',
  description:
    '日本人のためのクアラルンプール物件検索サイト。モントキアラ、KLCC、バングサーなどのエリアから条件にあう物件をすばやく探せます。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <LocaleProvider>
          <DisplayProvider>
            <Header />
            <main className="mx-auto max-w-7xl px-4 pb-16 pt-6">{children}</main>
            <Footer />
          </DisplayProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
