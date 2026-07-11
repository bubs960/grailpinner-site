import type { Vertical } from '@/data/verticals';
import { CollectorObject } from '@/app/components/CollectorObject';

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
        <span
          className={`gp-lane__badge ${live ? 'is-live' : 'is-soon'}`}
          aria-label={live ? 'Status: live' : 'Status: coming soon'}
        >
          {live ? 'Live' : 'Coming soon'}
        </span>
      </div>
      <div className="gp-lane__body">
        <div className="gp-lane__copy">
          <p className="gp-lane__category">{v.name}</p>
          <h3 className="gp-lane__name">{v.product}</h3>
          <p className="gp-lane__cat">{v.category}</p>
        </div>
        <div className="gp-lane__object">
          <CollectorObject kind={v.key} />
        </div>
      </div>
      <p className="gp-lane__blurb">{v.blurb}</p>
      <p className="gp-lane__evidence">{v.evidence}</p>
      <span className="gp-lane__cta">{live ? `Enter ${v.product} →` : 'In development'}</span>
    </>
  );

  return live && v.href ? (
    <a className="gp-lane" href={v.href} rel="sponsored nofollow" style={accentStyle}>
      {inner}
    </a>
  ) : (
    <div className="gp-lane gp-lane--soon" style={accentStyle} aria-disabled="true">
      {inner}
    </div>
  );
}
