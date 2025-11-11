import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add cache headers for static assets
  if (
    request.nextUrl.pathname.startsWith('/_next/static') ||
    request.nextUrl.pathname.startsWith('/carousel') ||
    request.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|webp|avif|svg|ico)$/i)
  ) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // Add cache headers for images
  if (request.nextUrl.pathname.startsWith('/_next/image')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // Compress responses
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');

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
