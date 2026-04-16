// Shared data model for listings. Designed to be a superset of fields
// exposed by PropertyGuru and iProperty so adapters can normalise into it.

export type ListingType = 'rent' | 'sale';
export type PropertyCategory =
  | 'condo'
  | 'apartment'
  | 'serviced-residence'
  | 'landed'
  | 'studio';
export type Furnishing = 'fully' | 'partial' | 'none';
export type Source = 'propertyguru' | 'iproperty' | 'sample';

export interface TransitLink {
  /** LRT / MRT / Monorail / KTM station name (English) */
  station: string;
  /** Walking minutes, Suumo-style "徒歩◯分" */
  walkMinutes: number;
  line?: string;
}

export interface Area {
  /** Primary neighbourhood, English */
  name: string;
  /** Japanese rendering (if known) — e.g. "モントキアラ" */
  nameJa?: string;
  city: string;
  state: string;
}

export interface Listing {
  id: string;
  source: Source;
  sourceUrl?: string;

  title: string;
  titleJa?: string;
  description?: string;
  descriptionJa?: string;

  listingType: ListingType;
  category: PropertyCategory;

  /** MYR. Monthly for rent, total for sale. */
  priceMyr: number;

  bedrooms: number;
  bathrooms: number;
  /** Built-up area in square feet (Malaysia convention) */
  sqft: number;

  furnishing: Furnishing;
  area: Area;

  transit: TransitLink[];

  /** Building / common facility ids from taxonomy (BUILDING_FACILITIES). */
  amenities: string[];
  /** In-unit feature ids from taxonomy (UNIT_FEATURES). */
  unitFeatures: string[];
  /** Lifestyle / condition tag ids from taxonomy (CONDITION_TAGS). */
  tags: string[];

  images: string[];

  /** Popular-with-Japanese-residents signal */
  jpFriendly?: {
    japaneseSchoolMinutes?: number;
    japaneseSupermarket?: boolean;
    notes?: string;
    notesJa?: string;
  };

  listedAt: string; // ISO date
}

export interface SearchFilters {
  listingType: ListingType;
  areas: string[]; // Area.name values
  minPriceMyr?: number;
  maxPriceMyr?: number;
  minBedrooms?: number;
  category?: PropertyCategory;
  furnishing?: Furnishing;
  maxWalkMinutes?: number;
  jpFriendlyOnly?: boolean;
  keyword?: string;

  /** All of these amenity ids must be present on the listing. */
  amenities?: string[];
  /** All of these unit-feature ids must be present. */
  unitFeatures?: string[];
  /** All of these condition tag ids must be present. */
  tags?: string[];
}
