// Hooks
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

// Components
import {
  Table,
  TableBody,
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

const RecordsProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  // URL Params
  const filterCategory = searchParams.get('category') || null;
  const filterPrice = searchParams.get('price') || null;
  const filterDiscount = searchParams.get('discount') || null;
  const filterStock = searchParams.get('stock') || null

  // State to input of filters
  const [localPrice, setLocalPrice] = useState(filterPrice || "");
  const [localDiscount, setLocalDiscount] = useState(filterDiscount || "");
  const [localStock, setLocalStock] = useState(filterStock || "")

  // Pagination
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [itemsPerPage] = useState(7)
  const [page, setPage] = useState(1)

  const indexStart = (page - 1) * itemsPerPage
  const indexEnd = indexStart + itemsPerPage
  const productsPerPage = products.slice(indexStart, indexEnd)

  let totalPages = Math.ceil(products.length / itemsPerPage);

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

      // Criando a URL dinâmica corretamente
      const urlParams = new URLSearchParams();
      if (filterCategory !== null) urlParams.append("category", filterCategory);
      if (filterPrice !== null) urlParams.append("price", filterPrice);
      if (filterDiscount !== null) urlParams.append("discount", filterDiscount)
      if (filterStock !== null) urlParams.append("stock", filterStock)

      const url = `http://localhost:8080/records/products?${urlParams.toString()}`;

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

        // Verificando se contém resposta.
        if (!data.response) {
          throw new Error("Dados inválidos recebidos da API.");
        }

        // Verifica se existes produtos retornados pela api.
        if (data.response.products.length <= 0) {
          Swal.fire({
            icon: 'error',
            title: 'Ops...',
            text: `Not exists products with selected filters. Change values of filter field to fetch again.`,
          });
        }

        setProducts(data.response.products);
        setCategories(data.response.categories)
        setLoading(false)
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Ops...',
          text: `${error.message}`,
        });
        setLoading(false)
      }
    }

    fetchResponse();
  }, [filterCategory, filterPrice, filterDiscount, filterStock])

  const handleFilterChange = (name: string, typeFilter: string) => {
    const params = new URLSearchParams(window.location.search); // Pega os filtros existentes

    if (typeFilter) {
      params.set(name, typeFilter);
    } else {
      params.delete(name);
    }
    setSearchParams(params);
    setPage(1);
  };

  return (
    <div className="w-full h-full p-2" >
      <ContentFilter
        category={categories}
        localDiscount={localDiscount}
        setLocalDiscount={setLocalDiscount}
        localPrice={localPrice}
        setLocalPrice={setLocalPrice}
        localStock={localStock}
        setLocalStock={setLocalStock}
        handleFilterChange={handleFilterChange}
      />

      {loading ? (
        <>
          <div className="flex items-center justify-center h-3/4 border-white">
            <div className="w-16 h-16 border-4 border-t-transparent bg-gray-900 rounded-full animate-spin">
              <div className="w-full h-full rounded-full bg-white"></div>
            </div>
          </div>
        </>
      ) : (
        <div className="h-3/4">
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
        </div>
      )}
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