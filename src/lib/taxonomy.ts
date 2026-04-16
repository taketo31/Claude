// Suumo-style facility / condition taxonomy, localised for Malaysian condos
// and for Japanese renters. Each item has a stable `id`, a JP label and an
// EN label. Listings record which ids apply; filters match on these ids.

export type TaxonomyItem = {
  id: string;
  ja: string;
  en: string;
};

export type TaxonomyGroup = {
  id: string;
  ja: string; // group heading in Japanese
  en: string; // group heading in English
  items: TaxonomyItem[];
};

// ── Building / common facilities ─────────────────────────────────────────────
export const BUILDING_FACILITIES: TaxonomyItem[] = [
  { id: 'pool',          ja: 'プール',            en: 'Swimming pool' },
  { id: 'infinity-pool', ja: 'インフィニティプール', en: 'Infinity pool' },
  { id: 'kids-pool',     ja: 'キッズプール',       en: 'Kids pool' },
  { id: 'jacuzzi',       ja: 'ジャグジー',         en: 'Jacuzzi' },
  { id: 'sauna',         ja: 'サウナ',             en: 'Sauna' },
  { id: 'steam-room',    ja: 'スチームルーム',     en: 'Steam room' },
  { id: 'gym',           ja: 'ジム',               en: 'Gym' },
  { id: 'yoga-room',     ja: 'ヨガルーム',         en: 'Yoga room' },
  { id: 'tennis',        ja: 'テニスコート',       en: 'Tennis court' },
  { id: 'badminton',     ja: 'バドミントンコート', en: 'Badminton court' },
  { id: 'bbq',           ja: 'BBQエリア',          en: 'BBQ area' },
  { id: 'playground',    ja: 'プレイグラウンド',   en: 'Playground' },
  { id: 'sky-lounge',    ja: 'スカイラウンジ',     en: 'Sky lounge' },
  { id: 'function-room', ja: 'ファンクションルーム', en: 'Function room' },
  { id: 'games-room',    ja: 'ゲームルーム',       en: 'Games room' },
  { id: 'coworking',     ja: 'コワーキング',       en: 'Co-working space' },
  { id: 'concierge',     ja: 'コンシェルジュ',     en: 'Concierge' },
  { id: '24h-security',  ja: '24時間セキュリティ', en: '24h security' },
  { id: 'covered-parking', ja: '屋根付き駐車場',   en: 'Covered parking' },
  { id: 'ev-charger',    ja: 'EV充電器',           en: 'EV charger' },
  { id: 'mall-access',   ja: 'モール直結',         en: 'Direct mall access' },
];

// ── In-unit features ─────────────────────────────────────────────────────────
export const UNIT_FEATURES: TaxonomyItem[] = [
  { id: 'bathtub',        ja: 'バスタブ',             en: 'Bathtub' },
  { id: 'private-sauna',  ja: '専用サウナ',           en: 'Private sauna' },
  { id: 'balcony',        ja: 'バルコニー',           en: 'Balcony' },
  { id: 'private-garden', ja: '専用庭',               en: 'Private garden' },
  { id: 'yard',           ja: 'ヤード',               en: 'Yard' },
  { id: 'rooftop-deck',   ja: 'ルーフデッキ',         en: 'Rooftop deck' },
  { id: 'walk-in-closet', ja: 'ウォークインクローゼット', en: 'Walk-in closet' },
  { id: 'maids-room',     ja: 'メイド部屋',           en: 'Maid\u2019s room' },
  { id: 'study',          ja: '書斎',                 en: 'Study room' },
  { id: 'dual-key',       ja: 'デュアルキー',         en: 'Dual-key unit' },
  { id: 'private-lift',   ja: '専用エレベーター',     en: 'Private lift' },
  { id: 'ensuite',        ja: 'エンスイートバス',     en: 'Ensuite bathroom' },
  { id: 'corner-unit',    ja: '角部屋',               en: 'Corner unit' },
  { id: 'high-floor',     ja: '高層階',               en: 'High floor' },
  { id: 'klcc-view',      ja: 'KLCCビュー',           en: 'KLCC view' },
  { id: 'pool-view',      ja: 'プールビュー',         en: 'Pool view' },
  { id: 'aircon-all',     ja: '全室エアコン',         en: 'A/C in all rooms' },
];

// ── Conditions / lifestyle ──────────────────────────────────────────────────
export const CONDITION_TAGS: TaxonomyItem[] = [
  { id: 'pet-ok',            ja: 'ペット可',           en: 'Pet-friendly' },
  { id: 'dog-ok',            ja: '犬可',               en: 'Dog-friendly' },
  { id: 'cat-ok',            ja: '猫可',               en: 'Cat-friendly' },
  { id: 'quiet-area',        ja: '閑静なエリア',       en: 'Quiet area' },
  { id: 'low-density',       ja: '低層・低密度',       en: 'Low density' },
  { id: 'gated',             ja: 'ゲーテッドコミュニティ', en: 'Gated community' },
  { id: 'expat-friendly',    ja: 'Expatフレンドリー',  en: 'Expat-friendly' },
  { id: 'jskl-nearby',       ja: 'JSKL(日本人学校)近く', en: 'Near JSKL' },
  { id: 'intl-school-nearby', ja: 'インターナショナル校近く', en: 'Near international school' },
  { id: 'jp-supermarket',    ja: '日系スーパー近く',   en: 'Japanese supermarket nearby' },
  { id: 'halal-dining',      ja: 'ハラル飲食充実',     en: 'Halal dining nearby' },
  { id: 'short-term-ok',     ja: '短期賃貸可',         en: 'Short-term OK' },
  { id: 'move-in-ready',     ja: '即入居可',           en: 'Move-in ready' },
  { id: 'newly-renovated',   ja: 'リノベ済',           en: 'Newly renovated' },
];

export const TAXONOMY: TaxonomyGroup[] = [
  { id: 'building', ja: '設備・共用施設', en: 'Building facilities', items: BUILDING_FACILITIES },
  { id: 'unit',     ja: '室内設備',       en: 'Unit features',        items: UNIT_FEATURES },
  { id: 'tags',     ja: 'こだわり条件',   en: 'Conditions',           items: CONDITION_TAGS },
];

const LABEL_INDEX: Record<string, TaxonomyItem> = Object.fromEntries(
  TAXONOMY.flatMap((g) => g.items.map((i) => [i.id, i])),
);

export function labelFor(id: string, locale: 'ja' | 'en'): string {
  const item = LABEL_INDEX[id];
  if (!item) return id;
  return locale === 'ja' ? item.ja : item.en;
}
