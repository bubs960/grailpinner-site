// Single source of truth for the GrailPulse verticals (the price-guide "lanes").
//
// Facts — name, product, url, status — live HERE ONLY. The homepage lane grid,
// the /verticals directory, and the methodology page all read from this module so
// the roster can never drift out of sync (the way three hand-authored copies did
// before). When a vertical goes live, flip its `status` here and nowhere else.
//
// Liveness verified 2026-07-23: coins / diecast / figures / games all return 200
// (games.grailpulse.com went live 7/19 per Steve's confirmation — this file was
// still stale, flipped 'soon' -> 'live' here).
//
// `count` values verified live 2026-07-10 (coins/diecast/figures) and 2026-07-23
// (games, from its own homepage stat) — re-verify before reusing if this file is
// untouched for a long stretch.

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
  /** Short description of how the guide prices things. */
  evidence: string;
  /** Real catalog-size stat as displayed on the vertical's own live site (never invented). */
  count?: number;
  /** What `count` counts, in the vertical's own words (e.g. "coin references"). */
  countUnit?: string;
};

/** The hub's hero H1 — shared with the OG/social card so the two can't drift. */
export const HERO_TITLE = 'Know what belongs on every shelf.';

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
    blurb: 'A single misaligned die in 1955 sent doubled-die Lincoln cents into circulation — collectors still check their change for one.',
    evidence: 'Published-guide estimates · grade and source context',
    count: 8536,
    countUnit: 'coin references',
  },
  {
    key: 'diecast',
    name: 'Die Cast',
    product: 'GrailPulse Die Cast',
    room: 'Garage',
    category: 'Hot Wheels, Matchbox & premium 1:64',
    href: 'https://diecast.grailpulse.com',
    status: 'live',
    accent: '#f87171',
    blurb: 'Mattel scrapped the pink Beach Bomb prototype for tipping on its own orange track — only two are known to survive.',
    evidence: 'Modeled seed estimates · casting and condition context',
    count: 13024,
    countUnit: 'reference records',
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
    blurb: "Christmas 1977's hottest Star Wars toy wasn't a figure — it was an empty box collectors could mail in for one.",
    evidence: 'Public sold comps · loose and sealed context',
    count: 22500,
    countUnit: 'figures',
  },
  {
    key: 'games',
    name: 'Video Games',
    product: 'GrailGamer',
    room: 'Library',
    category: 'Retro & modern video games',
    href: 'https://games.grailpulse.com',
    status: 'live',
    accent: '#4ade80',
    blurb: 'Nintendo made just 116 World Championships cartridges in 1990 — the rarest, most chased grail in NES history.',
    evidence: 'Real sold data · condition-graded (Loose, CIB, Sealed)',
    count: 44860,
    countUnit: 'games',
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

/** Sum of live verticals' real counts — derived, never hand-typed. 0 if none set. */
export const LIVE_ITEM_COUNT = LIVE_VERTICALS.reduce((sum, v) => sum + (v.count ?? 0), 0);
