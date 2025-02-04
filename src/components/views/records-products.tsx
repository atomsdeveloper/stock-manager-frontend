// Hooks
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

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
import ContentFilter from "./content-filter";

// Libs
import Swal from "sweetalert2";

const RecordsProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Params
  const filterCategory = searchParams.get('category') || null;
  const filterPrice = searchParams.get('price') || null;

  // Pagination
  const [products, setProducts] = useState([])
  const [itemsPerPage] = useState(7)
  const [page, setPage] = useState(1)

  const indexStart = (page - 1) * itemsPerPage
  const indexEnd = indexStart + itemsPerPage
  const productsPerPage = products.slice(indexStart, indexEnd)

  let totalPages = products.length / itemsPerPage

  if (totalPages < 1) {
    totalPages = 1
  }

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

      let url = `http://localhost:8080/records/products?`

      if (filterCategory) url += `category=${filterCategory}&`
      if (filterPrice) url += `price=${filterPrice}&`

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Falha ao buscar os produtos');
        }

        const data = await response.json();

        // Iterar sobre eles os produtos para pegar o id da categoria e inserir em categories lib
        // Tenho somente 5 categorias

        setProducts(data.products);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Ops...',
          text: `${error.message}`,
        });
      }
    }

    fetchResponse();
  }, [filterCategory, filterPrice])

  const handleFilterChange = (name: string, typeFilter: string) => {
    const params = new URLSearchParams(window.location.search); // Pega os filtros existentes
    if (typeFilter) {
      params.set(name, typeFilter); // Atualiza ou adiciona um filtro sem remover os outros
    } else {
      params.delete(name); // Remove o filtro se o valor for vazio
    }
    setSearchParams(params);
  };

  return (
    <div className="w-full h-full gap-4 p-4 pt-0 bg-slate-200" >
      <ContentFilter
        filterPrice={filterPrice}
        filterCategory={filterCategory}
        handleFilterChange={handleFilterChange}
      />

      <Table>
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
                <TableCell>{item?.category?.name}</TableCell>
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
            <PaginationLink >{page} de {Math.ceil(totalPages)}</PaginationLink>
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