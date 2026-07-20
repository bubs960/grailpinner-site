'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * HubAd — Adsterra iframe banner unit for the GrailPulse hub homepage.
 *
 * Renders inside a same-origin `srcDoc` iframe we own, NOT via next/script.
 * next/script's lazyOnload strategy portals its <script> tag to the end of
 * <body>, decoupled from JSX position -- Adsterra's invoke.js then inserts its
 * ad iframe adjacent to its own (now body-end) script tag, so the creative
 * rendered orphaned and invisible, and the fill-detection observer (watching
 * the intended frame div) never fired. See
 * COINSPINNER-TO-WEB-HUB-ADSTERRA-VERIFY-2026-07-19.md for the live-DOM proof.
 * A same-origin srcDoc iframe sidesteps this: the ad markup parses as part of
 * THIS iframe's own initial document, so injection lands inside it, at the
 * position we control. Mirrors figurepinner-site's AdSlot.tsx fix
 * (0368abc + 913efb1) -- including the fill-detection effect being keyed to
 * document identity, not a one-shot flag, to avoid the same
 * placeholder-vs-real-srcDoc-document race that fix also had to close.
 *
 * Reserves the frame's height immediately (assumes fill -- zero layout shift
 * on the common fast-fill case) and collapses the whole unit only if nothing
 * fills within FILL_TIMEOUT_MS, instead of the previous display:none-until-
 * filled behavior (which traded the empty-gap problem for a real CLS hit at
 * fill time, since lazyOnload fires post-load).
 */

const BANNER_KEY = '217019052e306488340846c092cb5ab6';
const FILL_TIMEOUT_MS = 4000;

export function HubAd() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [adState, setAdState] = useState<'pending' | 'filled' | 'unfilled'>('pending');

  useEffect(() => {
    const iframeEl = iframeRef.current;
    if (!iframeEl) return;

    let observer: MutationObserver | null = null;
    let attachedDoc: Document | null = null;

    const attach = () => {
      const doc = iframeEl.contentDocument;
      if (!doc || !doc.body) return;
      if (doc === attachedDoc) return;
      observer?.disconnect();
      attachedDoc = doc;

      const checkForAd = () => {
        if (doc.body.querySelector('iframe')) setAdState('filled');
      };
      checkForAd();

      observer = new MutationObserver(checkForAd);
      observer.observe(doc.body, { childList: true, subtree: true });
    };

    iframeEl.addEventListener('load', attach);
    attach(); // covers the case where the srcDoc document is already loaded by the time this effect runs

    const timeout = setTimeout(() => {
      setAdState(current => (current === 'pending' ? 'unfilled' : current));
    }, FILL_TIMEOUT_MS);

    return () => {
      iframeEl.removeEventListener('load', attach);
      observer?.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  if (adState === 'unfilled') return null;

  const adHtml = '<!DOCTYPE html><html><head><style>html,body{margin:0;padding:0;overflow:hidden;}</style></head><body>' +
    `<script>atOptions = { 'key': '${BANNER_KEY}', 'format': 'iframe', 'height': 250, 'width': 300, 'params': {} };</script>` +
    `<script src="https://www.highperformanceformat.com/${BANNER_KEY}/invoke.js"></script>` +
    '</body></html>';

  return (
    <aside className="gp-hub-ad" aria-label="Advertisement">
      <span className="gp-hub-ad__label">Advertisement</span>
      <div className="gp-hub-ad__frame">
        <iframe
          ref={iframeRef}
          srcDoc={adHtml}
          title="Advertisement"
          style={{ width: 300, height: 250, border: 'none', maxWidth: '100%' }}
        />
      </div>
    </aside>
  );
}
