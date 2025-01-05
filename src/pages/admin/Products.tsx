import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import * as apiClient from "../../api-client";
import { useMutation, useQuery } from "react-query";
import { useAppContext } from "@/contexts/AppContext";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiCircleMore, CiViewTable } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
};

const Products = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const { data: products } = useQuery(
    "fetchProducts",
    apiClient.fetchProducts,
    {
      onError: (error: Error) => {
        showToast({ message: error.message, type: "ERROR" });
      },
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.deleteProduct, {
    onSuccess: () => {
      showToast({ message: "محصول حذف شد", type: "SUCCESS" });
      navigate(0);
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  if (!products || products.length === 0) {
    return (
      <div className="flex justify-between">
        <h4 className="text-2xl">محصولی وجود ندارد</h4>
        <Button asChild>
          <Link to="add">
            اضافه کردن محصول
            <FaPlus />
          </Link>
        </Button>
        <Button asChild>
          <Link to="categories">
            دسته بندی ها
            <CiViewTable />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl">محصولات</h1>
        <div className="flex gap-2">
          <Button asChild>
            <Link to="add">
              اضافه کردن محصول
              <FaPlus />
            </Link>
          </Button>
          <Button asChild>
            <Link to="categories">
              دسته بندی ها
              <CiViewTable />
            </Link>
          </Button>
        </div>
      </div>
      <div className="mt-5">
        <Table>
          <TableBody>
            <TableRow className="border-b-2">
              <TableCell>نام محصول</TableCell>
              <TableCell>توضیحات</TableCell>
              <TableCell>قیمت</TableCell>
              <TableCell>موجودی</TableCell>
              <TableCell></TableCell>
            </TableRow>
            {(products as Product[]).map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  {product.description.length > 20
                    ? product.description.slice(0, 20) + "..."
                    : product.description}
                </TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <CiCircleMore size={30} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="text-center">
                      <DropdownMenuItem>
                        <Link
                          to={`/admin/products/${product.id}/edit`}
                          className="w-full"
                        >
                          ویرایش
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="p-0">
                        <Button
                          className="w-full bg-red-500"
                          onClick={() => mutate(product.id)}
                          disabled={isLoading}
                        >
                          حذف
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Products;
