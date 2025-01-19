import { useAppContext } from "@/contexts/AppContext";
import { useQuery } from "react-query";
import * as apiClient from "../../api-client";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiCircleMore } from "react-icons/ci";
import { Button } from "@/components/ui/button";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
};

const Users = () => {
  const { showToast } = useAppContext();
  const { data: users, isLoading } = useQuery(
    "fetchUsers",
    apiClient.fetchUsers,
    {
      onError: (error: Error) => {
        showToast({ message: error.message, type: "ERROR" });
      },
    }
  );

  if (isLoading) return <>در حال بارگذاری...</>;

  if (!users || users.length === 0) {
    return <span>کاربری وجود ندارد</span>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl">کاربران</h1>
      </div>
      <div className="mt-5">
        <Table>
          <TableBody>
            <TableRow className="border-b-2">
              <TableCell>نام</TableCell>
              <TableCell>نام خانوادگی</TableCell>
              <TableCell>ایمیل</TableCell>
              <TableCell>آدرس</TableCell>
              <TableCell></TableCell>
            </TableRow>
            {(users as User[]).map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <CiCircleMore size={30} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="text-center">
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

export default Users;
