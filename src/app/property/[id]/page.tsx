import { notFound } from 'next/navigation';
import { SAMPLE_LISTINGS } from '@/data/properties';
import { PropertyDetailClient } from '@/components/PropertyDetailClient';

export function generateStaticParams() {
  return SAMPLE_LISTINGS.map((l) => ({ id: l.id }));
}

// Force static generation for every known id; unknown ids 404 at build.
export const dynamicParams = false;

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const listing = SAMPLE_LISTINGS.find((l) => l.id === params.id);
  if (!listing) notFound();
  return <PropertyDetailClient listing={listing} />;
}
