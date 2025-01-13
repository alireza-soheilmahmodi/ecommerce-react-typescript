import { Product } from "@/pages/admin/Products";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "react-router-dom";
import { priceFormatter } from "@/utils";
import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import Pagination from "./Pagination";

type Props = {
  category: string;
  lowPrice: string;
  highPrice: string;
  searchQuery?: string;
  page: number;
  setPage: (page: number) => void;
};

const ShowSearchProducts = ({
  category,
  lowPrice,
  highPrice,
  searchQuery,
  page,
  setPage,
}: Props) => {
  const searchParams = {
    category,
    lowPrice,
    highPrice,
    searchQuery,
    page,
  };

  const { data: productData, isLoading } = useQuery(
    ["searchProducts", searchParams],
    () => apiClient.searchProducts(searchParams)
  );

  if (isLoading) return <>loading...</>;

  if (!productData && !isLoading) {
    return <p>محصولی یافت نشد</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mt-5">
      {(productData.products as Product[]).map((product) => (
        <Card
          key={product.id}
          className="flex flex-col justify-between w-full rounded-none"
        >
          <Link to={`/products/${product.id}`}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>
                {product.description.slice(0, 40) + "..."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={product.imageUrl.split(",")[0]}
                alt={product.name}
                className="w-full"
              />
            </CardContent>
          </Link>
          <CardFooter className="flex gap-2">
            قیمت:
            <span className="font-bold">
              {priceFormatter(product.price.toString())} تومان
            </span>
          </CardFooter>
        </Card>
      ))}

      <div className="col-span-4 mt-4">
        <Pagination
          page={productData.pagination.page}
          pages={productData.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default ShowSearchProducts;
