'use client';

import { useEffect, useRef, useState } from 'react';

const BANNER_KEY = '5f4b07f4ab1038d99bfe79351c5743a0';

export function HubAd() {
  const slotRef = useRef<HTMLElement>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;

    const checkForAd = () => setFilled(Boolean(slot.querySelector('iframe')));
    checkForAd();

    const observer = new MutationObserver(checkForAd);
    observer.observe(slot, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <aside
      ref={slotRef}
      className={`gp-hub-ad${filled ? ' is-filled' : ''}`}
      aria-label="Advertisement"
    >
      <span className="gp-hub-ad__label">Advertisement</span>
      <div className="gp-hub-ad__frame">
        <script
          dangerouslySetInnerHTML={{
            __html: `atOptions = {
  'key' : '${BANNER_KEY}',
  'format' : 'iframe',
  'height' : 60,
  'width' : 468,
  'params' : {}
};`,
          }}
        />
        <script src={`https://www.highperformanceformat.com/${BANNER_KEY}/invoke.js`} />
      </div>
    </aside>
  );
}
