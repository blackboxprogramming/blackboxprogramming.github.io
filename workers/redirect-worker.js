/**
 * BlackRoad OS, Inc. — Proprietary. All Rights Reserved.
 *
 * Cloudflare Worker: Edge Redirect & Security Headers
 * Handles redirects, security headers, and edge caching for
 * blackboxprogramming.github.io
 *
 * Deploy: wrangler deploy workers/redirect-worker.js
 */

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self' https://api.github.com",
    "frame-ancestors 'none'",
  ].join('; '),
};

const REDIRECTS = {
  '/github': 'https://github.com/blackboxprogramming',
  '/os': 'https://blackroad.io',
  '/stripe': 'https://dashboard.stripe.com',
};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.toLowerCase();

    // Handle redirects
    if (REDIRECTS[path]) {
      return Response.redirect(REDIRECTS[path], 301);
    }

    // Fetch origin
    const response = await fetch(request);
    const newResponse = new Response(response.body, response);

    // Apply security headers
    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      newResponse.headers.set(key, value);
    }

    // Cache static assets at the edge for 1 year
    if (path.match(/\.(css|js|png|jpg|jpeg|gif|svg|woff2?|ttf|eot|ico)$/)) {
      newResponse.headers.set(
        'Cache-Control',
        'public, max-age=31536000, immutable'
      );
    }

    // Cache HTML for 10 minutes at edge, revalidate
    if (path.endsWith('.html') || path === '/') {
      newResponse.headers.set(
        'Cache-Control',
        'public, max-age=600, s-maxage=600, stale-while-revalidate=86400'
      );
    }

    return newResponse;
  },
};
