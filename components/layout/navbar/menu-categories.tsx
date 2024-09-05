"use client";

import { menu } from "@/constants/menu";
import { Menu } from 'lib/shopify/types';
import { useEffect, useState } from "react";
import MenuDropdownItem from "./menu-dropdown-item";


export default function MenuCategories({
  display,
  openFirstTab
}:{
  display: 'desktop' |'mobile',
  openFirstTab: boolean
}) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const displayClasses = () => {
    let classes
    if (display === "desktop") classes = {
      ul: 'max-h-6',
    }
    else classes = {
      ul: 'flex-col',
    }
    return classes
  };
  
  const classes = displayClasses();

  useEffect(() => {
    if (openFirstTab) setActiveDropdown("collections");
  }, [])
  
  return (
      <ul className={`flex ${classes.ul} text-white`}>
        {menu.map((item: Menu) => (
          <div className="" key={item.title}>
            <MenuDropdownItem
              display={display}
              activeDropdown={activeDropdown}
              item={item}
              setActiveDropdown={setActiveDropdown}
            />
          </div>
        ))}
      </ul>
  )
}