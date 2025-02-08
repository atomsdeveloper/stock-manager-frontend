"use client"

import * as React from "react"

// Icons
import { Check, ChevronsUpDown, Trash } from "lucide-react"

// Libs
import { cn } from "@/lib/utils"

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
    category,
    localDiscount,
    setLocalDiscount,
    localPrice,
    setLocalPrice,
    localStock,
    setLocalStock,
    handleFilterChange
}: {
    category: {
        id: string;
        name: string;
        image_url: string;
        created_at: string;
    }[];
    localDiscount: string,
    setLocalDiscount: (value: string) => void,
    localPrice: string,
    setLocalPrice: (value: string) => void,
    localStock: string,
    setLocalStock: (value: string) => void,
    handleFilterChange: (filterType: string, value: string) => void;
}) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [name, setName] = React.useState("")

    return (
        <div className="h-1/5 grid grid-cols-2 grid-rows-2">

            {/* Filter price */}
            <div className="flex flex-col items-start gap-2">
                <label htmlFor="price" className="text-sm">Search per Price R$: </label>
                <div className="flex gap-2">
                    <Input
                        id="price"
                        name="price"
                        type="number"
                        placeholder="Ex: R$100,00"
                        value={localPrice || ""}
                        onChange={(e) => setLocalPrice(e.target.value)}
                        className="w-[150px] h-[30px] outline-none focus:outline-none focus:ring-0"
                    />
                    <Button
                        onClick={() => {
                            handleFilterChange("price", localPrice);
                        }}
                        className="flex w-[120px] h-[30px] text-[12px]"
                    >
                        Buscar
                    </Button>
                    <Button
                        onClick={() => {
                            handleFilterChange("price", "")
                            setLocalPrice("")
                        }}
                        className="flex w-[120px] h-[30px] text-[12px]"
                    >
                        <Trash size={18} />
                        Remover Filtro
                    </Button>
                </div>
            </div>

            {/* Filter discount */}
            <div className="flex flex-col items-start gap-2">
                <label htmlFor="price" className="text-sm">Search per Discount Percentage %:</label>
                <div className="flex gap-2">
                    <Input
                        type="number"
                        placeholder="Ex: 10%"
                        value={localDiscount || ""}
                        onChange={(e) => setLocalDiscount(e.target.value)}
                        className="w-[150px] h-[30px] outline-none focus:outline-none focus:ring-0"
                    />
                    <Button
                        onClick={() => {
                            handleFilterChange("discount", localDiscount);
                        }}
                        className="flex w-[120px] h-[30px] text-[12px]"
                    >
                        Buscar
                    </Button>
                    <Button
                        onClick={() => {
                            handleFilterChange("discount", "")
                            setLocalDiscount("")
                        }}
                        className="flex w-[120px] h-[30px] text-[12px]"
                    >
                        <Trash size={18} />
                        Remover Filtro
                    </Button>
                </div>
            </div>

            {/* Filter Stock */}
            <div className="flex flex-col items-start gap-2">
                <label htmlFor="price" className="text-sm">Search per Stock Quantity: </label>
                <div className="flex gap-2">

                    <Input
                        type="number"
                        placeholder="Ex: 10"
                        value={localStock || ""}
                        onChange={(e) => setLocalStock(e.target.value)}
                        className="w-[150px] h-[30px] outline-none focus:outline-none focus:ring-0"
                    />
                    <Button
                        onClick={() => {
                            handleFilterChange("stock", localStock);
                        }}
                        className="flex w-[120px] h-[30px] text-[12px]"
                    >
                        Buscar
                    </Button>
                    <Button
                        onClick={() => {
                            handleFilterChange("stock", "")
                            setLocalStock("")
                        }}
                        className="flex w-[120px] h-[30px] text-[12px]"
                    >
                        <Trash size={18} />
                        Remover Filtro
                    </Button>
                </div>
            </div>

            {/* Filter category */}
            <div className="flex flex-col items-start gap-2">
                <label htmlFor="price" className="text-sm">Search per Category: </label>
                <div className="flex gap-2 items-center">
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[170px] h-[30px] justify-between px-1"
                            >
                                <p className="text-[12px]">{name
                                    ? name
                                    : "Category..."}</p>
                                <ChevronsUpDown size={6} className="h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[180px] p-0">
                            <Command>
                                <CommandInput placeholder="Search..." />
                                <CommandList>
                                    <CommandEmpty>No category found.</CommandEmpty>
                                    <CommandGroup>
                                        {category.map((item) => (
                                            <CommandItem
                                                key={item.id}
                                                value={item.id}
                                                onSelect={(currentValue) => {
                                                    setValue(currentValue === value ? "" : currentValue)
                                                    setName(item.name)
                                                    setOpen(false)
                                                    handleFilterChange("category", currentValue)
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        value === item.id ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {item.name}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                        <Button className="flex w-[120px] h-[30px]">
                            <p className="text-[12px]" onClick={() => {
                                setName(""); // Limpa o nome da categoria selecionada
                                setValue(""); // Limpa o valor da categoria
                                handleFilterChange("category", ""); // Remove o filtro de categoria
                                setOpen(false); // Fecha o popover

                            }
                            }>Remover filtro</p>
                            <Trash size={8} />
                        </Button>
                    </Popover>
                </div>
            </div>
        </div>
    )
}
export default ContentFilter;