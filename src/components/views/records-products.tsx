import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const RecordsProducts = () => {
  return (
    <div className="w-full h-full gap-4 p-4 pt-0 bg-slate-200" >
      <div className="h-36 bg-slate-500">
        <h1>Filtros</h1>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right flex justify-center items-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right flex justify-around">
              <span>Apagar</span>
              <span>Editar</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default RecordsProducts;