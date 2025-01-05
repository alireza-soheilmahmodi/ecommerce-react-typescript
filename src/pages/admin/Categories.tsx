import { useMutation, useQuery } from "react-query";
import * as apiClient from "../../api-client";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiCircleMore } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";

type Categories = {
  id: number;
  name: string;
};

const Categories = () => {
  const [newCategory, setNewCategory] = useState<string>("");
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const { data: categories } = useQuery("fetchCategories", () =>
    apiClient.fetchAllCategories()
  );

  const { mutate, isLoading } = useMutation(apiClient.addCategory, {
    onSuccess: () => {
      showToast({ message: "دسته بندی اضافه شد", type: "SUCCESS" });
      navigate(0);
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleAddCategory = () => {
    if (newCategory.length > 0) {
      mutate(newCategory);
    }
  };

  if (!categories || categories.length === 0) {
    return <span>دسته بندی ای وجود ندارد</span>;
  }

  return (
    <div>
      <h1 className="text-2xl">دسته بندی ها</h1>
      <div className="flex gap-3 items-end">
        <label className="flex items-center">
          دسته بندی جدید:
          <input
            type="text"
            className="p-2 mr-2 border"
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </label>
        <Button
          className=" bg-blue-500 rounded-none"
          onClick={handleAddCategory}
          disabled={isLoading}
        >
          اضافه کردن
        </Button>
      </div>
      <div className="mt-5 w-1/2">
        <Table>
          <TableBody>
            <TableRow className="border-b-2">
              <TableCell>نام دسته بندی</TableCell>
              <TableCell className="w-[50px]"></TableCell>
            </TableRow>
            {(categories as Categories[]).map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <CiCircleMore size={30} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="text-center">
                      <DropdownMenuItem>
                        <Link
                          to={`/admin/products/${category.id}/edit`}
                          className="w-full"
                        >
                          ویرایش
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="p-0">
                        <Button className="w-full bg-red-500">حذف</Button>
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

export default Categories;
