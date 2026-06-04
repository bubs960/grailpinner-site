import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Static export — GrailPulse hub is a pure landing page with no SSR needs.
  // CF Pages serves the output/ directory directly, no worker required.
  output: 'export',

  // Disable Next.js image optimization (not supported in static export).
  images: {
    unoptimized: true,
  },
}

export default nextConfig
