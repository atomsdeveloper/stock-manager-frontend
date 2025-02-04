// Hooks
import { useEffect, useState } from "react";

// Components
import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import ButtonProduct from "../button-action-product";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


// Libs
import Swal from "sweetalert2";

const RecordsProducts = () => {
  const [products, setProducts] = useState([])
  const [itemsPerPage] = useState(5)
  const [page, setPage] = useState(1)

  const indexStart = (page - 1) * itemsPerPage
  const indexEnd = indexStart + itemsPerPage
  const productsPerPage = products.slice(indexStart, indexEnd)

  const totalPages = products.length / itemsPerPage

  useEffect(() => {
    const fetchResponse = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Token não encontrado',
          text: 'Por favor, faça o login novamente.',
        });
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/records/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })

        // Verificando se a resposta foi bem-sucedida
        if (!response.ok) {
          throw new Error('Falha ao buscar os produtos');
        }

        const data = await response.json(); // Extraindo os dados da resposta

        console.log('Produtos:', data); // Exibindo os dados no console

        setProducts(data.products); // Atualizando o estado com os dados dos produtos
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Ops...',
          text: `${error.message}`,
        });
      }
    }

    fetchResponse();
  }, [])

  return (
    <div className="w-full h-full gap-4 p-4 pt-0 bg-slate-200" >
      <div className="h-32 bg-slate-500">
        <h1>Filtros</h1>
      </div>

      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead className="text-center">Discount</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-center">Amount</TableHead>
            <TableHead className="text-center">Stock</TableHead>
            <TableHead className="text-right flex justify-center items-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productsPerPage?.map((item) => {
            return (
              <TableRow key={item?.id}>
                <TableCell className="font-medium">{item?.name}</TableCell>
                <TableCell className="text-center">{item?.discountPercentage}%</TableCell>
                <TableCell>{item?.category_id}</TableCell>
                <TableCell className="text-center">R${item?.price}</TableCell>
                <TableCell className="text-center">{item?.stock_quantity}</TableCell>
                <TableCell className="text-right flex justify-around gap-1">
                  <ButtonProduct type="delete" />
                  <ButtonProduct type="edit" />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={`hover:cursor-pointer ${page == 1 ? "pointer-events-none opacity-50" : ""}`}
              onClick={() => setPage(page - 1)}
              aria-disabled={page === 1}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink >{page} de {totalPages}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className={`hover:cursor-pointer ${page == totalPages ? "pointer-events-none opacity-50" : ""}`}
              onClick={() => setPage(page + 1)}
              aria-disabled={page === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

    </div>
  )
}

export default RecordsProducts;