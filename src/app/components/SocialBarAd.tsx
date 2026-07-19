'use client';

import Script from 'next/script';

/**
 * SocialBarAd — Adsterra Social Bar unit (2-week trial, Steve-approved
 * 2026-07-19). Homepage only. No Pro-gating: this site has no accounts.
 * Self-contained overlay widget — Adsterra renders its own UI.
 */
export function SocialBarAd() {
  return (
    <Script
      id="adsterra-social-bar"
      strategy="lazyOnload"
      src="https://pl30442178.effectivecpmnetwork.com/4f/59/fe/4f59fe0a7c2ac52c2805a94e31d2c8d1.js"
    />
  );
}
