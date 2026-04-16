import { type Locale, t } from '@/lib/i18n';

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-white py-6 text-center text-xs text-gray-500">
      <p className="px-4">{t(locale, 'footer.disclaimer')}</p>
      <p className="mt-1 px-4">© {new Date().getFullYear()} Malaysia Suumo Prototype</p>
    </footer>
  );
}
