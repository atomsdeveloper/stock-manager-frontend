"use client"

import * as React from "react"

// Icons
import { Check, ChevronsUpDown } from "lucide-react"

// Libs
import { cn } from "@/lib/utils"
import { categories } from "@/lib/categories"

// Components
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "../ui/input"


const ContentFilter = ({
    filterPrice,
    filterCategory,
    handleFilterChange
}: {
    filterPrice: string,
    filterCategory: string
    handleFilterChange: (filterType: string, value: string) => void;
}) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <div className="h-32 pt-2 bg-slate-100">
            {/* Filter price */}
            <Input
                type="number"
                placeholder="Select Price"
                value={filterPrice}
                onChange={(e) => handleFilterChange("price", e.target.value)}
                className="w-[200px] outline-none focus:outline-none focus:ring-0"
            />

            {/* Filter category */}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                    >
                        {value
                            ? categories.find((category) => category.value === value)?.label
                            : "Select category..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search category..." />
                        <CommandList>
                            <CommandEmpty>No category found.</CommandEmpty>
                            <CommandGroup>
                                {categories.map((category) => (
                                    <CommandItem
                                        key={category.value}
                                        value={category.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                            handleFilterChange("category", currentValue)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === category.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {category.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
export default ContentFilter;