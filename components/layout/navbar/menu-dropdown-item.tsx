import { Menu, MenuItem } from "@/lib/shopify/types";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import Link from "next/link";

export default function MenuDropdownItem(
  {
    item,
    activeDropdown,
    setActiveDropdown,
    display,
  } :
  { 
    item: Menu, 
    activeDropdown: string | null, 
    setActiveDropdown: React.Dispatch<React.SetStateAction<string | null>>
    display: string,
  }) {
  const checkIfActiveTab = (key: string) => {
    return key === activeDropdown;
  }

  const getClasses = () => {
    let classes
    if (display === "desktop") {
      classes = {
        li: 'bg-neutral-900 text-white z-50 px-4 relative',
        link: 'mb-3',
        dropdownLinks: 'last:pb-4',
      }
    } else {
      classes = {
        li: "mb-5 px-3",
        link: undefined,
        dropdownLinks: "pl-3",
      }
    }
    return classes
  }

  const classes = getClasses();

  const handleActiveDropdown = () => {
    if (item.key === activeDropdown) setActiveDropdown(null);
    else setActiveDropdown(item.key)
  }
  
  return (
    <li className={`flex flex-col ${classes.li}`}>
      {item.path && (
        <Link
          key={item.title}
          href={item.path}
          className="cursor-pointer font-light rounded-lg text-xl md:text-sm text-neutral-200 transition-colors hover:text-neutral-500 dark:text-white align-middle"
        >
          {item.title}
        </Link>
      )}
      {item.items && (
        <div className={`flex justify-between cursor-pointer align-middle ${classes.link}`} onClick={handleActiveDropdown}>
          <p className='font-light text-xl md:text-sm pr-1'>{item.title}</p>
          {!checkIfActiveTab(item.key) && <ChevronDownIcon className='h-6 self-center' />}
          {checkIfActiveTab(item.key) && <ChevronUpIcon className='h-6 self-center' />}
        </div>
      )}
      {checkIfActiveTab(item.key) && item.items?.map((item: MenuItem) => (
        <Link
          key={item.title}
          href={item.path}
          className={`${classes.dropdownLinks} capitalize md:text-sm rounded-lg py-1 text-md text-neutral-100 transition-colors hover:text-neutral-500 dark:text-white`}
          onClick={() => setActiveDropdown(null)}
        >
          {item.title}
        </Link>
      ))}
    </li>
  )
}