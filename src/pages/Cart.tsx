import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import useCartStore from "@/store/cartStore";
import { priceFormatter } from "@/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "@/contexts/AppContext";

const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const { showToast } = useAppContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const { mutate, isLoading } = useMutation(apiClient.placeOrder, {
    onSuccess: () => {
      showToast({ message: "سفارش با موفقیت ثبت شد", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-xl">سبد خرید</h1>
      <div>
        {cart.length === 0 ? (
          <p>سبد خرید شما خالی میباشد.</p>
        ) : (
          <Table>
            <TableBody>
              <TableRow className="border-b-2">
                <TableCell>نام محصول</TableCell>
                <TableCell>تعداد</TableCell>
                <TableCell>قیمت واحد</TableCell>
                <TableCell>قیمت کل</TableCell>
              </TableRow>
              {cart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Link to={`/products/${item.id}`}>{item.name}</Link>
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{priceFormatter(String(item.price))}</TableCell>
                  <TableCell>
                    {priceFormatter(String(item.quantity * item.price))}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>جمع کل</TableCell>
                <TableCell>
                  {priceFormatter(
                    String(
                      cart.reduce(
                        (accumulator, currentItem) =>
                          currentItem.price * currentItem.quantity +
                          accumulator,
                        0
                      )
                    )
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </div>

      <div className="flex gap-2">
        {cart.length > 0 ? (
          isLoggedIn ? (
            <Button
              onClick={() => {
                mutate(
                  cart.map((item) => ({
                    productId: item.id,
                    quantity: item.quantity,
                  }))
                );
                clearCart();
              }}
              className="bg-blue-500 w-fit disabled:bg-blue-300"
              disabled={isLoading}
            >
              {isLoading ? "ثبت سفارش..." : "ثبت سفارش"}
            </Button>
          ) : (
            <Button
              className="bg-blue-500 w-fit disabled:bg-blue-300"
              onClick={() =>
                navigate("/sign-in", { state: { from: location } })
              }
            >
              برای ثبت سفارش وارد شوید
            </Button>
          )
        ) : (
          ""
        )}

        {cart.length > 0 && (
          <Button onClick={clearCart} className="bg-red-500 w-fit">
            خالی کردن سبد خرید
          </Button>
        )}
      </div>
    </div>
  );
};

export default Cart;
