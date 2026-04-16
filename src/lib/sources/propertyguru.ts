import type { Listing, SearchFilters } from '@/lib/types';

/**
 * PropertyGuru adapter — stub.
 *
 * To implement:
 *  - Register as a PropertyGuru MLS/Partner and obtain an API key.
 *  - Call their REST endpoint (requires signed headers).
 *  - Normalise their `Listing` schema into our `Listing` type.
 *
 * This file intentionally throws when called without credentials so that
 * operators don't accidentally ship an empty adapter. Until credentials are
 * wired up, the `sample` source keeps the site populated.
 */
export async function fetchPropertyGuru(_filters?: SearchFilters): Promise<Listing[]> {
  const apiKey = process.env.PROPERTYGURU_API_KEY;
  if (!apiKey) {
    throw new Error(
      'PropertyGuru adapter is not configured. Set PROPERTYGURU_API_KEY after signing a partner agreement.',
    );
  }

  // Example shape — replace with the real endpoint.
  //
  // const res = await fetch('https://api.propertyguru.com.my/v2/listings?country=MY', {
  //   headers: { Authorization: `Bearer ${apiKey}` },
  // });
  // const data = await res.json();
  // return data.items.map(normalise);

  return [];
}
