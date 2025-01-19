import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import * as apiClient from "../../api-client";
import { useState } from "react";
import { useQuery } from "react-query";
import { Product } from "@/pages/admin/Products";
import { Link } from "react-router-dom";
import { priceFormatter } from "@/utils";

type OrderItem = {
  product: Product;
  quantity: number;
};

const OrderDetails = ({ orderId }: { orderId: number }) => {
  const [shouldFetch, setShouldFetch] = useState(false);

  const {
    data: order,
    isLoading,
    refetch,
  } = useQuery(
    ["fetchOrderDetail", orderId],
    () => apiClient.fetchOrderDetails(String(orderId)),
    {
      enabled: shouldFetch,
    }
  );

  const handleClick = () => {
    setShouldFetch(true);
    refetch();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={handleClick}>
          مشاهده
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[600px]">
        {isLoading && <>درحال بارگذاری</>}
        {order && (
          <Table>
            <TableBody>
              <TableRow className="border-b-2">
                <TableCell>نام محصول</TableCell>
                <TableCell>تعداد</TableCell>
                <TableCell>قیمت محصول</TableCell>
              </TableRow>
              {(order as OrderItem[]).map((orderItem, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Link to={`/products/${orderItem.product.id}`}>
                      {orderItem.product.name}
                    </Link>
                  </TableCell>
                  <TableCell>{orderItem.quantity}</TableCell>
                  <TableCell>
                    {priceFormatter(String(orderItem.product.price))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetails;
