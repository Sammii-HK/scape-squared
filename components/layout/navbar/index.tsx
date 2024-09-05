// import { getMenu } from 'lib/shopify';
import DesktopMenu from "./desktop-menu";
import MobileMenu from './mobile-menu';

export default async function Navbar() {
  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6 bg-neutral-900">
      <div className="block flex-none md:hidden">
        <MobileMenu />
      </div>
      <div className="w-full items-center justify-center hidden md:flex">
        <DesktopMenu />
      </div>
    </nav>
  );
}
