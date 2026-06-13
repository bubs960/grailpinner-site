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
  /** CSS color (token reference) for the lane accent. */
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
    category: 'U.S. coins, key dates & varieties',
    href: 'https://coins.grailpulse.com',
    status: 'live',
    accent: 'var(--gp-gold)',
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
    accent: 'var(--gp-red)',
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
    accent: 'var(--gp-blue)',
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
    accent: 'var(--gp-green)',
    blurb: 'Loose, complete, and sealed pricing across decades of cartridges and discs.',
  },
];

export const LIVE_VERTICALS = VERTICALS.filter((v) => v.status === 'live');
export const LIVE_COUNT = LIVE_VERTICALS.length;
