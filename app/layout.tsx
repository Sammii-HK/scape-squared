import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from 'components/analytics/google-analytics';
import Navbar from 'components/layout/navbar';
import { Inter } from 'next/font/google';
import { ReactNode, Suspense } from 'react';
import './globals.css';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;

export const metadata = {
  title: {
    default: SITE_NAME || 'scape squared',
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  other: {
    'google-site-verification': 'nU-MGbKTYYrFX-Yh7SIgQ1szTEoYTF08PZU1nihRS6g'
  },
  ...(TWITTER_CREATOR &&
    TWITTER_SITE && {
      twitter: {
        card: 'summary_large_image',
        creator: TWITTER_CREATOR,
        site: TWITTER_SITE
      }
    })
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial']
});

export default async function RootLayout({ children }: { children: ReactNode }) {
  const siteUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : process.env.NEXT_PUBLIC_SITE_URL || 'https://scapedsquared.com';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME || 'scape²',
    url: siteUrl,
    logo: `${siteUrl}/logo-square-black.png`,
    description:
      'Consciously created, art to wear, altering angles. 100% organic cotton garments. Worldwide shipping. 100% plastic free.',
    sameAs: [] // Add social media URLs here if available
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME || 'scape²',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://cdn.shopify.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.shopify.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
      <body className="bg-neutral-50 text-neutral-500">
        <GoogleAnalytics />
        <Navbar />
        <Suspense>
          <main>{children}</main>
        </Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
