import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

// Map old paths (without locale prefix) to new paths
const REDIRECTS: Record<string, string> = {
  // Old RIB sub-pages
  '/rib/taxi-transport': '/rib-tur-bergen',
  '/rib/blatur': '/rib-tur-bergen',
  '/rib/rib-safari': '/rib-tur-bergen',
  '/rib/havrafting': '/rib-tur-bergen',
  '/rib/vare-smitteverntiltak': '/rib-tur-bergen',
  '/rib/kapasitet': '/rib-tur-bergen',
  // Old Norwegian site paths
  '/no/forside': '/',
  '/no/om-oss': '/om-oss',
  '/no/bilder': '/galleri',
  '/no/kontakt': '/bestilling',
  // Old Webflow paths (Google-indexed)
  '/opplevelser/rib-tur': '/rib-tur-bergen',
  '/opplevelser/batutleie': '/baatutleie-bergen',
  '/opplevelser/badstu': '/sauna-badstue-bergen',
  '/betalingsbetingelser': '/personvern',
};

// English-specific redirects (full path including /en)
const EN_REDIRECTS: Record<string, string> = {
  '/en/opplevelser/rib-tur': '/en/rib-tour-bergen',
  '/en/opplevelser/badstu': '/en/sauna-bergen',
  '/en/opplevelser/batutleie': '/en/boat-rental-bergen',
  '/en/betalingsbetingelser': '/en/privacy',
};

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check English-specific redirects first (full path match)
  const enDestination = EN_REDIRECTS[pathname];
  if (enDestination) {
    const url = request.nextUrl.clone();
    url.pathname = enDestination;
    return NextResponse.redirect(url, 301);
  }

  // Check general redirects (Norwegian / no-prefix paths)
  const destination = REDIRECTS[pathname];
  if (destination) {
    const url = request.nextUrl.clone();
    url.pathname = destination;
    return NextResponse.redirect(url, 301);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
