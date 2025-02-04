// Icons
import { Trash2, Pencil } from 'lucide-react';

// Components
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";

const ButtonProduct = ({ type }: { type: string }) => {
    return (
        <Dialog>
            {type === 'delete' ? (
                <div className='w-24 flex items-center justify-center p-1 px-2 gap-2 rounded-md text-white bg-red-600'>
                    <DialogTrigger>Apagar</DialogTrigger>
                    <Trash2 size={16} />
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete data from our servers.
                            </DialogDescription>
                            <Button>Confirm</Button>
                        </DialogHeader>
                    </DialogContent>
                </div>
            ) : (
                <div className='w-24 flex items-center justify-center p-1 px-2 gap-2 rounded-md text-white bg-blue-600'>
                    <DialogTrigger>Editar</DialogTrigger>
                    <Pencil size={16} />
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete data from our servers.
                            </DialogDescription>
                            <Button>Confirm</Button>
                        </DialogHeader>
                    </DialogContent>
                </div>
            )}
        </Dialog>
    )
}

export default ButtonProduct;