import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  // Static assets - long cache, immutable
  if (
    pathname.startsWith('/_next/static') ||
    pathname.startsWith('/carousel') ||
    pathname.match(/\.(jpg|jpeg|png|gif|webp|avif|svg|ico|woff|woff2)$/i)
  ) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // Optimized images - long cache
  if (pathname.startsWith('/_next/image')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // HTML pages - stale-while-revalidate for better UX
  if (
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/api') &&
    !pathname.match(/\.[a-z]+$/i)
  ) {
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400'
    );
  }

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Content negotiation
  response.headers.set('Vary', 'Accept-Encoding');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};
