import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import LogoType from 'components/ui/logo-type';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
const { SITE_NAME } = process.env;

export default async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

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
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            {/* <LogoSquare /> */}
            {/* <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              {SITE_NAME}
            </div> */}
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
                  <Link
                    href={item.path}
                    className="m-3 text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300 lg:mr-8"
                  >
                    {item.title}
                  </Link>
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
