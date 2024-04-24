"use client"

import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useState } from "react"

type Option = {
  key: string,
  label: string,
}

export function Combox(
  {
    options, 
    currentKey,
    onShow,
  }: {
    options: Option[], 
    currentKey: string | null,
    onShow: ((key: string) => void),
  }) {  
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between truncate text-ellipsis"
        >
          {currentKey
            ? options.find((option) => option.key === currentKey)?.label
            : "Select option..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger> <br /><br />
      <PopoverContent className="w-[200px] p-0 bg-popover">
        <Command>
          <CommandInput placeholder="Search option..." />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.key}
                onSelect={() => {
                  // setCurrentKey(option.key)
                  setOpen(false)
                  onShow(option.key)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    currentKey === option.key ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
