'use client';

import { useMemo, useState } from 'react';

type PassportLane = {
  id: 'coins' | 'diecast' | 'figures';
  title: string;
  room: string;
  stamp: string;
  mission: string;
  href: string;
};

const passportLanes: PassportLane[] = [
  {
    id: 'coins',
    title: 'Coins',
    room: 'Coin Vault',
    stamp: 'CV-01',
    mission: 'Vault your first coin',
    href: 'https://coins.grailpulse.com?from=passport',
  },
  {
    id: 'diecast',
    title: 'Die Cast',
    room: 'Die Cast Garage',
    stamp: 'DG-01',
    mission: 'Park your first car',
    href: 'https://diecast.grailpulse.com?from=passport',
  },
  {
    id: 'figures',
    title: 'Figures',
    room: 'Figure Shelf',
    stamp: 'FS-01',
    mission: 'Pin your first figure',
    href: 'https://figurepinner.com?from=passport',
  },
];

export default function PassportSetup() {
  const [selected, setSelected] = useState<Array<PassportLane['id']>>(['diecast']);
  const [claimed, setClaimed] = useState(false);

  const selectedLanes = useMemo(
    () => passportLanes.filter((lane) => selected.includes(lane.id)),
    [selected],
  );

  const primaryLane = selectedLanes[0] ?? passportLanes[0];
  const progress = Math.round((selected.length / passportLanes.length) * 100);

  function toggleLane(id: PassportLane['id']) {
    setClaimed(false);
    setSelected((current) => {
      if (current.includes(id)) {
        return current.length === 1 ? current : current.filter((laneId) => laneId !== id);
      }

      return [...current, id];
    });
  }

  return (
    <section className="passport-setup" id="passport-setup" aria-label="Start your GrailPulse Passport">
      <style>{`
        .passport-setup {
          margin: 12px 0 52px;
          padding: 24px;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 28px;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.018)),
            rgba(7,10,14,0.88);
          box-shadow: 0 24px 70px rgba(0,0,0,0.28);
        }

        .passport-setup__grid {
          display: grid;
          grid-template-columns: 0.92fr 1.08fr;
          gap: 22px;
          align-items: stretch;
        }

        .passport-setup__intro {
          display: grid;
          gap: 16px;
          align-content: start;
        }

        .passport-setup__eyebrow {
          margin: 0;
          color: rgba(248,250,252,0.58);
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .passport-setup h2 {
          margin: 0;
          font-size: clamp(28px, 3vw, 44px);
          line-height: 1;
          letter-spacing: 0;
        }

        .passport-setup__intro-text {
          margin: 0;
          color: rgba(226,232,240,0.72);
          font-size: 16px;
          line-height: 1.65;
        }

        .lane-picker {
          display: grid;
          gap: 10px;
          margin-top: 6px;
        }

        .lane-toggle {
          width: 100%;
          min-height: 74px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 18px;
          background: rgba(255,255,255,0.035);
          color: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 14px;
          text-align: left;
          transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;
        }

        .lane-toggle:hover {
          transform: translateY(-1px);
          border-color: rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.055);
        }

        .lane-toggle[aria-pressed='true'] {
          border-color: rgba(251,113,133,0.55);
          background:
            linear-gradient(180deg, rgba(251,113,133,0.16), rgba(251,113,133,0.05)),
            rgba(255,255,255,0.03);
        }

        .lane-toggle__title {
          display: block;
          font-size: 16px;
          font-weight: 700;
        }

        .lane-toggle__room {
          display: block;
          margin-top: 4px;
          color: rgba(226,232,240,0.6);
          font-size: 13px;
        }

        .lane-toggle__mark {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.18);
          display: grid;
          place-items: center;
          color: rgba(248,250,252,0.7);
          font-size: 16px;
          flex: 0 0 auto;
        }

        .lane-toggle[aria-pressed='true'] .lane-toggle__mark {
          border-color: rgba(255,255,255,0.28);
          background: #fb7185;
          color: #21060c;
          font-weight: 900;
        }

        .passport-builder {
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.1);
          background:
            linear-gradient(135deg, rgba(132,18,33,0.24), rgba(255,255,255,0.035) 42%, rgba(255,255,255,0.02)),
            rgba(2,3,5,0.42);
          padding: 20px;
          display: grid;
          gap: 16px;
        }

        .passport-builder__top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 14px;
        }

        .passport-builder__id {
          margin: 4px 0 0;
          font-size: 34px;
          font-weight: 800;
          letter-spacing: 0;
        }

        .passport-builder__status {
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 999px;
          padding: 8px 10px;
          color: rgba(248,250,252,0.78);
          background: rgba(255,255,255,0.04);
          font-size: 12px;
          white-space: nowrap;
        }

        .passport-builder__progress {
          height: 9px;
          border-radius: 999px;
          overflow: hidden;
          background: rgba(255,255,255,0.08);
        }

        .passport-builder__bar {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #fb7185, #f8fafc);
          transition: width 180ms ease;
        }

        .stamp-preview-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
        }

        .stamp-preview {
          min-height: 118px;
          border-radius: 18px;
          border: 1px dashed rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.03);
          display: grid;
          align-content: center;
          gap: 7px;
          padding: 14px;
          opacity: 0.48;
          transition: opacity 160ms ease, border-color 160ms ease, background 160ms ease, transform 160ms ease;
        }

        .stamp-preview--active {
          opacity: 1;
          transform: translateY(-1px);
          border-color: rgba(251,113,133,0.55);
          background:
            linear-gradient(180deg, rgba(251,113,133,0.13), rgba(255,255,255,0.035)),
            rgba(255,255,255,0.03);
        }

        .stamp-preview__code {
          color: rgba(248,250,252,0.56);
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .stamp-preview__label {
          color: rgba(248,250,252,0.92);
          font-size: 16px;
          font-weight: 800;
        }

        .stamp-preview__state {
          color: rgba(226,232,240,0.6);
          font-size: 12px;
        }

        .first-win {
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.035);
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          flex-wrap: wrap;
        }

        .first-win p {
          margin: 0;
        }

        .first-win__label {
          color: rgba(248,250,252,0.56);
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .first-win__mission {
          margin-top: 4px;
          color: rgba(248,250,252,0.9);
          font-size: 17px;
          font-weight: 750;
        }

        .claim-button {
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(251,113,133,0.96), rgba(180,18,35,0.92));
          color: #fff;
          min-height: 44px;
          padding: 0 18px;
          font-size: 14px;
          font-weight: 750;
          box-shadow: 0 14px 30px rgba(251,113,133,0.18);
        }

        .claim-button:disabled {
          cursor: default;
          background: rgba(255,255,255,0.08);
          color: rgba(248,250,252,0.72);
          box-shadow: none;
        }

        .continue-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          padding: 0 16px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(248,250,252,0.9);
          background: rgba(255,255,255,0.04);
          font-size: 14px;
          font-weight: 700;
        }

        @media (max-width: 980px) {
          .passport-setup__grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .passport-setup {
            padding: 16px;
            border-radius: 22px;
          }

          .stamp-preview-grid {
            grid-template-columns: 1fr;
          }

          .passport-builder__top {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="passport-setup__grid">
        <div className="passport-setup__intro">
          <p className="passport-setup__eyebrow">Start here</p>
          <h2>Stamp the lanes you collect.</h2>
          <p className="passport-setup__intro-text">
            This is the first small win: pick your fandoms, watch the Passport update, then claim the
            identity before jumping into a live vertical.
          </p>

          <div className="lane-picker" aria-label="Choose Passport lanes">
            {passportLanes.map((lane) => {
              const isActive = selected.includes(lane.id);

              return (
                <button
                  aria-pressed={isActive}
                  className="lane-toggle"
                  key={lane.id}
                  onClick={() => toggleLane(lane.id)}
                  type="button"
                >
                  <span>
                    <span className="lane-toggle__title">{lane.title}</span>
                    <span className="lane-toggle__room">{lane.room}</span>
                  </span>
                  <span className="lane-toggle__mark" aria-hidden="true">
                    {isActive ? 'ON' : '+'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="passport-builder">
          <div className="passport-builder__top">
            <div>
              <p className="passport-setup__eyebrow">Passport draft</p>
              <p className="passport-builder__id">GP-000184</p>
            </div>
            <span className="passport-builder__status">
              {claimed ? 'Passport claimed' : `${selected.length}/3 lanes stamped`}
            </span>
          </div>

          <div className="passport-builder__progress" aria-label={`${progress}% Passport lane progress`}>
            <div className="passport-builder__bar" style={{ width: `${progress}%` }} />
          </div>

          <div className="stamp-preview-grid">
            {passportLanes.map((lane) => {
              const isActive = selected.includes(lane.id);

              return (
                <div className={isActive ? 'stamp-preview stamp-preview--active' : 'stamp-preview'} key={lane.id}>
                  <div className="stamp-preview__code">{lane.stamp}</div>
                  <div className="stamp-preview__label">{lane.room}</div>
                  <div className="stamp-preview__state">{isActive ? 'Stamped' : 'Available'}</div>
                </div>
              );
            })}
          </div>

          <div className="first-win">
            <div>
              <p className="first-win__label">First mission</p>
              <p className="first-win__mission">{claimed ? 'Passport saved. Open your first lane.' : primaryLane.mission}</p>
            </div>
            <button className="claim-button" disabled={claimed} onClick={() => setClaimed(true)} type="button">
              {claimed ? 'Claimed' : 'Claim Passport'}
            </button>
            {claimed && (
              <a className="continue-link" href={primaryLane.href}>
                Continue to {primaryLane.title}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
