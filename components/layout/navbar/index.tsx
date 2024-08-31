// import { getMenu } from 'lib/shopify';
import { menu } from "../../../constants/menu";
import MobileMenu from './mobile-menu';

export default async function Navbar() {
  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6 bg-black">
      <div className="block flex-none md:hidden">
        <MobileMenu menu={menu} />
      </div>
      <div className="flex w-full items-center">
       {/* <DesktopMenu menu={menu} /> */}
      </div>
    </nav>
  );
}
