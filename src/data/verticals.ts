// Single source of truth for the GrailPulse verticals (the price-guide "lanes").
//
// Facts — name, product, url, status — live HERE ONLY. The homepage lane grid,
// the /verticals directory, and the methodology page all read from this module so
// the roster can never drift out of sync (the way three hand-authored copies did
// before). When a vertical goes live, flip its `status` here and nowhere else.
//
// Liveness verified 2026-06-12: coins / diecast / figures return 200;
// games.grailpulse.com is not deployed yet (status 'soon', no outbound link).

export type VerticalStatus = 'live' | 'soon';

export type Vertical = {
  key: string;
  /** Plain-language category shown as the card headline. */
  name: string;
  /** The product/site this lane routes to. */
  product: string;
  /** The collector's word for their space. */
  room: string;
  /** One-line description of what the guide covers. */
  category: string;
  /** Outbound URL when live; null when 'soon' (renders non-clickable). */
  href: string | null;
  status: VerticalStatus;
  /** Concrete accent color for the lane glow (kept in sync with --gp-* tokens). */
  accent: string;
  /** One honest sentence in collector voice. */
  blurb: string;
};

export const VERTICALS: Vertical[] = [
  {
    key: 'coins',
    name: 'Coins',
    product: 'CoinSpinner',
    room: 'Vault',
    category: 'U.S. coins, mintmarks & varieties',
    href: 'https://coins.grailpulse.com',
    status: 'live',
    accent: '#f59e0b',
    blurb: 'Grade-band pricing for key dates, mint errors, and the rolls worth more than face.',
  },
  {
    key: 'diecast',
    name: 'Die Cast',
    product: 'Die Cast',
    room: 'Garage',
    category: 'Hot Wheels, Matchbox & premium 1:64',
    href: 'https://diecast.grailpulse.com',
    status: 'live',
    accent: '#f87171',
    blurb: 'Mainline, premium, and chase castings tracked without losing the thrill of the hunt.',
  },
  {
    key: 'figures',
    name: 'Figures',
    product: 'FigurePinner',
    room: 'Shelf',
    category: 'Action figures across every fandom',
    href: 'https://figurepinner.com',
    status: 'live',
    accent: '#38bdf8',
    blurb: 'Real sold-comp pricing, sealed-vs-loose splits, and want-lists for the figures you chase.',
  },
  {
    key: 'games',
    name: 'Video Games',
    product: 'GrailGamer',
    room: 'Library',
    category: 'Retro & modern video games',
    href: null,
    status: 'soon',
    accent: '#4ade80',
    blurb: 'Loose, complete, and sealed pricing across decades of cartridges and discs.',
  },
];

export const LIVE_VERTICALS = VERTICALS.filter((v) => v.status === 'live');
export const SOON_VERTICALS = VERTICALS.filter((v) => v.status === 'soon');
export const LIVE_COUNT = LIVE_VERTICALS.length;

/** Format a list as "a, b & c" (Oxford "&" for the last item). */
function fmtList(items: string[]): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(', ')} & ${items[items.length - 1]}`;
}

/** "coins, die cast & figures" — derived from VERTICALS, never hand-typed. */
export const LIVE_NAMES_PHRASE = fmtList(LIVE_VERTICALS.map((v) => v.name.toLowerCase()));

/** "video games next" — derived from VERTICALS, never hand-typed. */
export const SOON_NAMES_PHRASE = SOON_VERTICALS.length
  ? `${fmtList(SOON_VERTICALS.map((v) => v.name.toLowerCase()))} next`
  : '';
