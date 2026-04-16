import type { Listing, SearchFilters } from '@/lib/types';

/**
 * iProperty.com.my adapter — stub.
 *
 * iProperty is part of the REA Group. A developer/agent API is available
 * under their Business portal. Plug your credentials in here and normalise
 * their response into our `Listing` type.
 */
export async function fetchIProperty(_filters?: SearchFilters): Promise<Listing[]> {
  const apiKey = process.env.IPROPERTY_API_KEY;
  if (!apiKey) {
    throw new Error(
      'iProperty adapter is not configured. Set IPROPERTY_API_KEY after signing a business agreement.',
    );
  }

  // Example shape — replace with the real endpoint.
  //
  // const res = await fetch('https://api.iproperty.com.my/v3/listings?country=my', {
  //   headers: { 'x-api-key': apiKey },
  // });
  // const data = await res.json();
  // return data.results.map(normalise);

  return [];
}
