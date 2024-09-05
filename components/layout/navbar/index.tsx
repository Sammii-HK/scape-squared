import Cart from "@components/cart";
import OpenCart from "@components/cart/open-cart";
import LogoTypographyIcon from "@components/icons/logo-typography";
import Link from "next/link";
import { Suspense } from "react";
import DesktopMenu from "./desktop-menu";
import MobileMenu from './mobile-menu';
import Search from "./search";

export default async function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 lg:px-6 bg-neutral-900 md:flex-col sticky top-0 z-50">
      <div className="block flex-none md:hidden">
        <MobileMenu />
      </div>
      {/* socials ? */}
      <div className="flex w-full justify-center md:pb-4">
        <Link href="/">
          <LogoTypographyIcon />
        </Link>
        <div className="absolute flex right-0 align-middle w-[85%] md:w-auto lg:mr-3">
          <Search />
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
      <div className="w-full items-center justify-center hidden md:flex">
        <DesktopMenu />
      </div>
    </nav>
  );
}
