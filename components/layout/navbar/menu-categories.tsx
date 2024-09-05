"use client";

import { menu } from "@/constants/menu";
import { Menu } from 'lib/shopify/types';
import { useState } from "react";
import MenuDropdownItem from "./menu-dropdown-item";


export default function MenuCategories({ display }:{ display: 'desktop' |'mobile' }) {
  const [activeDropdown, setActiveDropdown] = useState("");

  const displayClasses = () => {
    let classes
    if (display === "desktop") classes = {
      ul: 'max-h-6',
    }
    else classes = {
      ul: 'flex-col',
    }
    return classes
  }

  console.log("display", display);
  

  const classes = displayClasses();

  console.log("classes", classes);
  

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