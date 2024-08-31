import { Menu, MenuItem } from "@/lib/shopify/types";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import Link from "next/link";

export default function MenuDropdownItem(
  {
    item,
    activeDropdown,
    setActiveDropdown
  } :
  { 
    item: Menu, 
    activeDropdown: string, 
    setActiveDropdown: React.Dispatch<React.SetStateAction<string>>
  }) {
  const checkIfActiveTab = (key: string) => {
    return key === activeDropdown;
  }
  
  return (
    <li className="mb-5 flex flex-col">
      {item.path && (
        <Link
          key={item.title}
          href={item.path}
          className="cursor-pointer font-light rounded-lg py-1 text-xl text-neutral-200 transition-colors hover:text-neutral-500 dark:text-white"
        >
          {item.title}
        </Link>
      )}
      {item.items && (
        <div className='flex justify-between' onClick={() => setActiveDropdown(item.key)}>
          <p className='font-light text-xl cursor-pointer'>{item.title}</p>
          {checkIfActiveTab(item.key) && <ChevronUpIcon className='h-6' />}
          {!checkIfActiveTab(item.key) && <ChevronDownIcon className='h-6' />}
        </div>
      )}
      {checkIfActiveTab(item.key) && item.items?.map((item: MenuItem) => (
        <Link
          key={item.title}
          href={item.path}
          className="pl-2 capitalize rounded-lg py-1 text-md text-neutral-100 transition-colors hover:text-neutral-500 dark:text-white"
        >
          {item.title}
        </Link>
      ))}
    </li>
  )
}