'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const carouselItems = [
  {
    key: 'art-prints',
    alt: 'Shop Art Prints - Photography-inspired wall art by scape²',
    title: 'Art Prints Collection'
  },
  {
    key: 't-shirts',
    alt: 'Shop T-Shirts - 100% organic cotton garments by scape²',
    title: 'T-Shirts Collection'
  }
];

export const HeroCarousel = () => {
  const [activeCarouselItem, setActiveCarouselItem] = useState(carouselItems[0]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveCarouselItem((current) =>
        current?.key === 'art-prints' ? carouselItems[1] : carouselItems[0]
      );
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeCarouselItem]);

  return (
    <Link
      className="block w-full"
      href={`/collections/${activeCarouselItem!.key}`}
      aria-label={`Shop ${activeCarouselItem!.title}`}
    >
      {/* Mobile Image */}
      <Image
        className="w-full md:hidden"
        width={640}
        height={640}
        alt={activeCarouselItem!.alt}
        src={`/carousel/${activeCarouselItem!.key}.jpg`}
        sizes="100vw"
        quality={80}
        priority
      />
      {/* Desktop Image */}
      <Image
        className="hidden w-full md:block"
        width={1400}
        height={640}
        alt={activeCarouselItem!.alt}
        src={`/carousel/${activeCarouselItem!.key}-tablet.jpg`}
        sizes="100vw"
        quality={80}
        priority
      />
    </Link>
  );
};
