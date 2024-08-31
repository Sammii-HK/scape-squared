import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import LogoType from 'components/ui/logo-type';
// import { getMenu } from 'lib/shopify';
import { collectionTypes } from '@/lib/utils';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
// const { SITE_NAME } = process.env;

// set key of dropdown as active dropdown state, if ke matches state then show dropdown items,
// this allows only one dropdown to be shown at a time, great for mobile,
// look at transition animation so dropdown reveals itself from the title
const collectionItems = collectionTypes.map(item => {
  return {
    title: item,
    path: `/collections/${item}`,
  }
});

const sizes = [ '2XS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL' ];
const sizeItems = sizes.map(size => {
  return {
    title: size,
    path: `/collections/wardrobe?size=${size}`
  }
});


const menu = [
  { title: "Collections",
    items: collectionItems,
  },
  {
    title: "All Products",
    path: "/collections/all-products",
  },
  {
    title: "Art for the",
    items: [
      {
        title: "Wall",
        path: "/collections/wall",
      },
      {
        title: "Wardrobe",
        path: "/collections/wardrobe",
      },
    ]
  },
  {
    title: "Shop 2xs-4xl",
    items: sizeItems,
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Responsibility",
    path: "/responsibility",
  }
]

export default async function Navbar() {
  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6 bg-black">
      <div className="block flex-none md:hidden">
        <MobileMenu menu={menu} />
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            aria-label="Go back home"
            className="flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <LogoType />
          </Link>
          {/* {menu.length ? (
            <ul className="hidden text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className="mr-3 text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300 lg:mr-8"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null} */}
        </div>
        {/* <div className="hidden justify-center md:flex md:w-1/3">
          <Search />
        </div> */}
        {menu.length ? (
            <ul className="hidden text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  {/* <Link
                    href={item.path}
                    className="m-3 text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300 lg:mr-8"
                  >
                    {item.title}
                  </Link> */}
                </li>
              ))}
            </ul>
          ) : null}
        <div className="flex justify-end md:w-1/3">
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
