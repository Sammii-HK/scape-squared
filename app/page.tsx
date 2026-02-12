import { BrandPillars } from 'components/brand/brand-pillars';
import Footer from 'components/layout/footer';
import { HeroCarousel } from 'components/layout/hero-carousel';
import { Carousel } from 'components/ui/carousel';
import { getCanonicalUrl } from 'lib/utils';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export const revalidate = 86400; // Revalidate daily (24 hours)

const siteUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || 'https://scapesquared.com';

export const metadata: Metadata = {
  title: 'scape² | Consciously Created Art to Wear',
  description:
    'scape²: consciously created, art to wear, altering angles. 100% organic cotton garments. Worldwide shipping. 100% plastic free packaging. Unique photography-based designs.',
  keywords: [
    'organic cotton clothing',
    'sustainable fashion',
    'art prints',
    'eco-friendly t-shirts',
    'photography art',
    'plastic free',
    'made to order'
  ],
  alternates: {
    canonical: getCanonicalUrl('/')
  },
  openGraph: {
    type: 'website',
    url: getCanonicalUrl('/'),
    title: 'scape² | Consciously Created Art to Wear',
    description:
      'Consciously created, art to wear, altering angles. 100% organic cotton garments with worldwide shipping.',
    siteName: 'scape²',
    locale: 'en_GB',
    images: [
      {
        url: `${siteUrl}/carousel/art-prints-tablet.jpg`,
        width: 1400,
        height: 640,
        alt: 'scape² - Art Prints Collection'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'scape² | Consciously Created Art to Wear',
    description:
      'Consciously created, art to wear, altering angles. 100% organic cotton garments.',
    images: [`${siteUrl}/carousel/art-prints-tablet.jpg`]
  }
};

const CollectionCarousel = ({ collection }: { collection: 'flowerscapes' | 'foliagescapes' }) => {
  const src = {
    flowerscapes: '/flowerscape-2.png',
    foliagescapes: '/foliagescape-1.jpg'
  };
  return (
    <Link
      href={`collections/${collection}`}
      className="group block overflow-hidden"
    >
      <div className="overflow-hidden">
        <Image
          width={640}
          height={640}
          className="w-full transition-transform duration-300 group-hover:scale-105"
          alt={`${collection} collection - Shop photography-inspired art and clothing`}
          src={src[collection]}
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={80}
        />
      </div>
      <div className="flex items-center justify-between py-4">
        <h2 className="text-2xl font-light capitalize tracking-wide dark:text-neutral-100">
          {collection}
        </h2>
        <span className="text-xs font-medium uppercase tracking-widest text-neutral-500 transition-colors group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-neutral-100">
          Shop Now
        </span>
      </div>
    </Link>
  );
};

export default async function HomePage() {
  return (
    <>
      {/* Full-width Hero Carousel */}
      <Suspense>
        <HeroCarousel />
      </Suspense>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 md:px-6">
        <Suspense>
          <BrandPillars />
        </Suspense>

        <section className="py-12">
          <Carousel collection={undefined} />
        </section>

        <section className="grid grid-cols-1 gap-8 py-12 md:grid-cols-2 md:gap-12">
          <CollectionCarousel collection="flowerscapes" />
          <CollectionCarousel collection="foliagescapes" />
        </section>
      </div>

      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}
