// Minimal hand-rolled i18n — keeps the prototype dependency-free.
// Add keys here; the LocaleSwitcher flips `ja` / `en` via a cookie.

export type Locale = 'ja' | 'en';
export const LOCALES: Locale[] = ['ja', 'en'];
export const DEFAULT_LOCALE: Locale = 'ja';

type Dict = Record<string, string>;

const ja: Dict = {
  'app.title': 'マレーシア不動産検索',
  'app.tagline': '日本人のためのクアラルンプール物件検索',
  'app.poweredBy': 'PropertyGuru / iProperty データ連携対応',

  'nav.search': '物件を探す',
  'nav.favorites': 'お気に入り',
  'nav.guide': '移住ガイド',

  'filter.heading': '検索条件',
  'filter.listingType': '種別',
  'filter.rent': '賃貸',
  'filter.sale': '売買',
  'filter.area': 'エリア',
  'filter.price': '家賃・価格',
  'filter.priceRent': '家賃 (月額 MYR)',
  'filter.priceSale': '価格 (MYR)',
  'filter.bedrooms': '寝室数',
  'filter.category': '物件種別',
  'filter.furnishing': '家具',
  'filter.furnishing.fully': 'フルファーニッシュ',
  'filter.furnishing.partial': 'パーシャル',
  'filter.furnishing.none': '家具なし',
  'filter.walk': '駅徒歩',
  'filter.walkMax': '分以内',
  'filter.jpFriendly': '日本人向けエリアのみ',
  'filter.amenities': '設備・共用施設',
  'filter.unitFeatures': '室内設備',
  'filter.tags': 'こだわり条件',
  'filter.showMore': 'すべて表示',
  'filter.showLess': '折りたたむ',
  'filter.keyword': 'キーワード',
  'filter.apply': 'この条件で検索',
  'filter.reset': 'リセット',
  'filter.any': '指定なし',

  'category.condo': 'コンドミニアム',
  'category.apartment': 'アパート',
  'category.serviced-residence': 'サービスレジデンス',
  'category.landed': '戸建て',
  'category.studio': 'スタジオ',

  'list.results': '{count}件の物件',
  'list.sort': '並び替え',
  'list.sort.newest': '新着順',
  'list.sort.priceAsc': '価格が安い順',
  'list.sort.priceDesc': '価格が高い順',
  'list.sort.sqftDesc': '広い順',
  'list.empty': '条件に合う物件が見つかりませんでした。',

  'card.perMonth': '/月',
  'card.bedrooms': 'LDK',
  'card.sqft': 'sqft',
  'card.sqm': '㎡',
  'card.tatami': '畳',
  'card.walk': '徒歩{n}分',
  'card.jpBadge': '日本人に人気',
  'card.viewDetail': '詳細を見る',

  'detail.overview': '物件概要',
  'detail.price': '賃料 / 価格',
  'detail.layout': '間取り',
  'detail.area': '面積',
  'detail.furnishing': '家具',
  'detail.category': '種別',
  'detail.location': '所在地',
  'detail.transit': '最寄り駅',
  'detail.amenities': '設備・共用施設',
  'detail.jpNotes': '日本人居住者向け情報',
  'detail.source': '出典',
  'detail.backToList': '← 検索に戻る',

  'currency.toggle': '通貨',
  'area.toggle': '面積単位',

  'footer.disclaimer': '掲載情報はサンプルデータです。実データ連携には各サイトとの正式な契約が必要です。',
};

const en: Dict = {
  'app.title': 'Malaysia Property Search',
  'app.tagline': 'Kuala Lumpur listings, Japanese-friendly',
  'app.poweredBy': 'PropertyGuru / iProperty adapter-ready',

  'nav.search': 'Search',
  'nav.favorites': 'Favorites',
  'nav.guide': 'Relocation guide',

  'filter.heading': 'Filters',
  'filter.listingType': 'Listing type',
  'filter.rent': 'Rent',
  'filter.sale': 'Sale',
  'filter.area': 'Area',
  'filter.price': 'Price',
  'filter.priceRent': 'Rent (monthly MYR)',
  'filter.priceSale': 'Price (MYR)',
  'filter.bedrooms': 'Bedrooms',
  'filter.category': 'Property type',
  'filter.furnishing': 'Furnishing',
  'filter.furnishing.fully': 'Fully furnished',
  'filter.furnishing.partial': 'Partially furnished',
  'filter.furnishing.none': 'Unfurnished',
  'filter.walk': 'Walk to transit',
  'filter.walkMax': 'min or less',
  'filter.jpFriendly': 'Japanese-friendly areas only',
  'filter.amenities': 'Building facilities',
  'filter.unitFeatures': 'Unit features',
  'filter.tags': 'Conditions',
  'filter.showMore': 'Show all',
  'filter.showLess': 'Collapse',
  'filter.keyword': 'Keyword',
  'filter.apply': 'Search',
  'filter.reset': 'Reset',
  'filter.any': 'Any',

  'category.condo': 'Condominium',
  'category.apartment': 'Apartment',
  'category.serviced-residence': 'Serviced residence',
  'category.landed': 'Landed',
  'category.studio': 'Studio',

  'list.results': '{count} properties',
  'list.sort': 'Sort',
  'list.sort.newest': 'Newest',
  'list.sort.priceAsc': 'Price: low to high',
  'list.sort.priceDesc': 'Price: high to low',
  'list.sort.sqftDesc': 'Largest first',
  'list.empty': 'No properties match your filters.',

  'card.perMonth': '/mo',
  'card.bedrooms': 'BR',
  'card.sqft': 'sqft',
  'card.sqm': 'm²',
  'card.tatami': 'tatami',
  'card.walk': '{n} min walk',
  'card.jpBadge': 'Popular with JP residents',
  'card.viewDetail': 'View details',

  'detail.overview': 'Overview',
  'detail.price': 'Price',
  'detail.layout': 'Layout',
  'detail.area': 'Floor area',
  'detail.furnishing': 'Furnishing',
  'detail.category': 'Type',
  'detail.location': 'Location',
  'detail.transit': 'Nearest transit',
  'detail.amenities': 'Amenities',
  'detail.jpNotes': 'Japanese-resident notes',
  'detail.source': 'Source',
  'detail.backToList': '← Back to search',

  'currency.toggle': 'Currency',
  'area.toggle': 'Area unit',

  'footer.disclaimer': 'Listings shown are sample data. Live integration requires a formal data agreement with each source.',
};

const DICTS: Record<Locale, Dict> = { ja, en };

export function t(locale: Locale, key: string, vars?: Record<string, string | number>): string {
  const dict = DICTS[locale] ?? DICTS[DEFAULT_LOCALE];
  let value = dict[key] ?? DICTS[DEFAULT_LOCALE][key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      value = value.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    }
  }
  return value;
}
