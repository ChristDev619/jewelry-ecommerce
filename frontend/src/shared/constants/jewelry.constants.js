export const METAL_TYPES = {
  '14K_WHITE_GOLD': '14K White Gold',
  '18K_WHITE_GOLD': '18K White Gold',
  '14K_YELLOW_GOLD': '14K Yellow Gold',
  '18K_YELLOW_GOLD': '18K Yellow Gold',
  '14K_ROSE_GOLD': '14K Rose Gold',
  '18K_ROSE_GOLD': '18K Rose Gold',
  'PLATINUM': 'Platinum',
  'STERLING_SILVER': 'Sterling Silver',
};

export const STYLES = {
  'CLUSTER': 'Cluster',
  'MARQUISE': 'Marquise',
  'STATION': 'Station',
  'STACKABLE': 'Stackable',
  'WIDE_BAND': 'Wide Band',
  'SPIKE': 'Spike',
  'BYPASS': 'Bypass',
  'SOLITAIRE': 'Solitaire',
  'HALO': 'Halo',
  'THREE_STONE': 'Three Stone',
  'ETERNITY': 'Eternity',
  'VINTAGE': 'Vintage',
};

export const BIRTHSTONE_MONTHS = {
  'JANUARY': 'January (Garnet)',
  'FEBRUARY': 'February (Amethyst)',
  'MARCH': 'March (Aquamarine)',
  'APRIL': 'April (Diamond)',
  'MAY': 'May (Emerald)',
  'JUNE': 'June (Pearl)',
  'JULY': 'July (Ruby)',
  'AUGUST': 'August (Peridot)',
  'SEPTEMBER': 'September (Sapphire)',
  'OCTOBER': 'October (Opal)',
  'NOVEMBER': 'November (Topaz)',
  'DECEMBER': 'December (Turquoise)',
};

export const PRICE_RANGES = [
  { id: 'under_1000', label: 'Under $1,000', min: 0, max: 999 },
  { id: '1000_2500', label: '$1,000 - $2,500', min: 1000, max: 2500 },
  { id: '2500_5000', label: '$2,500 - $5,000', min: 2500, max: 5000 },
  { id: '5000_10000', label: '$5,000 - $10,000', min: 5000, max: 10000 },
  { id: 'over_10000', label: 'Over $10,000', min: 10000, max: Infinity },
];

export const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price_low_high', label: 'Price: Low to High' },
  { value: 'price_high_low', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'popular', label: 'Most Popular' },
];

export const CATEGORIES = {
  'RINGS': 'Rings',
  'NECKLACES': 'Necklaces',
  'EARRINGS': 'Earrings',
  'BRACELETS': 'Bracelets',
};

