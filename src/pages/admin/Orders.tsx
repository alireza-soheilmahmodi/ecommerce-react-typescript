import { useAppContext } from "@/contexts/AppContext";
import { useMutation, useQuery } from "react-query";
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
import { User } from "./Users";
import { priceFormatter } from "@/utils";
import { Badge } from "@/components/ui/badge";
import OrderDetails from "@/components/admin/OrderDetails";
import { useNavigate } from "react-router-dom";

type Order = {
  id: number;
  user: User;
  status: string;
  totalPrice: number;
};

const Orders = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const { data: orders, isLoading } = useQuery(
    "fetchOrders",
    apiClient.fetchOrders,
    {
      onError: (error: Error) => {
        showToast({ message: error.message, type: "ERROR" });
      },
    }
  );

  const { mutate, isLoading: isChangingStatus } = useMutation(
    apiClient.changeOrderStatus,
    {
      onSuccess: () => {
        navigate(0);
      },
      onError: (error: Error) => {
        showToast({ message: error.message, type: "ERROR" });
      },
    }
  );

  if (isLoading) return <>در حال بارگذاری...</>;

  if (!orders || orders.length === 0) {
    return <span>سفارشی وجود ندارد</span>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl">سفارشات</h1>
      </div>
      <div className="mt-5">
        <Table>
          <TableBody>
            <TableRow className="border-b-2">
              <TableCell>نام و نام خانوادگی</TableCell>
              <TableCell>وضعیت سفارش</TableCell>
              <TableCell>قیمت کل</TableCell>
              <TableCell>جزییات سفارش</TableCell>
              <TableCell></TableCell>
            </TableRow>
            {(orders as Order[]).map((order, index) => (
              <TableRow key={index}>
                <TableCell>{`${order.user.firstName} ${order.user.lastName}`}</TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      order.status === "Delivered" && "bg-green-500"
                    }`}
                  >
                    {order.status === "Pending" ? "در حال بررسی" : "ارسال شده"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {priceFormatter(String(order.totalPrice))}
                </TableCell>
                <TableCell>
                  <OrderDetails orderId={order.id} />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <CiCircleMore size={30} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="text-center">
                      <DropdownMenuItem className="p-0">
                        <Button
                          className="w-full bg-green-500"
                          onClick={() => mutate(order.id)}
                          disabled={
                            isChangingStatus || order.status === "Delivered"
                          }
                        >
                          ارسال شده
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

export default Orders;
