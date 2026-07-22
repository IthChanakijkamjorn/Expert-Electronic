// Words that should always be ALL CAPS
const ALWAYS_CAPS = new Set(['PA', 'IP', 'LED', 'TV', 'HD', '4K', 'LCD', 'HDMI', 'USB', 'AC', 'DC', 'VGA']);

// Special cases that don't follow normal rules
const SPECIAL_CASES = {
  'itchub': 'itcHUB',
};

/**
 * Converts a slug like "ip-pa-intercom" → "IP/PA Intercom"
 * Handles ALL CAPS abbreviations and special cases automatically.
 */
export function slugToLabel(slug) {
  if (!slug) return '';

  // Check special cases first
  if (SPECIAL_CASES[slug.toLowerCase()]) {
    return SPECIAL_CASES[slug.toLowerCase()];
  }

  return slug
    .split('-')
    .map((word) => {
      const upper = word.toUpperCase();
      if (ALWAYS_CAPS.has(upper)) return upper;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}
