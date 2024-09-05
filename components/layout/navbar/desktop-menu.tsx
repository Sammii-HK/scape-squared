"use client";

import MenuCategories from "./menu-categories";

// export default function DesktopMenu({ menu }: { menu: Menu[] }) {
export default function DesktopMenu() {
  
  return  <div className="flex">

    <MenuCategories display="desktop" />
  </div>
}