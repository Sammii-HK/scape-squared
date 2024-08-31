import Footer from 'components/layout/footer';
import { HeroCarousel } from 'components/layout/hero-carousel';
import { Carousel } from 'components/ui/carousel';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description: 'scape²: consciously created, art to wear, altering angles. 100% organic cotton garms. Worldwide shipping. 100% plastic free.',
  openGraph: {
    type: 'website'
  },
};

const aboutUs = [
  ["100% organic cotton", "garments, always"],
  ["Made to order,", "just for you"],
  ["Unique designs,", "to stand out"],
];

const CollectionCarousel = ({collection}: {collection: "flowerscapes" | "foliagescapes"}) => {
  const src = {
    flowerscapes: "/flowerscape-2.png",
    foliagescapes: "/foliagescape-1.jpg",
  }
  return (
    <Link href={`collections/${collection}`} className='col-span-1 cursor-pointer'>
      <Image width="640" height="640" className="w-full" alt={collection} src={src[collection]} />
      <div className="flex mb-5 pt-2 justify-between align-middle">
        <h5 className='text-3xl capitalize'>{collection}</h5>
        <p className='text-sm font-bold justify-end self-center'>SHOP NOW</p>
      </div>
    </Link>
  )
}

export default async function HomePage() {
  return (
    <>
      <Suspense>

        <div className='container grid justify-around my-4 grid-cols-1 items-center justify-items-center'>
          <HeroCarousel />
          <div className="grid grid-cols-1 md:grid-cols-3 my-8 w-full">
            {aboutUs.map((item, index) => (
              <div className='flex align-middle justify-center flex-col py-7 text-xl' key={`aboutUs-item-${index}`}>
                <p className="font-bold col-span-1 w-full justify-center flex">{item[0]}</p>
                <p className="font-bold col-span-1 w-full justify-center flex">{item[1]}</p>
              </div>
            )
            )}
          </div>
          <Carousel collection={undefined} />

          <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-10 my-8">
            <CollectionCarousel collection='flowerscapes' />
            <CollectionCarousel collection='foliagescapes' />
          </div>

        </div>
      </Suspense>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}
