import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { DEFAULT_LOCALE, type Locale, t } from '@/lib/i18n';
import { fetchAllListings } from '@/lib/sources';
import { PropertyDetailBody } from '@/components/PropertyDetailBody';

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const locale = (cookies().get('locale')?.value as Locale) ?? DEFAULT_LOCALE;
  const listings = await fetchAllListings();
  const listing = listings.find((l) => l.id === params.id);
  if (!listing) notFound();

  return (
    <div>
      <Link href="/" className="mb-3 inline-block text-sm text-suumo-600 hover:underline">
        {t(locale, 'detail.backToList')}
      </Link>
      <PropertyDetailBody locale={locale} listing={listing} />
    </div>
  );
}
