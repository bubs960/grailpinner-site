import type { Vertical } from '@/data/verticals';

// One price-guide "lane" card. Live verticals are real outbound links; pending
// ones render as a non-clickable card with a "Coming soon" badge (never a dead
// link). Shared by the homepage grid and the /verticals directory.

export function LaneCard({ v }: { v: Vertical }) {
  const live = v.status === 'live';
  const accentStyle = { ['--lane-accent' as never]: v.accent };

  const inner = (
    <>
      <div className="gp-lane__top">
        <span className="gp-lane__room">{v.room}</span>
        <span className={`gp-lane__badge ${live ? 'is-live' : 'is-soon'}`}>
          {live ? 'Live' : 'Coming soon'}
        </span>
      </div>
      <h3 className="gp-lane__name">{v.name}</h3>
      <p className="gp-lane__cat">{v.category}</p>
      <p className="gp-lane__blurb">{v.blurb}</p>
      <span className="gp-lane__cta">{live ? `Open ${v.product} →` : 'In the works'}</span>
    </>
  );

  return live && v.href ? (
    <a className="gp-lane" href={v.href} target="_blank" rel="noopener noreferrer" style={accentStyle}>
      {inner}
    </a>
  ) : (
    <div className="gp-lane gp-lane--soon" style={accentStyle} aria-disabled="true">
      {inner}
    </div>
  );
}
