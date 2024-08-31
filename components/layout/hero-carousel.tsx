'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const carouselItems = [
  {
    key: "art-prints",
    alt: "",
  },
  {
    key: "t-shirts",
    alt: "",
  },
];

export const HeroCarousel = () => {
  const [activeCarouselItem, setActiveCarouselItem] = useState(carouselItems[0]);

  useEffect(() => {
    setTimeout(() => {
      activeCarouselItem!.key === "art-prints" ? setActiveCarouselItem(carouselItems[1]) : setActiveCarouselItem(carouselItems[0]);
    }, 5000)
  }, [activeCarouselItem])

  return (
    <Link className='cursor-pointer' href={`/collections/${activeCarouselItem!.key}`}>
      <Image className='md:hidden' width="640" height="640" alt={activeCarouselItem!.alt} src={`/carousel/${activeCarouselItem!.key}.jpg`} />
      <Image className='hidden md:block' width="1400" height="450" alt={activeCarouselItem!.alt} src={`/carousel/${activeCarouselItem!.key}-tablet.jpg`} />
    </Link>
  )
}